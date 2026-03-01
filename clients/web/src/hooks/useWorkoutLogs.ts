import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createWorkoutLog,
  getWorkoutLogById,
  updateWorkoutLog,
  deleteWorkoutLog,
  findAllWorkoutLogsForATrainee,
  getWorkoutSummary,
  getProgressiveOverload,
  getLatestProgressiveOverload,
  getLatest1RM,
  getWeightRecommendation,
} from '@/services/workout-log';
import {
  CreateWorkoutSessionDto,
  UpdateWorkoutLogDto,
  PaginatedWorkoutSessions,
  GroupedWorkoutResult,
  ProgressiveOverloadResult,
  Latest1RMResult,
  WeightRecommendation,
} from '@/types/workout-log';
import { WorkoutSession } from '@/types/entities';

/* -------------------------------------------------------------------------- */
/*                              Workout Logs CRUD                             */
/* -------------------------------------------------------------------------- */

export const useWorkoutLog = (id: string) => {
  return useQuery({
    queryKey: ['workoutLog', id],
    queryFn: async () => {
      const { data, error } = await getWorkoutLogById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateWorkoutLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateWorkoutSessionDto) => {
      const { data, error } = await createWorkoutLog(dto);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      queryClient.invalidateQueries({ queryKey: ['workoutSummary'] });
      queryClient.invalidateQueries({ queryKey: ['progressiveOverload'] });
      queryClient.invalidateQueries({ queryKey: ['traineeAssignedTrainers'] });
    },
  });
};

export const useUpdateWorkoutLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: UpdateWorkoutLogDto;
    }) => {
      const { data, error } = await updateWorkoutLog(id, dto);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workoutLog', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      queryClient.invalidateQueries({ queryKey: ['workoutSummary'] });
    },
  });
};

export const useDeleteWorkoutLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await deleteWorkoutLog(id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                           Trainee Workout Logs                             */
/* -------------------------------------------------------------------------- */

export const useTraineeWorkoutLogs = (
  traineeId: string,
  params?: { limit?: number; cursor?: string },
) => {
  return useQuery({
    queryKey: ['workoutLogs', 'trainee', traineeId, params],
    queryFn: async () => {
      const { data, error } = await findAllWorkoutLogsForATrainee(
        traineeId,
        params,
      );
      if (error) throw error;
      return data;
    },
    enabled: !!traineeId,
  });
};

/* -------------------------------------------------------------------------- */
/*                              Workout Summary                               */
/* -------------------------------------------------------------------------- */

export const useWorkoutSummary = (
  traineeId: string,
  params?: {
    by?: 'dayId' | 'exerciseId';
    dayId?: string;
    startDate?: string;
    endDate?: string;
  },
) => {
  return useQuery({
    queryKey: ['workoutSummary', traineeId, params],
    queryFn: async () => {
      const { data, error } = await getWorkoutSummary(traineeId, params);
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });
};

/* -------------------------------------------------------------------------- */
/*                           Progressive Overload                             */
/* -------------------------------------------------------------------------- */

export const useProgressiveOverload = (
  traineeId: string,
  params?: { exerciseId?: string; dayId?: string },
) => {
  return useQuery({
    queryKey: ['progressiveOverload', traineeId, params],
    queryFn: async () => {
      const { data, error } = await getProgressiveOverload(traineeId, params);
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });
};

export const useLatestProgressiveOverload = (
  traineeId: string,
  params?: { exerciseId?: string; dayId?: string },
) => {
  return useQuery({
    queryKey: ['latestProgressiveOverload', traineeId, params],
    queryFn: async () => {
      const { data, error } = await getLatestProgressiveOverload(
        traineeId,
        params,
      );
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });
};

/* -------------------------------------------------------------------------- */
/*                                Latest 1RM                                  */
/* -------------------------------------------------------------------------- */

export const useLatest1RM = (
  traineeId: string,
  params?: { exerciseId?: string },
) => {
  return useQuery({
    queryKey: ['latest1RM', traineeId, params],
    queryFn: async () => {
      const { data, error } = await getLatest1RM(traineeId, params);
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });
};

/* -------------------------------------------------------------------------- */
/*                          Weight Recommendation                             */
/* -------------------------------------------------------------------------- */

export const useWeightRecommendation = (
  traineeId: string,
  workoutDayExerciseId: string,
) => {
  return useQuery({
    queryKey: ['weightRecommendation', traineeId, workoutDayExerciseId],
    queryFn: async () => {
      const { data, error } = await getWeightRecommendation(
        traineeId,
        workoutDayExerciseId,
      );
      if (error) throw error;
      return data;
    },
    enabled: !!traineeId && !!workoutDayExerciseId,
  });
};
