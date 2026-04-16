import {
  addExerciseToWorkoutDay,
  addWorkoutDay,
  createWorkoutPlan,
  deleteWorkoutDay,
  deleteWorkoutDayExercise,
  deleteWorkoutPlan,
  findAllWorkoutPlans,
  findWorkoutDayById,
  findWorkoutDaysByPlan,
  findWorkoutPlanById,
  findWorkoutPlansByTrainer,
  updateWorkoutDay,
  updateWorkoutDayExercise,
  updateWorkoutPlan,
} from '@/services/workout-plans';
import {
  CreateWorkoutDayDto,
  CreateWorkoutDayExerciseDto,
  CreateWorkoutPlanDto,
  UpdateWorkoutDayExerciseDto,
  UpdateWorkoutPlanDto
} from '@/types/workout-plans';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/* -------------------------------------------------------------------------- */
/*                              Workout Plans                                 */
/* -------------------------------------------------------------------------- */

export const useWorkoutPlans = () => {
  return useQuery({
    queryKey: ['workoutPlans'],
    queryFn: async () => {
      const { data, error } = await findAllWorkoutPlans();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useTrainerWorkoutPlans = () => {
  return useQuery({
    queryKey: ['workoutPlans', 'trainer'],
    queryFn: async () => {
      const { data, error } = await findWorkoutPlansByTrainer();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useWorkoutPlan = (id: string) => {
  return useQuery({
    queryKey: ['workoutPlan', id],
    queryFn: async () => {
      const { data, error } = await findWorkoutPlanById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateWorkoutPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateWorkoutPlanDto) => {
      const { data, error } = await createWorkoutPlan(dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutPlans'] });
    },
  });
};

export const useUpdateWorkoutPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: UpdateWorkoutPlanDto;
    }) => {
      const { data, error } = await updateWorkoutPlan(id, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workoutPlans'] });
      queryClient.invalidateQueries({
        queryKey: ['workoutPlan', variables.id],
      });
    },
  });
};

export const useDeleteWorkoutPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await deleteWorkoutPlan(id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutPlans'] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Workout Days                                  */
/* -------------------------------------------------------------------------- */

export const useWorkoutDays = (planId: string) => {
  return useQuery({
    queryKey: ['workoutDays', planId],
    queryFn: async () => {
      const { data, error } = await findWorkoutDaysByPlan(planId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!planId,
  });
};

export const useWorkoutDay = (dayId: string) => {
  return useQuery({
    queryKey: ['workoutDay', dayId],
    queryFn: async () => {
      const { data, error } = await findWorkoutDayById(dayId);
      if (error) throw error;
      return data;
    },
    enabled: !!dayId,
  });
};

export const useAddWorkoutDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      planId,
      dto,
    }: {
      planId: string;
      dto: CreateWorkoutDayDto;
    }) => {
      const { data, error } = await addWorkoutDay(planId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workoutDays', variables.planId],
      });
      queryClient.invalidateQueries({
        queryKey: ['workoutPlan', variables.planId],
      });
    },
  });
};

export const useUpdateWorkoutDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dayId,
      dto,
    }: {
      dayId: string;
      dto: Partial<CreateWorkoutDayDto>;
    }) => {
      const { data, error } = await updateWorkoutDay(dayId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workoutDay', variables.dayId],
      });
      queryClient.invalidateQueries({ queryKey: ['workoutDays'] });
    },
  });
};

export const useDeleteWorkoutDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dayId: string) => {
      const { data, error } = await deleteWorkoutDay(dayId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutDays'] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                           Workout Day Exercises                            */
/* -------------------------------------------------------------------------- */

export const useAddExerciseToWorkoutDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dayId,
      dto,
    }: {
      dayId: string;
      dto: CreateWorkoutDayExerciseDto;
    }) => {
      const { data, error } = await addExerciseToWorkoutDay(dayId, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workoutDay', variables.dayId],
      });
      queryClient.invalidateQueries({ queryKey: ['workoutDays'] });
    },
  });
};

export const useUpdateWorkoutDayExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: UpdateWorkoutDayExerciseDto;
    }) => {
      const { data, error } = await updateWorkoutDayExercise(id, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutDay'] });
      queryClient.invalidateQueries({ queryKey: ['workoutDays'] });
    },
  });
};

export const useDeleteWorkoutDayExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await deleteWorkoutDayExercise(id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutDay'] });
      queryClient.invalidateQueries({ queryKey: ['workoutDays'] });
    },
  });
};
