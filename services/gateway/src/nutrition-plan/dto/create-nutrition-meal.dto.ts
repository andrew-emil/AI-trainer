import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateNutritionMealDto {
  @IsUUID()
  nutritionDayId: string;

  @IsString()
  name: string; // Breakfast / Snack 1

  @IsInt()
  @Min(0)
  orderIndex: number;

  @IsOptional()
  @IsString()
  time?: string; // 08:00
}
