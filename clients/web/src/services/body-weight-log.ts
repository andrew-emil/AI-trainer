import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { CreateBodyWeightLogDto, UpdateBodyWeightLogDto } from '@/types/body-weight-log';
import { BodyWeightLog } from '@/types/entities';

export const createBodyWeightLog = async (dto: CreateBodyWeightLogDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<BodyWeightLog>('/body-weight-logs', dto)
  );
  return { data, error };
};

export const getBodyWeightLogsByTrainee = async (traineeId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<BodyWeightLog[]>(`/body-weight-logs/trainee/${traineeId}`)
  );
  return { data, error };
};

export const getBodyWeightLogById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<BodyWeightLog>(`/body-weight-logs/${id}`)
  );
  return { data, error };
};

export const updateBodyWeightLog = async (
  id: string,
  dto: UpdateBodyWeightLogDto,
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<BodyWeightLog>(`/body-weight-logs/${id}`, dto)
  );
  return { data, error };
};

export const deleteBodyWeightLog = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<BodyWeightLog>(`/body-weight-logs/${id}`)
  );
  return { data, error };
};

/* -------------------------------------------------------------------------- */
/*                                  Analytics                                 */
/* -------------------------------------------------------------------------- */

export const analyzeWeightChanges = async (traineeId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<any>(`/body-weight-logs/analyze/${traineeId}`)
  );
  return { data, error };
};

export const getWeightTrend = async (traineeId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<any>(`/body-weight-logs/trend/${traineeId}`)
  );
  return { data, error };
};
