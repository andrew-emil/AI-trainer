import {
  getAssignedNutritionPlans,
  getAssignedTrainers,
  getAssignedWorkoutPlans,
} from '@/services/trainee';
import { getAssignedWorkoutPlanForTrainee } from '@/services/trainer';
import { UserRole } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

/**
 * Hook to fetch workout plans assigned to a trainee.
 * If traineeId is provided (for trainers), fetches for that specific trainee.
 * If no traineeId (for trainees), fetches for the current user.
 */
export const useTraineeAssignedWorkoutPlans = (traineeId?: string) => {
  const { auth } = useAuth();
  const role = auth?.user?.role;

  const isTraineeFetchingOwn = role === UserRole.trainee && !traineeId;
  const isTrainerFetchingTrainee = role === UserRole.trainer && !!traineeId;

  const isEnabled = isTraineeFetchingOwn || isTrainerFetchingTrainee;

  return useQuery({
    queryKey: ['traineeWorkoutPlans', traineeId || 'me'],
    queryFn: async () => {
      if (isTrainerFetchingTrainee && traineeId) {
        try {
          const data = await getAssignedWorkoutPlanForTrainee(
            traineeId,
            true,
          );
          return data || [];
        } catch (error) {
          console.error(error);
          return [];
        }
      } else {
        try {
          const data = await getAssignedWorkoutPlans();
          return data || [];
        } catch (error) {
          console.error(error);
          return [];
        }
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
      try {
        const data = await getAssignedNutritionPlans();
        return data || [];
      } catch (error) {
        console.error(error);
        return [];
      }
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
      try {
        const data = await getAssignedTrainers();
        return data || null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    enabled: isTrainee,
  });
};
