import { Controller } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerPattern } from 'src/common/enums/trainerPatterns.enum';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller()
export class TrainerController {
    constructor(
        private readonly trainerService: TrainerService
    ) { }

    @MessagePattern(TrainerPattern.CREATE)
    createTrainer(@Payload() createTrainerDto: CreateTrainerDto) {
        return this.trainerService.create(createTrainerDto);
    }

    @MessagePattern(TrainerPattern.UPDATE)
    updateTrainer(@Payload() updateTrainerDto: UpdateTrainerDto) {
        return this.trainerService.update(updateTrainerDto.userId, updateTrainerDto);
    }

    @EventPattern(TrainerPattern.DELETE)
    deleteTrainer(@Payload() { userId }: { userId: string }) {
        this.trainerService.delete(userId);
    }

    @MessagePattern(TrainerPattern.GET_ALL_ACTIVE)
    getAllActive() {
        return this.trainerService.findAll(true);
    }

    @MessagePattern(TrainerPattern.GET_ALL)
    getAll() {
        return this.trainerService.findAll(false);
    }

    @MessagePattern(TrainerPattern.GET_BY_ID)
    getOne(@Payload() { userId }: { userId: string }) {
        return this.trainerService.findOne(userId);
    }
}
