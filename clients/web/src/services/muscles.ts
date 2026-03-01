import { axiosClient } from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { Muscle } from '@/types/entities';

export const findAllMuscles = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Muscle[]>('/muscles')
  );
  return { data, error };
};

export const findMuscleById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Muscle>(`/muscles/${id}`)
  );
  return { data, error };
};

export const findMusclesByName = async (name: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Muscle[]>(`/muscles/search/${name}`)
  );
  return { data, error };
};
