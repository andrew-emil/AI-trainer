import { axiosClient } from '@/lib/axiosClient';
import { ActivityLog } from '@/types/entities';
import { tryCatch } from '@/lib/try-catch';

export const getAllActivityLogs = async (
  userId: string,
  params: {
    page: number;
    limit: number;
    where?: string;
  }
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<ActivityLog[]>('/activity-log', {
      params,
    })
  );
  return { data, error };
};

export const getLastThreeActivityLogs = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<ActivityLog[]>('/activity-log/last-three')
  );
  return { data, error };
};

export const deleteActivityLog = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<ActivityLog>(`/activity-log/${id}`)
  );
  return { data, error };
};
