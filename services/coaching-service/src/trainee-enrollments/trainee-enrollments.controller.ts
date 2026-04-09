import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TraineeEnrollmentsService } from './trainee-enrollments.service';
import { TraineeEnrollmentPattern } from '../common/patterns/trainee-enrollment.pattern';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller()
export class TraineeEnrollmentsController {
  constructor(private readonly traineeEnrollmentsService: TraineeEnrollmentsService) { }

  @MessagePattern(TraineeEnrollmentPattern.CREATE_REQUEST)
  async createTrainerRequest(@Payload() dto: CreateEnrollmentDto) {
    return await this.traineeEnrollmentsService.createTrainerRequest(dto);
  }

  @MessagePattern(TraineeEnrollmentPattern.GET_ASSIGNED_TRAINERS)
  async getAssignedTrainers(@Payload() data: { traineeId: string }) {
    return await this.traineeEnrollmentsService.getAssignedTrainers(data.traineeId);
  }

  @MessagePattern(TraineeEnrollmentPattern.GET_ASSIGNED_WORKOUT_PLANS)
  async getAssignedWorkoutPlans(@Payload() data: { traineeId: string }) {
    return await this.traineeEnrollmentsService.getAssignedWorkoutPlans(data.traineeId);
  }

  @MessagePattern(TraineeEnrollmentPattern.GET_ASSIGNED_NUTRITION_PLANS)
  async getAssignedNutritionPlans(@Payload() data: { traineeId: string }) {
    return await this.traineeEnrollmentsService.getAssignedNutritionPlans(data.traineeId);
  }
}
