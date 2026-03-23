import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerMetricsPattern } from 'src/common/patterns/trainer-metrics.dto';
import { TrainerMetricsService } from './trainer-metrics.service';

@Controller()
export class TrainerMetricsController {
  constructor(private readonly trainerMetricsService: TrainerMetricsService) { }

  @MessagePattern(TrainerMetricsPattern.CALCULATE_RANK_SCORE)
  calculateRankScore(@Payload() payload: { trainerId: string }) {
    return this.trainerMetricsService.calculateRankScore(payload.trainerId);
  }

  @EventPattern(TrainerMetricsPattern.UPDATE_TRAINER_SUCCESS_RATE)
  updateTrainerSuccessRate(@Payload() payload: { trainerId: string }) {
    return this.trainerMetricsService.updateTrainerSuccessRate(payload.trainerId);
  }
}
