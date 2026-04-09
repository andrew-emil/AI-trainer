import { PartialType } from "@nestjs/mapped-types";
import { CreateTraineeWorkoutPlanDto } from "./create-trainee-workout-plan.dto";

export class UpdateTraineeWorkoutPlanDto extends PartialType(CreateTraineeWorkoutPlanDto) {}