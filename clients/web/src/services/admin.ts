import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { TrainerRequest, User } from '@/types/entities';
import {
  TrainerRequestWithUser,
  RejectTrainerRequestBody,
  TrainerRequestDetails,
} from '@/types/admin';

/* -------------------------------------------------------------------------- */
/*                              Trainer Requests                              */
/* -------------------------------------------------------------------------- */

export const getTrainerRequests = async (status?: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TrainerRequestWithUser[]>('/admin/trainer-requests', {
      params: { status },
    }),
  );
  return { data, error };
};

export const getTrainerRequestById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<TrainerRequestDetails>(`/admin/trainer-requests/${id}`),
  );
  return { data, error };
};

export const approveTrainerRequest = async (requestId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<TrainerRequest>(
      `/admin/trainer-requests/${requestId}/approve`,
    ),
  );
  return { data, error };
};

export const rejectTrainerRequest = async (
  requestId: string,
  body: RejectTrainerRequestBody,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<TrainerRequest>(
      `/admin/trainer-requests/${requestId}/reject`,
      body,
    ),
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                Activation                                  */
/* -------------------------------------------------------------------------- */

export const activateTrainer = async (trainerId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<User>(`/admin/trainers/${trainerId}/activate`),
  );
  return { data, error };
};

export const deactivateTrainer = async (trainerId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<User>(`/admin/trainers/${trainerId}/deactivate`),
  );
  return { data, error };
};

export const activateTrainee = async (traineeId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<User>(`/admin/trainees/${traineeId}/activate`),
  );
  return { data, error };
};

export const deactivateTrainee = async (traineeId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<User>(`/admin/trainees/${traineeId}/deactivate`),
  );
  return { data, error };
};
