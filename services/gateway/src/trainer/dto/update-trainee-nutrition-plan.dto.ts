import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateTraineeNutritionPlanDto {
  @IsBoolean()
  @IsOptional()
  active?: boolean
}
