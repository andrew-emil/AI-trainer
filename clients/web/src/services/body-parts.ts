import { axiosClient } from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { BodyPart } from '@/types/entities';

export const findAllBodyParts = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<BodyPart[]>('/body-parts')
  );
  return { data, error };
};

export const findBodyPartById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<BodyPart>(`/body-parts/${id}`)
  );
  return { data, error };
};

export const findBodyPartsByName = async (name: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<BodyPart[]>(`/body-parts/search/${name}`)
  );
  return { data, error };
};
