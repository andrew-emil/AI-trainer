import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkoutCalendar from '@/components/schedule/WorkoutCalendar';
import UpcomingWorkouts from '@/components/schedule/UpcomingWorkouts';
import { useNutrition } from '@/contexts/NutritionContext';
import { useWorkout } from '@/contexts/WorkoutContext';
import { useWorkoutPlan } from '@/hooks/useWorkoutPlans';
import WorkoutLogger from '@/components/workout/WorkoutLogger';
import { useState, useMemo } from 'react';
import { ScheduledWorkout } from '@/types/nutrition';
import { parseISO } from 'date-fns';

const Schedule = () => {
  const { t } = useTranslation();
  const { currentUser } = useWorkout();
  const {
    scheduledWorkouts,
    getScheduledWorkoutsForTrainee,
    updateScheduledWorkout,
  } = useNutrition();

  const [activeWorkoutForLogger, setActiveWorkoutForLogger] =
    useState<ScheduledWorkout | null>(null);

  const { data: planDetails } = useWorkoutPlan(
    activeWorkoutForLogger?.planId || '',
  );

  const dayDetails = useMemo(() => {
    if (!planDetails || !activeWorkoutForLogger) return null;
    return (
      planDetails.days.find((d) => d.id === activeWorkoutForLogger.dayId) ||
      planDetails.days.find((d) => d.name === activeWorkoutForLogger.dayName) ||
      null
    );
  }, [planDetails, activeWorkoutForLogger]);

  // Get workouts for current trainee (or all if trainer)
  const displayedWorkouts =
    currentUser.role === 'trainer'
      ? scheduledWorkouts
      : getScheduledWorkoutsForTrainee(currentUser.id);

  const handleMarkComplete = (workoutId: string) => {
    updateScheduledWorkout(workoutId, { completed: true, notes: 'Completed!' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {t('schedule.title')}{' '}
              <span className="text-gradient-gold">
                {t('schedule.titleHighlight')}
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {currentUser.role === 'trainer'
                ? t('schedule.trainerSubtitle')
                : t('schedule.traineeSubtitle')}
            </p>
          </div>
        </div>

        {/* Upcoming Workouts Widget */}
        <div className="max-w-2xl">
          <UpcomingWorkouts
            scheduledWorkouts={displayedWorkouts}
            onMarkComplete={handleMarkComplete}
            onWorkoutClick={(workout) => setActiveWorkoutForLogger(workout)}
          />
        </div>

        {/* Calendar */}
        <WorkoutCalendar
          scheduledWorkouts={displayedWorkouts}
          onWorkoutClick={(workout) => setActiveWorkoutForLogger(workout)}
        />
      </div>

      {activeWorkoutForLogger && dayDetails && (
        <WorkoutLogger
          isOpen={!!activeWorkoutForLogger}
          onClose={() => setActiveWorkoutForLogger(null)}
          dayId={dayDetails.id || ''}
          scheduledDate={
            activeWorkoutForLogger.scheduledDate
              ? parseISO(activeWorkoutForLogger.scheduledDate)
              : undefined
          }
          plan={{
            id: activeWorkoutForLogger.planId,
            name: activeWorkoutForLogger.planName,
            exercises: dayDetails.exercises?.map((de: any) => ({
              ...de.exercise,
              id: de.exerciseId,
              workoutDayExerciseId: de.id,
              sets: de.sets,
              reps: de.repsMin,
              weight: 0,
              restSeconds: de.restSeconds,
              dayId: dayDetails.id,
            })),
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Schedule;
