import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import {
  CreateTrainerDto,
  UpdateTrainerDto,
  CreateTraineeWorkoutPlanDto,
  CreateTraineeNutritionPlanDto,
  TrainerWithUser,
  TraineeRequestResponseDto,
  ProcessTraineeRequestResponse,
  GetAssignedTraineesResponse,
  GetAllTraineesWithWorkoutPlans,
  GetAllTraineesWithNutritionPlans,
  GetReviewsForTrainer,
  GetAssignedWorkoutPlans,
  GetAssignedNutritionPlans,
} from '@/types/trainer';
import {
  Trainer,
  TraineeWorkoutPlan,
  TraineeNutritionPlan,
} from '@/types/entities';

/* -------------------------------------------------------------------------- */
/*                                   Trainer                                  */
/* -------------------------------------------------------------------------- */

export const createTrainer = async (dto: CreateTrainerDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<Trainer>('/trainers', dto),
  );
  return { data, error };
};

export const findAllTrainers = async (isActive?: boolean) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TrainerWithUser[]>('/trainers', {
      params: { isActive },
    }),
  );
  return { data, error };
};

export const findTrainerById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TrainerWithUser>(`/trainers/${id}`),
  );
  return { data, error };
};

export const updateTrainer = async (dto: UpdateTrainerDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<Trainer>('/trainers', dto),
  );
  return { data, error };
};

export const deleteTrainer = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<Trainer>('/trainers'),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                             Trainee Assignments                            */
/* -------------------------------------------------------------------------- */

export const getTraineeRequests = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TraineeRequestResponseDto[]>('/trainers/trainee-requests'),
  );
  return { data, error };
};

export const processTraineeRequest = async (
  reqId: string,
  approve: boolean,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<ProcessTraineeRequestResponse>(
      `/trainers/trainees/${reqId}`,
      { approve },
    ),
  );
  return { data, error };
};

export const getAssignedTrainees = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAssignedTraineesResponse[]>('/trainers/trainees'),
  );
  return { data, error };
};

export const unassignTrainee = async (traineeId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<void>(`/trainers/trainees/${traineeId}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                           Workout Plan Assignments                         */
/* -------------------------------------------------------------------------- */

export const assignWorkoutPlan = async (dto: CreateTraineeWorkoutPlanDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<TraineeWorkoutPlan>('/trainers/workout-plans', dto),
  );
  return { data, error };
};

export const updateWorkoutPlanAssignment = async (
  traineeId: string,
  planId: string,
  dto: Partial<CreateTraineeWorkoutPlanDto>,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<TraineeWorkoutPlan>(
      `/trainers/workout-plans/${traineeId}/${planId}`,
      dto,
    ),
  );
  return { data, error };
};

export const setWorkoutPlanActiveStatus = async (
  traineeId: string,
  planId: string,
  active: boolean,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<TraineeWorkoutPlan>(
      `/trainers/workout-plans/${traineeId}/${planId}/active`,
      { active },
    ),
  );
  return { data, error };
};

export const getAssignedWorkoutPlanForTrainee = async (
  traineeId: string,
  active?: boolean,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAssignedWorkoutPlans[]>(
      `/trainers/workout-plans/${traineeId}`,
      { params: { active } },
    ),
  );
  return { data, error };
};

export const getAllTraineesAndTheirAssignedPlans = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAllTraineesWithWorkoutPlans[]>(
      '/trainers/trainees-workout-plans',
    ),
  );
  return { data, error };
};

export const unassignWorkoutPlan = async (
  traineeId: string,
  planId: string,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<void>(`/trainers/workout-plans/${traineeId}/${planId}`),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                          Nutrition Plan Assignments                        */
/* -------------------------------------------------------------------------- */

export const assignNutritionPlan = async (
  dto: CreateTraineeNutritionPlanDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<TraineeNutritionPlan>('/trainers/nutrition-plans', dto),
  );
  return { data, error };
};

export const updateNutritionPlanAssignment = async (
  traineeId: string,
  nutritionPlanId: string,
  dto: Partial<CreateTraineeNutritionPlanDto>,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<TraineeNutritionPlan>(
      `/trainers/nutrition-plans/${traineeId}/${nutritionPlanId}`,
      dto,
    ),
  );
  return { data, error };
};

export const setNutritionPlanActiveStatus = async (
  traineeId: string,
  nutritionPlanId: string,
  active: boolean,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<TraineeNutritionPlan>(
      `/trainers/nutrition-plans/${traineeId}/${nutritionPlanId}/active`,
      { active },
    ),
  );
  return { data, error };
};

export const getAssignedNutritionPlanForTrainee = async (
  traineeId: string,
  active?: boolean,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAssignedNutritionPlans[]>(
      `/trainers/nutrition-plans/${traineeId}`,
      { params: { active } },
    ),
  );
  return { data, error };
};

export const getAllTraineesAndTheirAssignedNutritionPlans = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAllTraineesWithNutritionPlans[]>(
      '/trainers/trainees-nutrition-plans',
    ),
  );
  return { data, error };
};

export const unassignNutritionPlan = async (
  traineeId: string,
  nutritionPlanId: string,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<void>(
      `/trainers/nutrition-plans/${traineeId}/${nutritionPlanId}`,
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                   Reviews                                  */
/* -------------------------------------------------------------------------- */

export const getReviewsForTrainer = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetReviewsForTrainer[]>(`/trainers/reviews/${id}`),
  );
  return { data, error };
};

export const calculateRankScore = async (trainerId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<Trainer>(`/trainers/${trainerId}/calculate-rank`),
  );
  return { data, error };
};
