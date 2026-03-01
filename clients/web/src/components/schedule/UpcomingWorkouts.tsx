import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Clock, Calendar, Check } from 'lucide-react';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import { ScheduledWorkout } from '@/types/nutrition';
import EgyptianCard from '@/components/ui/EgyptianCard';

interface UpcomingWorkoutsProps {
  scheduledWorkouts: ScheduledWorkout[];
  onMarkComplete?: (workoutId: string) => void;
  onWorkoutClick?: (workout: ScheduledWorkout) => void;
}

const UpcomingWorkouts = ({
  scheduledWorkouts,
  onMarkComplete,
  onWorkoutClick,
}: UpcomingWorkoutsProps) => {
  const sortedWorkouts = useMemo(() => {
    return [...scheduledWorkouts]
      .filter((w) => !w.completed)
      .sort((a, b) => {
        const dateA = new Date(
          `${a.scheduledDate}T${a.scheduledTime || '00:00'}`,
        );
        const dateB = new Date(
          `${b.scheduledDate}T${b.scheduledTime || '00:00'}`,
        );
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 5);
  }, [scheduledWorkouts]);

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  const isPastDue = (dateStr: string, timeStr?: string) => {
    const dateTime = new Date(`${dateStr}T${timeStr || '23:59'}`);
    return isPast(dateTime);
  };

  return (
    <EgyptianCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-xl font-bold text-foreground">
            Upcoming Workouts
          </h3>
          <Calendar className="w-5 h-5 text-primary" />
        </div>

        {sortedWorkouts.length > 0 ? (
          <div className="space-y-4">
            {sortedWorkouts.map((workout, index) => {
              const pastDue = isPastDue(
                workout.scheduledDate,
                workout.scheduledTime,
              );

              return (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    pastDue
                      ? 'bg-destructive/10 border-destructive/30'
                      : 'bg-muted/10 border-border/30 hover:border-primary/30'
                  } ${onWorkoutClick ? 'cursor-pointer hover:bg-muted/20' : ''}`}
                  onClick={() => onWorkoutClick?.(workout)}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      pastDue ? 'bg-destructive/20' : 'bg-primary/20'
                    }`}
                  >
                    <Dumbbell
                      className={`w-6 h-6 ${pastDue ? 'text-destructive' : 'text-primary'}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {workout.planName}
                    </p>
                    {workout.dayName && (
                      <p className="text-sm text-primary truncate">
                        {workout.dayName}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`text-sm ${
                          pastDue ? 'text-destructive' : 'text-muted-foreground'
                        }`}
                      >
                        {getDateLabel(workout.scheduledDate)}
                      </span>
                    </div>
                  </div>

                  {onMarkComplete && (
                    <motion.button
                      onClick={() => onMarkComplete(workout.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-500 hover:bg-green-500/30 transition-colors"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Dumbbell className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">No upcoming workouts</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              All caught up! Great job staying on track.
            </p>
          </div>
        )}
      </div>
    </EgyptianCard>
  );
};

export default UpcomingWorkouts;
