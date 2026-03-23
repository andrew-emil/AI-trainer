import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateNutritionMealDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  nutritionDayId: string;

  @IsString()
  @IsNotEmpty()
  name: string; // Breakfast / Snack 1

  @IsInt()
  @Min(0)
  orderIndex: number;

  @IsOptional()
  @IsString()
  time?: string; // 08:00

  @IsUUID()
  @IsNotEmpty()
  trainerId: string;
}
