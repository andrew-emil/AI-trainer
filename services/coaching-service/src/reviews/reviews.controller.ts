import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewPattern } from 'src/common/patterns/reviews.patterns';
import { CreateTrainerReviewDto } from './dto/create-trainer-review.dto';
import { UpdateTrainerReviewDto } from './dto/update-trainer-review.dto';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @MessagePattern(ReviewPattern.CREATE)
  createReview(
    @Payload() payload: { traineeId: string; dto: CreateTrainerReviewDto },
  ) {
    return this.reviewsService.createReview(payload.traineeId, payload.dto);
  }

  @MessagePattern(ReviewPattern.GET_FOR_TRAINEE)
  getReviewsForTrainee(@Payload() payload: { traineeId: string }) {
    return this.reviewsService.getReviewsForTrainee(payload.traineeId);
  }

  @MessagePattern(ReviewPattern.UPDATE)
  updateReview(
    @Payload() payload: { traineeId: string; dto: UpdateTrainerReviewDto },
  ) {
    return this.reviewsService.updateReview(payload.traineeId, payload.dto);
  }

  @MessagePattern(ReviewPattern.DELETE)
  deleteReview(
    @Payload() payload: { reviewId: string; traineeId: string },
  ) {
    return this.reviewsService.deleteReview(payload.reviewId, payload.traineeId);
  }

  @MessagePattern(ReviewPattern.GET_FOR_TRAINER)
  getReviewsForTrainer(@Payload() payload: { trainerId: string }) {
    return this.reviewsService.getReviewsForTrainer(payload.trainerId);
  }
}
