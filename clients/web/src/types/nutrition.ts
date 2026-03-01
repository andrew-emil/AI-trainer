export interface CreateFoodMacrosDto {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CreateFoodNutrientDto {
  key: string;
  value: number;
  unit: string;
}

export interface CreateFoodDto {
  name: string;
  description?: string;
  type?: string;
  tags: string[];
  macros?: CreateFoodMacrosDto;
  nutrients?: CreateFoodNutrientDto[];
}

export interface UpdateFoodDto extends Partial<CreateFoodDto> {}

export interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: FoodItem[];
}

export interface NutritionPlan {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  createdBy: string;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledWorkout {
  id: string;
  planId: string;
  planName: string;
  dayName?: string;
  traineeId: string;
  scheduledDate: string;
  dayId?: string;
  scheduledTime?: string;
  completed: boolean;
  notes?: string;
}
