import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerTraineesService } from './trainer-trainees.service';
import { TrainerTraineePattern } from 'src/common/patterns/trainer-trainee.pattern';

@Controller()
export class TrainerTraineesController {
  constructor(private readonly trainerTraineesService: TrainerTraineesService) { }

  @MessagePattern(TrainerTraineePattern.GET_TRAINEE_REQUESTS)
  async getTraineeRequests(@Payload() data: { trainerId: string }) {
    return await this.trainerTraineesService.getTraineeRequests(data.trainerId);
  }

  @MessagePattern(TrainerTraineePattern.PROCESS_TRAINEE_REQUEST)
  async processTraineeRequest(@Payload() data: { reqId: string; approve: boolean }) {
    return await this.trainerTraineesService.processTraineeRequest(data.reqId, data.approve);
  }

  @MessagePattern(TrainerTraineePattern.GET_ASSIGNED_TRAINEES)
  async getAssignedTrainees(@Payload() data: { trainerId: string }) {
    return await this.trainerTraineesService.getAssignedTrainees(data.trainerId);
  }

  @MessagePattern(TrainerTraineePattern.UNASSIGN_TRAINEE)
  async unassignTrainee(@Payload() data: { trainerId: string; traineeId: string }) {
    return await this.trainerTraineesService.unassignTrainee(data.trainerId, data.traineeId);
  }
}
