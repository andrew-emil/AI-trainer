import { Controller } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerPattern } from 'src/common/enums/trainerPatterns.enum';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller('trainer')
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
        console.log(updateTrainerDto)
        return this.trainerService.update(updateTrainerDto.userId, updateTrainerDto);
    }

    @EventPattern(TrainerPattern.DELETE)
    deleteTrainer(@Payload() { userId }: UpdateTrainerDto) {
        this.trainerService.delete(userId);
    }
}
