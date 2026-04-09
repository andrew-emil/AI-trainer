import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export enum TraineeGoal {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  ENDURANCE = 'ENDURANCE',
  FLEXIBILITY = 'FLEXIBILITY',
  GENERAL_FITNESS = 'GENERAL_FITNESS',
}

export class CreateWorkoutPlanDto {
  @IsString()
  name: string;

  @IsEnum(TraineeGoal)
  goal: TraineeGoal;

  @IsInt()
  @Min(1)
  weeks: number;
}
