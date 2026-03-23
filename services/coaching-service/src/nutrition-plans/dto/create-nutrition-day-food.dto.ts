import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class CreateNutritionDayFoodDto {
  @IsUUID()
  @IsNotEmpty()
  mealId: string;

  @IsString()
  @IsNotEmpty()
  foodId: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string; // g / ml / serving

  @IsInt()
  @Min(0)
  orderIndex: number;

  @IsUUID()
  @IsNotEmpty()
  trainerId: string;
}
