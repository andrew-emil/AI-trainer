import { IsBoolean, IsDateString, IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateTraineeNutritionPlanDto {
  @IsString()
  @IsNotEmpty()
  traineeId: string

  @IsString()
  @IsNotEmpty()
  nutritionPlanId: string

  @IsDateString()
  @IsNotEmpty()
  startDate: string

  @IsDateString()
  @IsOptional()
  endDate?: string

  @IsBoolean()
  @IsOptional()
  active?: boolean
}
