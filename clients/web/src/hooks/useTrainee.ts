import { useQuery } from '@tanstack/react-query';
import {
  getAssignedWorkoutPlans,
  getAssignedNutritionPlans,
  getAssignedTrainers,
} from '@/services/trainee';
import { getAssignedWorkoutPlanForTrainee } from '@/services/trainer';
import { useAuth } from './useAuth';
import { UserRole } from '@/types/entities';

/**
 * Hook to fetch workout plans assigned to a trainee.
 * If traineeId is provided (for trainers), fetches for that specific trainee.
 * If no traineeId (for trainees), fetches for the current user.
 */
export const useTraineeAssignedWorkoutPlans = (traineeId?: string) => {
  const { auth } = useAuth();
  const role = auth?.user?.role;

  // Enable if:
  // 1. User is Trainee AND no traineeId provided (fetching own)
  // 2. User is Trainer AND traineeId provided (fetching for trainee)

  const isTraineeFetchingOwn = role === UserRole.trainee && !traineeId;
  const isTrainerFetchingTrainee = role === UserRole.trainer && !!traineeId;

  const isEnabled = isTraineeFetchingOwn || isTrainerFetchingTrainee;

  return useQuery({
    queryKey: ['traineeWorkoutPlans', traineeId || 'me'],
    queryFn: async () => {
      if (isTrainerFetchingTrainee && traineeId) {
        const { data, error } = await getAssignedWorkoutPlanForTrainee(
          traineeId,
          true,
        );
        if (error) throw error;
        return data || [];
      } else {
        const { data, error } = await getAssignedWorkoutPlans();
        if (error) throw error;
        return data || [];
      }
    },
    enabled: isEnabled,
  });
};

/**
 * Hook to fetch nutrition plans assigned to the current trainee
 */
export const useTraineeAssignedNutritionPlans = () => {
  const { auth } = useAuth();
  const isTrainee = auth?.user?.role === UserRole.trainee;

  return useQuery({
    queryKey: ['traineeNutritionPlans'],
    queryFn: async () => {
      const { data, error } = await getAssignedNutritionPlans();
      if (error) throw error;
      return data || [];
    },
    enabled: isTrainee,
  });
};

/**
 * Hook to fetch trainers assigned to the current trainee
 */
export const useTraineeAssignedTrainers = () => {
  const { auth } = useAuth();
  const isTrainee = auth?.user?.role === UserRole.trainee;

  return useQuery({
    queryKey: ['traineeAssignedTrainers'],
    queryFn: async () => {
      const { data, error } = await getAssignedTrainers();
      if (error) throw error;
      return data || null;
    },
    enabled: isTrainee,
  });
};
