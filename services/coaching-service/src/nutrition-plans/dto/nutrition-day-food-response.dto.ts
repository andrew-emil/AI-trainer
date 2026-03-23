export class NutritionDayFoodResponseDto {
  id: string;
  quantity: number;
  unit: string;
  orderIndex: number;

  food: {
    id: string;
    name: string;
  };
}
