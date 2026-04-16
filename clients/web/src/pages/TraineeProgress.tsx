/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from '@/components/layout/DashboardLayout';
import BodyWeightChart from '@/components/progress/BodyWeightChart';
import StrengthGainsChart from '@/components/progress/StrengthGainsChart';
import VolumeChart from '@/components/progress/VolumeChart';
import WeightProgressionChart from '@/components/progress/WeightProgressionChart';
import WorkoutFrequencyChart from '@/components/progress/WorkoutFrequencyChart';
import WorkoutSummaryChart from '@/components/progress/WorkoutSummaryChart';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  analyzeWeightChanges,
  getBodyWeightLogsByTrainee,
  getWeightTrend,
} from '@/services/body-weight-log';
import { findTraineeById, traineeQueryKeys } from '@/services/trainee';
import { getAssignedWorkoutPlanForTrainee } from '@/services/trainer';
import {
  findAllWorkoutLogsForATrainee,
  getProgressiveOverload,
  getWorkoutSummary,
} from '@/services/workout-log';
import { WorkoutLog } from '@/types/workout-log';
import { motion } from 'framer-motion';
import {
  Activity,
  ChevronLeft,
  Loader2,
  Target,
  TrendingUp
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const TraineeProgress = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { auth } = useAuth();

  // Determine the target trainee ID: failing back to auth user id if no param
  const traineeId = id || auth?.user?.id;

  // Set up all queries
  const { data: trainee, isPending: loadingTrainee } = useQuery({
    queryKey: traineeQueryKeys.detail(traineeId || ''),
    queryFn: async () => await findTraineeById(id),
    enabled: !!traineeId,
  });

  const { data: rawSessions = [], isPending: loadingLogs } = useQuery({
    queryKey: ['workoutLogs', traineeId],
    queryFn: async () => {
      const { data, error } = await findAllWorkoutLogsForATrainee(traineeId!, { limit: 100 });
      if (error) throw error;
      return (data?.data as any[]) || [];
    },
    enabled: !!traineeId,
  });

  const { data: workoutSummary = [], isPending: loadingSummary } = useQuery({
    queryKey: ['workoutSummary', traineeId],
    queryFn: async () => {
      const { data, error } = await getWorkoutSummary(traineeId!, { by: 'exerciseId' });
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });

  const { data: progressiveOverload = [], isPending: loadingOverload } = useQuery({
    queryKey: ['progressiveOverload', traineeId],
    queryFn: async () => {
      const { data, error } = await getProgressiveOverload(traineeId!);
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });

  const { data: weightLogs = [], isPending: loadingWeightLogs } = useQuery({
    queryKey: ['bodyWeightLogs', traineeId],
    queryFn: async () => {
      const { data, error } = await getBodyWeightLogsByTrainee(traineeId!);
      if (error) throw error;
      return data || [];
    },
    enabled: !!traineeId,
  });

  const { data: weightAnalysis = null, isPending: loadingAnalysis } = useQuery({
    queryKey: ['weightAnalysis', traineeId],
    queryFn: async () => {
      const { data, error } = await analyzeWeightChanges(traineeId!);
      if (error) throw error;
      return data;
    },
    enabled: !!traineeId,
  });

  const { data: weightTrend = [], isPending: loadingTrend } = useQuery({
    queryKey: ['weightTrend', traineeId],
    queryFn: async () => {
      const { data, error } = await getWeightTrend(traineeId!);
      if (error) throw error;
      let trendData: any[] = [];
      if (data) {
        if (Array.isArray((data as any).trend)) {
          trendData = (data as any).trend;
        } else if (Array.isArray(data)) {
          trendData = data;
        } else if (Array.isArray((data as any).data)) {
          trendData = (data as any).data;
        }
      }
      return trendData;
    },
    enabled: !!traineeId,
  });

  const { data: assignedPlans = [], isPending: loadingPlans } = useQuery({
    queryKey: ['assignedWorkoutPlan', traineeId],
    queryFn: async () => {
      return await getAssignedWorkoutPlanForTrainee(traineeId!, true);
    },
    enabled: !!traineeId,
  });

  const activePlan = assignedPlans && assignedPlans.length > 0 ? assignedPlans[0].plan.name : null;

  const loading = loadingTrainee || loadingLogs || loadingSummary || loadingOverload || loadingWeightLogs || loadingAnalysis || loadingTrend || loadingPlans;

  // Filter States
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  const activeExercise = selectedExercise || (workoutSummary && workoutSummary.length > 0 && workoutSummary[0].exerciseName ? workoutSummary[0].exerciseName : '');
  const isRTL = i18n.language === 'ar';

  // --- ADAPTERS ---

  const frequencyLogs = useMemo<WorkoutLog[]>(() => {
    return rawSessions.map(
      (session) =>
        ({
          id: session.id,
          planId: '',
          planName: '',
          traineeId: id || '',
          completedExercises: [],
          duration: session.totalDuration ? session.totalDuration / 60 : 0,
          loggedAt: session.startedAt,
        }) as unknown as WorkoutLog,
    );
  }, [rawSessions, id]);

  const performanceLogs = useMemo<WorkoutLog[]>(() => {
    const nameMap = new Map<string, string>();
    workoutSummary.forEach((item) => {
      if (item.exerciseId && item.exerciseName) {
        nameMap.set(item.exerciseId, item.exerciseName);
      }
    });

    return progressiveOverload.map((item) => {
      const name = nameMap.get(item.exerciseId) || 'Unknown Exercise';
      return {
        id: `po-${item.exerciseId}-${item.loggedAt}`,
        loggedAt: item.loggedAt,
        planId: '',
        planName: '',
        traineeId: id || '',
        duration: 0,
        completedExercises: [
          {
            exerciseId: item.exerciseId,
            exerciseName: name,
            sets: [
              {
                weight: item.weight,
                reps:
                  item.weight > 0 ? Math.round(item.volume / item.weight) : 0,
                setNumber: 1,
                completed: true,
              },
            ],
          },
        ],
      } as unknown as WorkoutLog;
    });
  }, [progressiveOverload, workoutSummary, id]);

  const exerciseNames = useMemo(() => {
    return workoutSummary
      .map((s) => s.exerciseName)
      .filter((n): n is string => !!n);
  }, [workoutSummary]);

  const summaryItems = useMemo(
    () => [
      {
        label: t('weightLog.summary.startWeight'),
        value: weightAnalysis?.startWeight
          ? `${weightAnalysis.startWeight} kg`
          : '--',
        icon: Target,
        color: 'text-primary',
      },
      {
        label: t('weightLog.summary.currentWeight'),
        value: weightAnalysis?.endWeight
          ? `${weightAnalysis.endWeight} kg`
          : '--',
        icon: Activity,
        color: 'text-accent',
      },
      {
        label: t('weightLog.summary.totalChange'),
        value: weightAnalysis?.weightChange
          ? `${weightAnalysis.weightChange > 0 ? '+' : ''}${weightAnalysis.weightChange} kg`
          : '--',
        icon: TrendingUp,
        subValue: weightAnalysis?.weightChangePercentage
          ? `${weightAnalysis.weightChangePercentage}%`
          : '',
        color:
          weightAnalysis?.weightChange < 0 ? 'text-green-500' : 'text-primary',
      },
    ],
    [weightAnalysis, t],
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
        </div>
      </DashboardLayout>
    );
  }

  if (!trainee) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link
            to={`/trainees/${id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-egyptian-gold transition-colors gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('common.back')}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                {t('progress.traineeTitle', { name: trainee.user.firstName })}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t('progress.traineeSubtitle')}
              </p>
            </div>
            {activePlan && (
              <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-heading font-bold">
                {t('progress.currentPlan', { plan: activePlan })}
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EgyptianCard>
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/30 flex items-center justify-center shadow-inner">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {item.value}
                      </p>
                      {item.subValue && (
                        <span className="text-xs font-medium text-muted-foreground">
                          ({item.subValue})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </EgyptianCard>
            </motion.div>
          ))}
        </div>

        <EgyptianDivider />

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WorkoutFrequencyChart workoutLogs={frequencyLogs} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <VolumeChart workoutLogs={performanceLogs} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StrengthGainsChart workoutLogs={performanceLogs} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <WorkoutSummaryChart summary={workoutSummary} isRTL={isRTL} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <BodyWeightChart trend={weightTrend} isRTL={isRTL} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">
              {t('progress.trackExercise')}
            </label>
            <Select
              value={activeExercise}
              onValueChange={setSelectedExercise}
            >
              <SelectTrigger className="w-full md:w-[280px] bg-muted/20 border-border/30 text-foreground">
                <SelectValue
                  placeholder={
                    t('progress.selectExercise') || 'Select exercise'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {exerciseNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <WeightProgressionChart
            workoutLogs={performanceLogs}
            exerciseName={activeExercise}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeProgress;
