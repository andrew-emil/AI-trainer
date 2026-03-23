import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { TraineeGoal } from '@prisma/client'

export class CreateNutritionPlanDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(TraineeGoal)
  goal: TraineeGoal

  @IsInt()
  weeks: number

  @IsUUID()
  @IsNotEmpty()
  traineeId: string
}
