import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Dumbbell, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkoutFrequencyChart from '@/components/progress/WorkoutFrequencyChart';
import WeightProgressionChart from '@/components/progress/WeightProgressionChart';
import StrengthGainsChart from '@/components/progress/StrengthGainsChart';
import VolumeChart from '@/components/progress/VolumeChart';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { useWorkout } from '@/contexts/WorkoutContext';

// Generate sample workout logs for demo
const generateSampleLogs = () => {
  const logs = [];
  const exercises = [
    { name: 'Bench Press', baseWeight: 60 },
    { name: 'Squats', baseWeight: 80 },
    { name: 'Deadlift', baseWeight: 100 },
    { name: 'Shoulder Press', baseWeight: 30 },
    { name: 'Pull-ups', baseWeight: 0 },
    { name: 'Bicep Curls', baseWeight: 15 },
  ];

  for (let i = 60; i >= 0; i -= Math.floor(Math.random() * 4) + 2) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Progress multiplier (simulate getting stronger)
    const progressMultiplier = 1 + ((60 - i) / 60) * 0.15;

    const completedExercises = exercises
      .slice(0, Math.floor(Math.random() * 3) + 3)
      .map((ex, index) => ({
        exerciseId: `e${index}`,
        exerciseName: ex.name,
        sets: Array.from(
          { length: Math.floor(Math.random() * 2) + 3 },
          (_, setIndex) => ({
            setNumber: setIndex + 1,
            reps: Math.floor(Math.random() * 4) + 8,
            weight:
              ex.baseWeight > 0
                ? Math.round(
                    ex.baseWeight * progressMultiplier + Math.random() * 5,
                  )
                : undefined,
            completed: Math.random() > 0.1,
          }),
        ),
      }));

    logs.push({
      id: `log_sample_${i}`,
      planId: 'plan1',
      planName: 'Sample Workout',
      traineeId: 't1',
      completedExercises,
      completedAt: date.toISOString(),
      duration: Math.floor(Math.random() * 30) + 45,
    });
  }

  return logs;
};

const Progress = () => {
  const { t } = useTranslation();
  const { currentUser, workoutLogs, getLogsForTrainee } = useWorkout();
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');

  // Use sample data if no real logs exist
  const displayLogs = useMemo(() => {
    const userLogs =
      currentUser.role === 'trainer'
        ? workoutLogs
        : getLogsForTrainee(currentUser.id);

    return userLogs.length > 0 ? userLogs : generateSampleLogs();
  }, [currentUser, workoutLogs, getLogsForTrainee]);

  // Get unique exercise names from logs
  const exerciseNames = useMemo(() => {
    const names = new Set<string>();
    displayLogs.forEach((log) => {
      log.completedExercises.forEach((ex) => {
        names.add(ex.exerciseName);
      });
    });
    return Array.from(names);
  }, [displayLogs]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentLogs = displayLogs.filter(
      (log) => new Date(log.completedAt) >= thirtyDaysAgo,
    );

    let totalVolume = 0;
    let totalSets = 0;
    recentLogs.forEach((log) => {
      log.completedExercises.forEach((ex) => {
        ex.sets.forEach((set) => {
          if (set.completed) {
            totalSets++;
            totalVolume += set.reps * (set.weight || 0);
          }
        });
      });
    });

    return {
      workoutsThisMonth: recentLogs.length,
      totalVolume: Math.round(totalVolume / 1000),
      avgDuration:
        recentLogs.length > 0
          ? Math.round(
              recentLogs.reduce((sum, log) => sum + log.duration, 0) /
                recentLogs.length,
            )
          : 0,
      totalSets,
    };
  }, [displayLogs]);

  const statItems = [
    {
      icon: Calendar,
      labelKey: 'progress.stats.workouts30d',
      value: stats.workoutsThisMonth,
      color: 'primary',
    },
    {
      icon: Dumbbell,
      labelKey: 'progress.stats.volume30d',
      value: `${stats.totalVolume}t`,
      color: 'accent',
    },
    {
      icon: Target,
      labelKey: 'progress.stats.avgDuration',
      value: `${stats.avgDuration}min`,
      color: 'secondary',
    },
    {
      icon: TrendingUp,
      labelKey: 'progress.stats.totalSets',
      value: stats.totalSets,
      color: 'primary',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {t('progress.title')}{' '}
            <span className="text-gradient-gold">
              {t('progress.titleHighlight')}
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">{t('progress.subtitle')}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EgyptianCard>
                <div className="p-4 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                </div>
              </EgyptianCard>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WorkoutFrequencyChart workoutLogs={displayLogs} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <VolumeChart workoutLogs={displayLogs} />
          </motion.div>
        </div>

        {/* Weight Progression with Exercise Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">
              {t('progress.trackExercise')}
            </label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="px-4 py-2 rounded-lg bg-muted/20 border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
            >
              {exerciseNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <WeightProgressionChart
            workoutLogs={displayLogs}
            exerciseName={selectedExercise}
          />
        </motion.div>

        {/* Strength Gains Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl"
        >
          <StrengthGainsChart workoutLogs={displayLogs} />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
