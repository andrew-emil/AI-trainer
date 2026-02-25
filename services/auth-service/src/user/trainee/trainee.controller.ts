import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TraineePatterns } from 'src/common/enums/traineePatterns.enum';
import { UpdateTraineeDto } from './dto/updateTrainee.dto';
import { TraineeService } from './trainee.service';

@Controller('trainee')
export class TraineeController {
    constructor(
        private readonly traineeService: TraineeService
    ) { }

    @MessagePattern(TraineePatterns.FIND_ALL)
    findAll() {
        return this.traineeService.findAll();
    }

    @MessagePattern(TraineePatterns.FIND_ONE)
    findOne(@Payload() payload: { id: string }) {
        return this.traineeService.findOne(payload.id);
    }

    @MessagePattern(TraineePatterns.UPDATE)
    update(@Payload() payload: { id: string, dto: UpdateTraineeDto }) {
        return this.traineeService.update(payload.id, payload.dto);
    }

    @EventPattern(TraineePatterns.DELETE)
    remove(@Payload() payload: { id: string }) {
        this.traineeService.delete(payload.id);
    }
}
