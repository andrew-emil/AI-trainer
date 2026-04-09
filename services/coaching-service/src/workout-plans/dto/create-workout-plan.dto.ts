import { IsEnum, IsInt, IsString, Min } from 'class-validator'
import { TraineeGoal } from '@prisma/client'

export class CreateWorkoutPlanDto {
  @IsString()
  trainerId: string

  @IsString()
  name: string

  @IsEnum(TraineeGoal)
  goal: TraineeGoal

  @IsInt()
  @Min(1)
  weeks: number
}
