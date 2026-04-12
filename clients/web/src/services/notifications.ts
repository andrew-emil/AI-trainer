import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { Notification } from '@/types/entities';
import { Paginated } from '@/types/paginate';


export const getAllNotifications = async (
  params: { page: number; take: number } = { page: 1, take: 20 }
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Paginated<Notification>>(`/notifications?page=${params.page}&take=${params.take}`)
  );
  return { data, error };
};

export const markNotificationAsRead = async (notificationId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<Notification>(`/notifications/${notificationId}`)
  );
  return { data, error };
};

export const deleteNotification = async (notificationId: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<Notification>(`/notifications/${notificationId}`)
  );
  return { data, error };
};
