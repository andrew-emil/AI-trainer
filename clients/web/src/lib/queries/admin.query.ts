import { queryOptions } from '@tanstack/react-query';
import { getTrainerRequests, getTrainerRequestById } from '@/services/admin';
// import { findAllUsers } from '@/services/user';

export const trainerRequestsQuery = (status?: string) =>
  queryOptions({
    queryKey: ['trainerRequests', status],
    queryFn: () => getTrainerRequests(status),
  });

// export const usersQuery = () =>
//   queryOptions({
//     queryKey: ['users'],
//     queryFn: () => findAllUsers(),
//   });

export const trainerRequestQuery = (id: string) =>
  queryOptions({
    queryKey: ['trainerRequest', id],
    queryFn: () => getTrainerRequestById(id),
  });
