import { NutritionDayFoodResponseDto } from "./nutrition-day-food-response.dto";

export class NutritionMealResponseDto {
  id: string;
  name: string;
  orderIndex: number;
  time?: string;

  foods: NutritionDayFoodResponseDto[];
}
