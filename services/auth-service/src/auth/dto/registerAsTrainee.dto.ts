import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { TraineeGoal } from "src/prisma/generated";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class RegisterAsTraineeDto extends CreateUserDto {
    @IsNotEmpty()
    @IsEnum(TraineeGoal)
    goal: TraineeGoal;

    @IsNotEmpty()
    @IsNumber()
    @Min(40)
    @Max(272)
    heightCm: number;
}