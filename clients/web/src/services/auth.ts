import { axiosClient } from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import {
  AuthResponse,
  ForgetPasswordDto,
  RegisterAsTraineeDto,
  RegisterAsTrainerDto,
  RegisterTrainerResponse,
} from '@/types/auth';

export const login = async (body: { email: string; password: string }) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<AuthResponse>('/auth/login', body)
  );
  return { data, error };
};

export const registerAsTrainee = async (body: RegisterAsTraineeDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<AuthResponse>('/auth/register-as-trainee', body)
  );
  return { data, error };
};

export const registerAsTrainer = async (body: RegisterAsTrainerDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<RegisterTrainerResponse>('/auth/register-as-trainer', body)
  );
  return { data, error };
};

export const forgetPassword = async (body: ForgetPasswordDto) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<void>('/auth/forget-password', body)
  );
  return { data, error };
};

export const resetPassword = async (body: { password: string; token: string }) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.post<void>('/auth/reset-password', body)
  );
  return { data, error };
};
