import { TraineeService } from './trainee.service';
import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
export declare class TraineeController {
    private readonly traineeService;
    constructor(traineeService: TraineeService);
    create(createTraineeDto: CreateTraineeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTraineeDto: UpdateTraineeDto): string;
    remove(id: string): string;
}
