import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { CreateUserDto, UpdateUserDto, SafeUser } from '@/types/user';

export const createUser = async (dto: CreateUserDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<SafeUser>('/user', dto)
  );
  return { data, error };
};

export const findAllUsers = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<SafeUser[]>('/user')
  );
  return { data, error };
};

export const getMyUser = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<SafeUser>('/user/profile')
  );
  return { data, error };
};

export const findUserById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<SafeUser>(`/user/${id}`)
  );
  return { data, error };
};

export const updateUser = async (dto: UpdateUserDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<SafeUser>('/user', dto)
  );
  return { data, error };
};

export const deleteUser = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.delete<SafeUser>('/user')
  );
  return { data, error };
};
