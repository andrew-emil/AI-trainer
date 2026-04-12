import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import {
  CreateTraineeDto,
  UpdateTraineeDto,
  CreateTrainerReviewDto,
  UpdateTrainerReviewDto,
  TraineeWithUser,
  GetReviewsForTrainee,
  GetAssignedTrainersResponse,
  GetAssignedWorkoutPlansResponse,
  GetAssignedNutritionPlansResponse,
} from '@/types/trainee';
import {
  Trainee,
  TrainerTraineeRequest,
  TrainerTrainee,
} from '@/types/entities';

/* -------------------------------------------------------------------------- */
/*                                   Trainee                                  */
/* -------------------------------------------------------------------------- */

export const createTrainee = async (dto: CreateTraineeDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<Trainee>('/trainee', dto),
  );
  return { data, error };
};

export const findAllTrainees = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TraineeWithUser[]>('/trainee'),
  );
  return { data, error };
};

export const findTraineeById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TraineeWithUser>(`/trainee/${id}`),
  );
  return { data, error };
};

export const updateTrainee = async (dto: UpdateTraineeDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<Trainee>('/trainee', dto),
  );
  return { data, error };
};

export const deleteTrainee = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<Trainee>('/trainee'),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                   Reviews                                  */
/* -------------------------------------------------------------------------- */

export const createReview = async (dto: CreateTrainerReviewDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<GetReviewsForTrainee>('/trainee/review', dto),
  );
  return { data, error };
};

export const updateReview = async (
  reviewId: string,
  dto: UpdateTrainerReviewDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<GetReviewsForTrainee>(`/trainee/review/${reviewId}`, dto),
  );
  return { data, error };
};

export const deleteReview = async (reviewId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<GetReviewsForTrainee>(`/trainee/review/${reviewId}`),
  );
  return { data, error };
};

export const getReviewsForTrainee = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetReviewsForTrainee[]>('/trainee/reviews'),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                               Trainer Request                              */
/* -------------------------------------------------------------------------- */

export const createTrainerRequest = async (
  trainerId: string,
  sessionsCount: number,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<TrainerTraineeRequest>(
      `/trainee/trainer-request/${trainerId}`,
      { sessionsCount },
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                 Assignments                                */
/* -------------------------------------------------------------------------- */

export const getAssignedTrainers = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAssignedTrainersResponse>('/trainee/assigned-trainer'),
  );
  return { data, error };
};

export const getAssignedWorkoutPlans = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAssignedWorkoutPlansResponse[]>(
      '/trainee/assigned-workout-plans',
    ),
  );
  return { data, error };
};

export const getAssignedNutritionPlans = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<GetAssignedNutritionPlansResponse[]>(
      '/trainee/assigned-nutrition-plans',
    ),
  );
  return { data, error };
};
