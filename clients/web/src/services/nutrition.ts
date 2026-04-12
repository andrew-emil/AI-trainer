import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { Food } from '@/types/entities';

export const findAllFoods = async (skip?: number, take?: number) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Food[]>('/nutrition', {
      params: { skip, take },
    })
  );
  return { data, error };
};

export const findFoodById = async (id: string) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Food>(`/nutrition/${id}`)
  );
  return { data, error };
};

export const searchFoods = async (
  q: string,
  page: number = 1,
  limit: number = 20
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Food[]>('/nutrition/search/foods', {
      params: { q, page, limit },
    })
  );
  return { data, error };
};
