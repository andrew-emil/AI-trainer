import { axiosClient } from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { Equipment } from '@/types/entities';

export const findAllEquipments = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Equipment[]>('/equipments')
  );
  return { data, error };
};

export const findEquipmentById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Equipment>(`/equipments/${id}`)
  );
  return { data, error };
};

export const findEquipmentsByName = async (name: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Equipment[]>(`/equipments/search/${name}`)
  );
  return { data, error };
};
