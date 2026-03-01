import { axiosClient } from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import {
  CreateWorkoutSessionDto,
  UpdateWorkoutLogDto,
  PaginatedWorkoutSessions,
  GroupedWorkoutResult,
  ProgressiveOverloadResult,
  Latest1RMResult,
  WeightRecommendation,
} from '@/types/workout-log';
import { WorkoutSession, WorkoutLog } from '@/types/entities';

/* -------------------------------------------------------------------------- */
/*                                    CRUD                                    */
/* -------------------------------------------------------------------------- */

export const createWorkoutLog = async (dto: CreateWorkoutSessionDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<WorkoutSession>('/workout-logs', dto),
  );
  return { data, error };
};

export const getWorkoutLogById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WorkoutLog>(`/workout-logs/${id}`),
  );
  return { data, error };
};

export const updateWorkoutLog = async (
  id: string,
  dto: UpdateWorkoutLogDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<WorkoutLog>(`/workout-logs/${id}`, dto),
  );
  return { data, error };
};

export const deleteWorkoutLog = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<WorkoutLog>(`/workout-logs/${id}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                           Trainee Specific Data                            */
/* -------------------------------------------------------------------------- */

export const findAllWorkoutLogsForATrainee = async (
  traineeId: string,
  params: { limit?: number; cursor?: string } = {},
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<PaginatedWorkoutSessions>(
      `/workout-logs/trainee/${traineeId}`,
      {
        params,
      },
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                               Workout Summary                              */
/* -------------------------------------------------------------------------- */

export const getWorkoutSummary = async (
  traineeId: string,
  params?: {
    by?: 'dayId' | 'exerciseId';
    dayId?: string;
    startDate?: string;
    endDate?: string;
  },
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GroupedWorkoutResult[]>(
      `/workout-logs/trainee/${traineeId}/summary`,
      {
        params,
      },
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                           Progressive Overload                             */
/* -------------------------------------------------------------------------- */

export const getProgressiveOverload = async (
  traineeId: string,
  params?: { exerciseId?: string; dayId?: string },
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<ProgressiveOverloadResult[]>(
      `/workout-logs/trainee/${traineeId}/progressive-overload`,
      {
        params,
      },
    ),
  );
  return { data, error };
};

export const getLatestProgressiveOverload = async (
  traineeId: string,
  params?: { exerciseId?: string; dayId?: string },
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<ProgressiveOverloadResult[]>(
      `/workout-logs/trainee/${traineeId}/latest-progressive-overload`,
      {
        params,
      },
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                Latest 1RM                                  */
/* -------------------------------------------------------------------------- */

export const getLatest1RM = async (
  traineeId: string,
  params?: { exerciseId?: string },
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Latest1RMResult[]>(
      `/workout-logs/trainee/${traineeId}/latest-1rm`,
      {
        params,
      },
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                          Weight Recommendation                             */
/* -------------------------------------------------------------------------- */

export const getWeightRecommendation = async (
  traineeId: string,
  workoutDayExerciseId: string,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WeightRecommendation>(
      `/workout-logs/trainee/${traineeId}/workout-day-exercise/${workoutDayExerciseId}/weight-recommendation`,
    ),
  );
  return { data, error };
};
