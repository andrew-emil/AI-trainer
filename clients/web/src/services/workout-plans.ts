import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import {
  CreateWorkoutPlanDto,
  UpdateWorkoutPlanDto,
  CreateWorkoutDayDto,
  CreateWorkoutDayExerciseDto,
  UpdateWorkoutDayExerciseDto,
  WorkoutPlanWithDetails,
  WorkoutDayResponseDto,
  WorkoutDayExerciseResponseDto,
} from '@/types/workout-plans';
import { WorkoutPlan, WorkoutDay, WorkoutDayExercise } from '@/types/entities';

/* -------------------------------------------------------------------------- */
/*                                    Plans                                   */
/* -------------------------------------------------------------------------- */

export const createWorkoutPlan = async (dto: CreateWorkoutPlanDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<WorkoutPlan>('/workout-plans', dto),
  );
  return { data, error };
};

export const findAllWorkoutPlans = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WorkoutPlan[]>('/workout-plans'),
  );
  return { data, error };
};

export const findWorkoutPlanById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WorkoutPlanWithDetails>(`/workout-plans/${id}`),
  );
  return { data, error };
};

export const findWorkoutPlansByTrainer = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WorkoutPlan[]>('/workout-plans/trainer'),
  );
  return { data, error };
};

export const updateWorkoutPlan = async (
  id: string,
  dto: UpdateWorkoutPlanDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<WorkoutPlan>(`/workout-plans/${id}`, dto),
  );
  return { data, error };
};

export const deleteWorkoutPlan = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<WorkoutPlan>(`/workout-plans/${id}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                    Days                                    */
/* -------------------------------------------------------------------------- */

export const addWorkoutDay = async (
  planId: string,
  dto: CreateWorkoutDayDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<WorkoutDay>(`/workout-plans/${planId}/days`, dto),
  );
  return { data, error };
};

export const findWorkoutDaysByPlan = async (planId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WorkoutDayResponseDto[]>(`/workout-plans/${planId}/days`),
  );
  return { data, error };
};

export const findWorkoutDayById = async (dayId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<WorkoutDayResponseDto>(`/workout-plans/days/${dayId}`),
  );
  return { data, error };
};

export const updateWorkoutDay = async (
  dayId: string,
  dto: Partial<CreateWorkoutDayDto>,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<WorkoutDay>(`/workout-plans/days/${dayId}`, dto),
  );
  return { data, error };
};

export const deleteWorkoutDay = async (dayId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<WorkoutDay>(`/workout-plans/days/${dayId}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                               Exercises                                    */
/* -------------------------------------------------------------------------- */

export const addExerciseToWorkoutDay = async (
  dayId: string,
  dto: CreateWorkoutDayExerciseDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<WorkoutDayExercise>(
      `/workout-plans/days/${dayId}/exercises`,
      dto,
    ),
  );
  return { data, error };
};

export const updateWorkoutDayExercise = async (
  id: string,
  dto: UpdateWorkoutDayExerciseDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<WorkoutDayExercise>(
      `/workout-plans/exercises/${id}`,
      dto,
    ),
  );
  return { data, error };
};

export const deleteWorkoutDayExercise = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<WorkoutDayExercise>(`/workout-plans/exercises/${id}`),
  );
  return { data, error };
};
