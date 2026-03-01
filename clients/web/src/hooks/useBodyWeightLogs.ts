import { useQuery } from '@tanstack/react-query';
import {
  analyzeWeightChanges,
  getWeightTrend,
  getBodyWeightLogsByTrainee,
} from '@/services/body-weight-log';

export const useWeightAnalytics = (traineeId: string) => {
  return useQuery({
    queryKey: ['weightAnalytics', traineeId],
    queryFn: async () => {
      const { data, error } = await analyzeWeightChanges(traineeId);
      if (error) throw error;
      return data;
    },
    enabled: !!traineeId,
  });
};

export const useWeightTrend = (traineeId: string) => {
  return useQuery({
    queryKey: ['weightTrend', traineeId],
    queryFn: async () => {
      const { data, error } = await getWeightTrend(traineeId);
      if (error) throw error;
      return data;
    },
    enabled: !!traineeId,
  });
};

export const useBodyWeightHistory = (traineeId: string) => {
  return useQuery({
    queryKey: ['bodyWeightHistory', traineeId],
    queryFn: async () => {
      const { data, error } = await getBodyWeightLogsByTrainee(traineeId);
      if (error) throw error;
      return data;
    },
    enabled: !!traineeId,
  });
};
