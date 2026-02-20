import { Controller, Get, Param } from '@nestjs/common';
import { RequestsProvider } from './providers/requests.provider';
import { TraineeService } from './trainee.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TraineePatterns } from 'src/common/enums/traineePatterns.enum';
import { UpdateTraineeDto } from './dto/updateTrainee.dto';

@Controller('trainee')
export class TraineeController {
    constructor(
        private readonly requestsProvider: RequestsProvider,
        private readonly traineeService: TraineeService
    ) { }

    @MessagePattern(TraineePatterns.GET_ASSIGNED_TRAINERS)
    getAssignedTrainers(@Payload() payload: { userId: string }) {
        return this.requestsProvider.getAssignedTrainers(payload.userId);
    }

    @MessagePattern(TraineePatterns.FIND_ALL)
    findAll() {
        return this.traineeService.findAll();
    }

    @MessagePattern(TraineePatterns.FIND_ONE)
    findOne(@Payload() payload: { id: string }) {
        return this.traineeService.findOne(payload.id);
    }

    @EventPattern(TraineePatterns.UPDATE)
    update(@Payload() payload: { id: string, dto: UpdateTraineeDto }) {
        this.traineeService.update(payload.id, payload.dto);
    }

    @EventPattern(TraineePatterns.DELETE)
    remove(@Payload() payload: { id: string }) {
        this.traineeService.delete(payload.id);
    }

    @MessagePattern(TraineePatterns.CREATE_TRAINER_REQUEST)
    createTrainerRequest(
        @Payload() payload: { traineeId: string, trainerId: string, sessionsCount: number },
    ) {
        return this.requestsProvider.createTrainerRequest(
            payload.traineeId,
            payload.trainerId,
            payload.sessionsCount,
        );
    }
}
