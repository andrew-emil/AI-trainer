import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
export declare class TrainerController {
    private readonly trainerService;
    constructor(trainerService: TrainerService);
    create(createTrainerDto: CreateTrainerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTrainerDto: UpdateTrainerDto): string;
    remove(id: string): string;
}
