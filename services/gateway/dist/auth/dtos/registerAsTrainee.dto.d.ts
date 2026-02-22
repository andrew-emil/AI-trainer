import { TraineeGoal } from "@prisma/client";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export declare class RegisterAsTraineeDto extends CreateUserDto {
    goal: TraineeGoal;
    heightCm: number;
}
