import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
export declare class TraineeService {
    create(createTraineeDto: CreateTraineeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTraineeDto: UpdateTraineeDto): string;
    remove(id: number): string;
}
