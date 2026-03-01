import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Check,
  Clock,
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ScheduledWorkout } from '@/types/nutrition';
import EgyptianCard from '@/components/ui/EgyptianCard';

interface WorkoutCalendarProps {
  scheduledWorkouts: ScheduledWorkout[];
  onDateSelect?: (date: Date) => void;
  onWorkoutClick?: (workout: ScheduledWorkout) => void;
}

const WorkoutCalendar = ({
  scheduledWorkouts,
  onDateSelect,
  onWorkoutClick,
}: WorkoutCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const getWorkoutsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return scheduledWorkouts.filter((w) => w.scheduledDate === dateStr);
  };

  const selectedDateWorkouts = selectedDate
    ? getWorkoutsForDate(selectedDate)
    : [];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <EgyptianCard className="lg:col-span-2">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const dayWorkouts = getWorkoutsForDate(day);
              const hasWorkouts = dayWorkouts.length > 0;
              const allCompleted =
                hasWorkouts && dayWorkouts.every((w) => w.completed);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <motion.button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square p-2 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-primary/20 border-2 border-primary'
                      : isToday
                        ? 'bg-accent/10 border border-accent/30'
                        : 'border border-transparent hover:bg-muted/20'
                  } ${!isCurrentMonth && 'opacity-40'}`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isSelected
                        ? 'text-primary'
                        : isToday
                          ? 'text-accent'
                          : 'text-foreground'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>

                  {hasWorkouts && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayWorkouts.slice(0, 3).map((w, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            w.completed ? 'bg-green-500' : 'bg-primary'
                          }`}
                        />
                      ))}
                      {dayWorkouts.length > 3 && (
                        <span className="text-[8px] text-muted-foreground">
                          +{dayWorkouts.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-accent bg-accent/20" />
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
          </div>
        </div>
      </EgyptianCard>

      {/* Selected Date Details */}
      <EgyptianCard>
        <div className="p-6">
          <h3 className="font-heading text-lg font-bold text-foreground mb-4">
            {selectedDate
              ? format(selectedDate, 'EEEE, MMMM d')
              : 'Select a date'}
          </h3>

          {selectedDateWorkouts.length > 0 ? (
            <div className="space-y-3">
              {selectedDateWorkouts.map((workout) => (
                <motion.div
                  key={workout.id}
                  onClick={() => onWorkoutClick?.(workout)}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    workout.completed
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-primary/10 border-primary/30 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        workout.completed ? 'bg-green-500/20' : 'bg-primary/20'
                      }`}
                    >
                      {workout.completed ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Dumbbell className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {workout.planName}
                      </p>
                      {workout.dayName && (
                        <p className="text-sm text-primary mt-1">
                          {workout.dayName}
                        </p>
                      )}

                      {workout.notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {workout.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Dumbbell className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No workouts scheduled</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                This day is free for rest or activities
              </p>
            </div>
          )}
        </div>
      </EgyptianCard>
    </div>
  );
};

export default WorkoutCalendar;
