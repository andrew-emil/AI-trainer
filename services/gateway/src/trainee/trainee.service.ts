import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE, COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { firstValueFrom } from 'rxjs';
import { TraineePatterns } from 'src/common/patterns/traineePatterns.enum';
import { CreateTrainerReviewDto } from './dto/create-trainer-review.dto';
import { UpdateTrainerReviewDto } from './dto/update-trainer-review.dto';
import { ReviewPattern } from 'src/common/patterns/reviews.patterns';

@Injectable()
export class TraineeService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly client: ClientProxy,
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly coachClient: ClientProxy,
  ) { }

  findAll() {
    return firstValueFrom(
      this.client.send(TraineePatterns.FIND_ALL, {})
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.client.send(TraineePatterns.FIND_ONE, { id })
    );
  }

  update(id: string, updateTraineeDto: UpdateTraineeDto) {
    return firstValueFrom(
      this.client.send(TraineePatterns.UPDATE, { id, updateTraineeDto })
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.client.send(TraineePatterns.DELETE, { id })
    );
  }

  // ------------ Reviews ------------
  createReview(traineeId: string, dto: CreateTrainerReviewDto) {
    return firstValueFrom(
      this.coachClient.send(ReviewPattern.CREATE, { traineeId, dto })
    );
  }

  getReviewsForTrainee(traineeId: string) {
    return firstValueFrom(
      this.coachClient.send(ReviewPattern.GET_FOR_TRAINEE, { traineeId })
    );
  }

  updateReview(reviewId: string, traineeId: string, dto: UpdateTrainerReviewDto) {
    return firstValueFrom(
      this.coachClient.send(ReviewPattern.UPDATE, { traineeId, dto: { ...dto, reviewId } })
    );
  }

  deleteReview(reviewId: string, traineeId: string) {
    return firstValueFrom(
      this.coachClient.send(ReviewPattern.DELETE, { reviewId, traineeId })
    );
  }
}
