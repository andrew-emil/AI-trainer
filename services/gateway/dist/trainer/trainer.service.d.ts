import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
export declare class TrainerService {
    create(createTrainerDto: CreateTrainerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTrainerDto: UpdateTrainerDto): string;
    remove(id: number): string;
}
