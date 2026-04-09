import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator'
export enum TraineeGoal {
  LOSE_WEIGHT = 'LOSE_WEIGHT',
  MAINTAIN_WEIGHT = 'MAINTAIN_WEIGHT',
  BUILD_MUSCLE = 'BUILD_MUSCLE',
  IMPROVE_FITNESS = 'IMPROVE_FITNESS'
}

export class CreateNutritionPlanDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(TraineeGoal)
  goal: TraineeGoal

  @IsInt()
  weeks: number
}
