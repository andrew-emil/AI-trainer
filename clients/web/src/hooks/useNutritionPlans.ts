import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNutritionPlan,
  findAllNutritionPlans,
  findNutritionPlanById,
  findNutritionPlansByTrainer,
  updateNutritionPlan,
  deleteNutritionPlan,
  addNutritionDay,
  findNutritionDaysByPlan,
  updateNutritionDay,
  deleteNutritionDay,
  addNutritionMeal,
  findNutritionMealsByDay,
  updateNutritionMeal,
  deleteNutritionMeal,
  addFoodToNutritionMeal,
  updateNutritionMealFood,
  deleteNutritionMealFood,
} from '@/services/nutrition-plans';
import {
  CreateNutritionPlanDto,
  UpdateNutritionPlanDto,
  CreateNutritionDayDto,
  CreateNutritionMealDto,
  CreateNutritionDayFoodDto,
  UpdateNutritionDayFoodDto,
} from '@/types/nutrition-plans';

/* -------------------------------------------------------------------------- */
/*                               Nutrition Plans                              */
/* -------------------------------------------------------------------------- */

export const useNutritionPlans = () => {
  return useQuery({
    queryKey: ['nutritionPlans'],
    queryFn: async () => {
      const { data, error } = await findAllNutritionPlans();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useTrainerNutritionPlans = () => {
  return useQuery({
    queryKey: ['nutritionPlans', 'trainer'],
    queryFn: async () => {
      const { data, error } = await findNutritionPlansByTrainer();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useNutritionPlan = (id: string) => {
  return useQuery({
    queryKey: ['nutritionPlan', id],
    queryFn: async () => {
      const { data, error } = await findNutritionPlanById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateNutritionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateNutritionPlanDto) => {
      const { data, error } = await createNutritionPlan(dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionPlans'] });
    },
  });
};

export const useUpdateNutritionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: UpdateNutritionPlanDto;
    }) => {
      const { data, error } = await updateNutritionPlan(id, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['nutritionPlans'] });
      queryClient.invalidateQueries({
        queryKey: ['nutritionPlan', variables.id],
      });
      // Invalidate days too in case plan details affect them
      queryClient.invalidateQueries({
        queryKey: ['nutritionDays', variables.id],
      });
    },
  });
};

export const useDeleteNutritionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await deleteNutritionPlan(id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionPlans'] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                               Nutrition Days                               */
/* -------------------------------------------------------------------------- */

export const useNutritionDays = (planId: string) => {
  return useQuery({
    queryKey: ['nutritionDays', planId],
    queryFn: async () => {
      const { data, error } = await findNutritionDaysByPlan(planId);
      if (error) throw error;
      return data?.days || [];
    },
    enabled: !!planId,
  });
};

export const useAddNutritionDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      planId,
      dto,
    }: {
      planId: string;
      dto: CreateNutritionDayDto;
    }) => {
      const { data, error } = await addNutritionDay(planId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['nutritionDays', variables.planId],
      });
      queryClient.invalidateQueries({
        queryKey: ['nutritionPlan', variables.planId],
      });
    },
  });
};

export const useUpdateNutritionDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dayId,
      dto,
    }: {
      dayId: string;
      dto: CreateNutritionDayDto;
    }) => {
      const { data, error } = await updateNutritionDay(dayId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionPlan'] });
    },
  });
};

export const useDeleteNutritionDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dayId: string) => {
      const { data, error } = await deleteNutritionDay(dayId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                               Nutrition Meals                              */
/* -------------------------------------------------------------------------- */

export const useNutritionMeals = (dayId: string) => {
  return useQuery({
    queryKey: ['nutritionMeals', dayId],
    queryFn: async () => {
      const { data, error } = await findNutritionMealsByDay(dayId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!dayId,
  });
};

export const useAddNutritionMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dayId,
      dto,
    }: {
      dayId: string;
      dto: CreateNutritionMealDto;
    }) => {
      const { data, error } = await addNutritionMeal(dayId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['nutritionMeals', variables.dayId],
      });
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
    },
  });
};

export const useUpdateNutritionMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mealId,
      dto,
    }: {
      mealId: string;
      dto: CreateNutritionMealDto;
    }) => {
      const { data, error } = await updateNutritionMeal(mealId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Very important for reordering!
      queryClient.invalidateQueries({ queryKey: ['nutritionMeals'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionPlan'] });
    },
  });
};

export const useDeleteNutritionMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mealId: string) => {
      const { data, error } = await deleteNutritionMeal(mealId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionMeals'] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                               Nutrition Foods                              */
/* -------------------------------------------------------------------------- */

export const useAddFoodToMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateNutritionDayFoodDto) => {
      const { data, error } = await addFoodToNutritionMeal(dto.mealId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionMeals'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionPlan'] });
    },
  });
};

export const useUpdateNutritionMealFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: UpdateNutritionDayFoodDto;
    }) => {
      const { data, error } = await updateNutritionMealFood(id, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionMeals'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionPlan'] });
    },
  });
};

export const useDeleteNutritionMealFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await deleteNutritionMealFood(id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionMeals'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionDays'] });
      queryClient.invalidateQueries({ queryKey: ['nutritionPlan'] });
    },
  });
};
