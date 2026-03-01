import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  findAllExercises,
  findExerciseById,
  findExercisesByTargetMuscle,
  findExercisesByBodyPart,
  findExercisesByEquipment,
  findExercisesByName,
} from '@/services/exercises';
import { Exercise } from '@/types/entities';
import { Paginated } from '@/types/paginate';

export const useExercises = (
  params: { page?: number; limit?: number; search?: string } = {},
) => {
  return useQuery({
    queryKey: ['exercises', params],
    queryFn: async () => {
      const { data, error } = await findAllExercises(params);
      if (error) throw error;
      return data;
    },
  });
};

export const useInfiniteExercises = (
  params: {
    limit?: number;
    search?: string;
    muscle?: string;
    bodyPart?: string;
    equipment?: string;
    enabled?: boolean;
  } = {},
) => {
  const { muscle, bodyPart, equipment, search, limit } = params;

  return useInfiniteQuery({
    queryKey: ['exercises', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      // 1. Specialized filters (These typically don't support pagination in the current API)
      // We prioritize these because they return the full list, which allows accurate local "AND" logic on the frontend.
      if (muscle && muscle !== 'all') {
        const { data, error } = await findExercisesByTargetMuscle(muscle);
        if (error) throw error;
        return data;
      }

      if (bodyPart && bodyPart !== 'all') {
        const { data, error } = await findExercisesByBodyPart(bodyPart);
        if (error) throw error;
        return data;
      }

      if (equipment && equipment !== 'all') {
        const { data, error } = await findExercisesByEquipment(equipment);
        if (error) throw error;
        return data;
      }

      // 2. Search filter (if no category is selected)
      if (search) {
        const { data, error } = await findAllExercises({
          search,
          page: pageParam as number,
          limit,
        });
        if (error) throw error;
        return data;
      }

      // 3. Default: Paginated all exercises
      const { data, error } = await findAllExercises({
        page: pageParam as number,
        limit,
      });
      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // Disable pagination for specialized filter results which return Exercise[] instead of Paginated<Exercise>
      if (Array.isArray(lastPage)) {
        return undefined;
      }

      // 1. If we have meta data, use it (it's the most reliable)
      if (lastPage && 'meta' in lastPage && lastPage.meta) {
        if (lastPage.meta.currentPage >= lastPage.meta.totalPages)
          return undefined;
        return lastPage.meta.currentPage + 1;
      }

      // 2. Fallback: If no meta but we got a full batch (16 items), assume there's more.
      // Note: This fallback is less reliable if the backend doesn't return meta.
      const lastPageItems = lastPage?.data || [];
      const itemsPerPage =
        lastPage && 'meta' in lastPage ? lastPage.meta.itemsPerPage : 16;
      if (lastPageItems.length >= itemsPerPage) {
        return allPages.length + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    enabled: params.enabled ?? true,
  });
};

export const useExercise = (id: string) => {
  return useQuery({
    queryKey: ['exercise', id],
    queryFn: async () => {
      const { data, error } = await findExerciseById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useExercisesByTargetMuscle = (muscle: string) => {
  return useQuery({
    queryKey: ['exercises', 'targetMuscle', muscle],
    queryFn: async () => {
      const { data, error } = await findExercisesByTargetMuscle(muscle);
      if (error) throw error;
      return data || [];
    },
    enabled: !!muscle,
  });
};

export const useExercisesByBodyPart = (bodyPart: string) => {
  return useQuery({
    queryKey: ['exercises', 'bodyPart', bodyPart],
    queryFn: async () => {
      const { data, error } = await findExercisesByBodyPart(bodyPart);
      if (error) throw error;
      return data || [];
    },
    enabled: !!bodyPart,
  });
};

export const useExercisesByEquipment = (equipment: string) => {
  return useQuery({
    queryKey: ['exercises', 'equipment', equipment],
    queryFn: async () => {
      const { data, error } = await findExercisesByEquipment(equipment);
      if (error) throw error;
      return data || [];
    },
    enabled: !!equipment,
  });
};

export const useExercisesByName = (name: string) => {
  return useQuery({
    queryKey: ['exercises', 'name', name],
    queryFn: async () => {
      const { data, error } = await findExercisesByName(name);
      if (error) throw error;
      return data || [];
    },
    enabled: !!name,
  });
};
