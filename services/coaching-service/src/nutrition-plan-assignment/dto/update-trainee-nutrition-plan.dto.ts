import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { CreateTraineeNutritionPlanDto } from './create-trainee-nutrition-plan.dto'

export class UpdateTraineeNutritionPlanDto extends PartialType(CreateTraineeNutritionPlanDto) {
  @IsBoolean()
  @IsOptional()
  active?: boolean

  @IsUUID()
  @IsNotEmpty()
  nutritionPlanId: string
}
