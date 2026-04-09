import { PartialType } from "@nestjs/mapped-types";
import { CreateTraineeWorkoutPlanDto } from "./create-trainee-workout-plan.dto";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateTraineeWorkoutPlanDto extends PartialType(CreateTraineeWorkoutPlanDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string
}