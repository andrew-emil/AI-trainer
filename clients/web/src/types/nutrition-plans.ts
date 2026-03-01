import {
  Food,
  NutritionDay,
  NutritionDayFood,
  NutritionMeal,
  NutritionPlan,
} from './entities';

/* ---------- DTOs ---------- */

import { TraineeGoal } from './entities';

export interface CreateNutritionPlanDto {
  name: string;
  goal: TraineeGoal;
  weeks: number;
}

export interface UpdateNutritionPlanDto extends Partial<CreateNutritionPlanDto> {}

export interface CreateNutritionDayDto {
  planId: string;
  name: string;
  dayIndex: number;
}

export interface CreateNutritionMealDto {
  nutritionDayId: string;
  name: string;
  orderIndex: number;
  time?: string;
}

export interface UpdateNutritionMealDto extends Partial<CreateNutritionMealDto> {}

export interface CreateNutritionDayFoodDto {
  mealId: string;
  foodId: string;
  quantity: number;
  unit: string;
  orderIndex: number;
}

export interface UpdateNutritionDayFoodDto extends Partial<CreateNutritionDayFoodDto> {}

/* ---------- Responses ---------- */

export interface NutritionDayFoodResponseDto extends NutritionDayFood {
  food: Food;
}

export interface MealTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionMealResponseDto extends NutritionMeal {
  foods: NutritionDayFoodResponseDto[];
  totals?: MealTotals;
}

export interface NutritionDayResponseDto extends NutritionDay {
  meals: NutritionMealResponseDto[];
  totals?: MealTotals;
}

export interface NutritionDaysResponse {
  days: NutritionDayResponseDto[];
  totals: MealTotals;
}

export interface NutritionPlanWithDetails extends NutritionPlan {
  days: NutritionDayResponseDto[];
  totals?: MealTotals;
}
