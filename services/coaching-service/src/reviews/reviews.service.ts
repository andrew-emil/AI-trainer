import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { TrainerPattern } from 'src/common/patterns/trainer.patterns';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TrainerConversionUtil } from 'src/common/utils/trainer-conversion.util';
import { getTraineeWithUser, getTrainer } from 'src/common/utils/get-user.helper';
import { TrainerMetricsService } from 'src/trainer-metrics/trainer-metrics.service';
import { CreateTrainerReviewDto } from './dto/create-trainer-review.dto';
import { UpdateTrainerReviewDto } from './dto/update-trainer-review.dto';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly trainerMetricsService: TrainerMetricsService,
    @Inject(AUTH_SERVICE)
    private readonly authService: ClientProxy
  ) { }

  async createReview(traineeId: string, dto: CreateTrainerReviewDto) {
    const { trainerId } = dto;
    const relation = await this.prisma.trainerTrainee.findFirst({
      where: { traineeId, trainerId, membershipStatus: "active" },
    });
    if (!relation)
      throw new RpcException({
        code: 403,
        message: "You are not assigned to this trainer",
      });

    const review = await this.prisma.trainerReview.create({
      data: { traineeId, trainerId, rating: dto.rating, comment: dto.comment },
    });

    await this.updateTrainerRatingAndRank(trainerId);

    return review;
  }

  async getReviewsForTrainee(traineeId: string) {
    const reviews = await this.prisma.trainerReview.findMany({
      where: { traineeId },
    });
    return reviews.map((r) => TrainerConversionUtil.transformTrainerReview(r));
  }

  async updateReview(traineeId: string, dto: UpdateTrainerReviewDto) {
    const { reviewId } = dto;
    const review = await this.prisma.trainerReview.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new RpcException({
      code: 404,
      message: "Review not found",
    });
    if (review.traineeId !== traineeId)
      throw new RpcException({
        code: 403,
        message: "You can update only your review",
      });

    const updated = await this.prisma.trainerReview.update({
      where: { id: reviewId },
      data: dto,
    });

    await this.updateTrainerRatingAndRank(updated.trainerId);

    return updated;
  }

  async deleteReview(reviewId: string, traineeId: string) {
    const review = await this.prisma.trainerReview.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new RpcException({
      code: 404,
      message: "Review not found",
    });
    if (review.traineeId !== traineeId)
      throw new RpcException({
        code: 403,
        message: "You can delete only your review",
      });

    await this.prisma.trainerReview.delete({ where: { id: reviewId } });

    // تحديث ratingAvg + ratingCount + rankScore
    await this.updateTrainerRatingAndRank(review.trainerId);

    return { message: "Review deleted successfully" };
  }

  async getReviewsForTrainer(trainerId: string) {
    const reviews = await this.prisma.trainerReview.findMany({
      where: { trainerId },
    });
    const reviewWithTrainee = await Promise.all(reviews.map(async (r) => {
      const trainee = await getTraineeWithUser(this.authService, r.traineeId);
      return {
        ...r,
        trainee: trainee,
      };
    }));
    return reviewWithTrainee;
  }

  private async updateTrainerRatingAndRank(trainerId: string) {
    const stats = await this.prisma.trainerReview.aggregate({
      where: { trainerId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const currentTrainer = await getTrainer(this.authService, trainerId);
    const newRatingAvg = stats._avg.rating ?? 0;
    const newRatingCount = stats._count.rating;

    try {
      await firstValueFrom(
        this.authService.send(TrainerPattern.UPDATE, {
          userId: trainerId,
          ratingAvg: newRatingAvg,
          ratingCount: newRatingCount,
        })
      );

      try {
        await this.trainerMetricsService.calculateRankScore(trainerId);
      } catch (rankError) {
        // Rank failed — roll back the auth service update
        await firstValueFrom(
          this.authService.send(TrainerPattern.UPDATE, {
            userId: trainerId,
            ratingAvg: currentTrainer?.ratingAvg ?? 0,
            ratingCount: currentTrainer?.ratingCount ?? 0,
          })
        ).catch(() => {
          // Rollback itself failed — log for manual intervention
          this.logger.error(
            `CRITICAL: Failed to rollback trainer ${trainerId} after rank error. Manual fix required.`,
            rankError,
          );
        });

        throw new RpcException({
          code: 500,
          message: 'Failed to calculate rank score',
        });
      }
    } catch (error) {
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        code: 500,
        message: 'Failed to update trainer rating',
      });
    }
  }
}
