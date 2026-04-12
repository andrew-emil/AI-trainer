import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import {
  CreateNutritionPlanDto,
  UpdateNutritionPlanDto,
  CreateNutritionDayDto,
  CreateNutritionMealDto,
  CreateNutritionDayFoodDto,
  UpdateNutritionDayFoodDto,
  NutritionPlanWithDetails,
  NutritionDayResponseDto,
  NutritionMealResponseDto,
  NutritionDaysResponse,
} from '@/types/nutrition-plans';
import {
  NutritionPlan,
  NutritionDay,
  NutritionMeal,
  NutritionDayFood,
} from '@/types/entities';

/* -------------------------------------------------------------------------- */
/*                                    Plans                                   */
/* -------------------------------------------------------------------------- */

export const createNutritionPlan = async (dto: CreateNutritionPlanDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<NutritionPlan>('/nutrition-plans', dto),
  );
  return { data, error };
};

export const findAllNutritionPlans = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<NutritionPlan[]>('/nutrition-plans'),
  );
  return { data, error };
};

export const findNutritionPlanById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<NutritionPlanWithDetails>(`/nutrition-plans/${id}`),
  );
  return { data, error };
};

export const findNutritionPlansByTrainer = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<NutritionPlan[]>('/nutrition-plans/trainer'),
  );
  return { data, error };
};

export const updateNutritionPlan = async (
  id: string,
  dto: UpdateNutritionPlanDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<NutritionPlan>(`/nutrition-plans/${id}`, dto),
  );
  return { data, error };
};

export const deleteNutritionPlan = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<NutritionPlan>(`/nutrition-plans/${id}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                    Days                                    */
/* -------------------------------------------------------------------------- */

export const addNutritionDay = async (
  planId: string,
  dto: CreateNutritionDayDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<NutritionDay>(`/nutrition-plans/${planId}/days`, dto),
  );
  return { data, error };
};

export const findNutritionDaysByPlan = async (planId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<NutritionDaysResponse>(`/nutrition-plans/${planId}/days`),
  );
  return { data, error };
};

export const updateNutritionDay = async (
  dayId: string,
  dto: CreateNutritionDayDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<NutritionDay>(`/nutrition-plans/days/${dayId}`, dto),
  );
  return { data, error };
};

export const deleteNutritionDay = async (dayId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<NutritionDay>(`/nutrition-plans/days/${dayId}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                    Meals                                   */
/* -------------------------------------------------------------------------- */

export const addNutritionMeal = async (
  dayId: string,
  dto: CreateNutritionMealDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<NutritionMeal>(
      `/nutrition-plans/days/${dayId}/meals`,
      dto,
    ),
  );
  return { data, error };
};

export const findNutritionMealsByDay = async (dayId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<NutritionMealResponseDto[]>(
      `/nutrition-plans/days/${dayId}/meals`,
    ),
  );
  return { data, error };
};

export const updateNutritionMeal = async (
  mealId: string,
  dto: CreateNutritionMealDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<NutritionMeal>(`/nutrition-plans/meals/${mealId}`, dto),
  );
  return { data, error };
};

export const deleteNutritionMeal = async (mealId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<NutritionMeal>(`/nutrition-plans/meals/${mealId}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                    Foods                                   */
/* -------------------------------------------------------------------------- */

export const addFoodToNutritionMeal = async (
  mealId: string,
  dto: CreateNutritionDayFoodDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<NutritionDayFood>(
      `/nutrition-plans/meals/${mealId}/foods`,
      dto,
    ),
  );
  return { data, error };
};

export const updateNutritionMealFood = async (
  id: string,
  dto: UpdateNutritionDayFoodDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<NutritionDayFood>(`/nutrition-plans/foods/${id}`, dto),
  );
  return { data, error };
};

export const deleteNutritionMealFood = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<NutritionDayFood>(`/nutrition-plans/foods/${id}`),
  );
  return { data, error };
};
