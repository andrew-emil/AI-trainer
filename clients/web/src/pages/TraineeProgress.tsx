import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ChevronLeft,
  Loader2,
  Scale,
  Target,
  Activity,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import WorkoutFrequencyChart from '@/components/progress/WorkoutFrequencyChart';
import WeightProgressionChart from '@/components/progress/WeightProgressionChart';
import VolumeChart from '@/components/progress/VolumeChart';
import BodyWeightChart from '@/components/progress/BodyWeightChart';
import StrengthGainsChart from '@/components/progress/StrengthGainsChart';
import WorkoutSummaryChart from '@/components/progress/WorkoutSummaryChart';
import {
  findAllWorkoutLogsForATrainee,
  getWorkoutSummary,
  getProgressiveOverload,
} from '@/services/workout-log';
import {
  getBodyWeightLogsByTrainee,
  analyzeWeightChanges,
  getWeightTrend,
} from '@/services/body-weight-log';
import { findTraineeById } from '@/services/trainee';
import { getAssignedWorkoutPlanForTrainee } from '@/services/trainer';
import { toast } from 'sonner';
import {
  GroupedWorkoutResult,
  ProgressiveOverloadResult,
} from '@/types/workout-log';
import { BodyWeightLog } from '@/types/entities';
import { TraineeWithUser } from '@/types/trainer';
import { WorkoutLog } from '@/types/workout-log';

import { useAuth } from '@/hooks/useAuth';
import { format, isValid } from 'date-fns';

const TraineeProgress = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { auth } = useAuth();

  // Determine the target trainee ID: failing back to auth user id if no param
  const traineeId = id || auth?.user?.id;

  const [loading, setLoading] = useState(true);
  const [trainee, setTrainee] = useState<TraineeWithUser | null>(null);

  // Data States
  const [rawSessions, setRawSessions] = useState<any[]>([]);
  const [workoutSummary, setWorkoutSummary] = useState<GroupedWorkoutResult[]>(
    [],
  );
  const [progressiveOverload, setProgressiveOverload] = useState<
    ProgressiveOverloadResult[]
  >([]);
  const [weightLogs, setWeightLogs] = useState<BodyWeightLog[]>([]);
  const [weightAnalysis, setWeightAnalysis] = useState<any>(null);
  const [weightTrend, setWeightTrend] = useState<any[]>([]);
  const [activePlan, setActivePlan] = useState<string | null>(null);

  // Filter States
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const fetchData = async () => {
      if (!traineeId) return;
      setLoading(true);
      try {
        const { data: traineeData, error: traineeError } =
          await findTraineeById(traineeId);
        if (traineeData) setTrainee(traineeData);
        if (traineeError) throw new Error(traineeError.message);

        const { data: logsData } = await findAllWorkoutLogsForATrainee(
          traineeId,
          {
            limit: 100,
          },
        );
        // @ts-ignore
        setRawSessions(logsData?.data || []);

        const { data: summaryData } = await getWorkoutSummary(traineeId, {
          by: 'exerciseId',
        });
        if (summaryData) {
          setWorkoutSummary(summaryData);
          if (summaryData.length > 0 && summaryData[0].exerciseName) {
            setSelectedExercise(summaryData[0].exerciseName);
          }
        }

        const { data: overloadData } = await getProgressiveOverload(traineeId);
        if (overloadData) setProgressiveOverload(overloadData);

        const { data: weightData } =
          await getBodyWeightLogsByTrainee(traineeId);
        if (weightData) setWeightLogs(weightData);

        const { data: analysisData } = await analyzeWeightChanges(traineeId);
        if (analysisData) setWeightAnalysis(analysisData);

        const { data: trendData } = await getWeightTrend(traineeId);
        if (trendData) {
          if (Array.isArray((trendData as any).trend)) {
            setWeightTrend((trendData as any).trend);
          } else if (Array.isArray(trendData)) {
            setWeightTrend(trendData);
          } else if (Array.isArray((trendData as any).data)) {
            setWeightTrend((trendData as any).data);
          } else {
            setWeightTrend([]);
          }
        }

        // Fetch Active Plan
        const { data: plansData } = await getAssignedWorkoutPlanForTrainee(
          traineeId,
          true,
        );
        if (plansData && plansData.length > 0) {
          setActivePlan(plansData[0].plan.name);
        }
      } catch (error) {
        console.error(error);
        toast.error(t('common.errorOccurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [traineeId, t]);

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
              value={selectedExercise}
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
            exerciseName={selectedExercise}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeProgress;
