import { axiosClient } from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { Exercise } from '@/types/entities';
import { Paginated } from '@/types/paginate';

export const findAllExercises = async (
  params: { page?: number; limit?: number; search?: string } = {},
) => {
  const { page = 1, limit = 16, search = '' } = params;
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Paginated<Exercise>>('/exercises', {
      params: {
        page,
        limit,
        search,
      },
    }),
  );
  return { data, error };
};

export const findExerciseById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Exercise>(`/exercises/${id}`),
  );
  return { data, error };
};

export const findExercisesByTargetMuscle = async (muscle: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Exercise[]>(`/exercises/target-muscle/${muscle}`),
  );
  return { data, error };
};

export const findExercisesByBodyPart = async (bodyPart: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Exercise[]>(`/exercises/body-part/${bodyPart}`),
  );
  return { data, error };
};

export const findExercisesByEquipment = async (equipment: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Exercise[]>(`/exercises/equipment/${equipment}`),
  );
  return { data, error };
};

export const findExercisesByName = async (name: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Exercise[]>(`/exercises/name/${name}`),
  );
  return { data, error };
};
