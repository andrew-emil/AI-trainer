import { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { WorkoutLog } from '@/types/workout-log';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Dumbbell } from 'lucide-react';

interface StrengthGainsChartProps {
  workoutLogs: WorkoutLog[];
}

const StrengthGainsChart = ({ workoutLogs }: StrengthGainsChartProps) => {
  const chartData = useMemo(() => {
    const exerciseStats: Record<
      string,
      { first: number; last: number; count: number }
    > = {};

    // Sort logs by date
    const sortedLogs = [...workoutLogs].sort(
      (a, b) => new Date(a.loggedAt).getTime() - new Date(b.loggedAt).getTime(),
    );

    sortedLogs.forEach((log) => {
      log.completedExercises.forEach((exercise) => {
        const maxWeight = Math.max(
          ...exercise.sets
            .filter((s) => s.completed && s.weight)
            .map((s) => s.weight || 0),
          0,
        );

        if (maxWeight > 0) {
          if (!exerciseStats[exercise.exerciseName]) {
            exerciseStats[exercise.exerciseName] = {
              first: maxWeight,
              last: maxWeight,
              count: 1,
            };
          } else {
            exerciseStats[exercise.exerciseName].last = maxWeight;
            exerciseStats[exercise.exerciseName].count++;
          }
        }
      });
    });

    // Get top 6 exercises by count
    return Object.entries(exerciseStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 6)
      .map(([name, stats]) => ({
        exercise: name.length > 12 ? name.substring(0, 12) + '...' : name,
        fullName: name,
        initial: stats.first,
        current: stats.last,
        gain: Math.round(((stats.last - stats.first) / stats.first) * 100),
      }));
  }, [workoutLogs]);

  const totalGain =
    chartData.length > 0
      ? Math.round(
          chartData.reduce((sum, d) => sum + d.gain, 0) / chartData.length,
        )
      : 0;

  return (
    <EgyptianCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              Strength Gains
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Weight progression across exercises
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
            <Dumbbell className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              +{totalGain}% avg gain
            </span>
          </div>
        </div>

        {chartData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" opacity={0.5} />
                <PolarAngleAxis
                  dataKey="exercise"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 'auto']}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <Radar
                  name="Initial Weight"
                  dataKey="initial"
                  stroke="hsl(var(--muted-foreground))"
                  fill="hsl(var(--muted-foreground))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Current Weight"
                  dataKey="current"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px' }}
                  formatter={(value) => (
                    <span style={{ color: 'hsl(var(--foreground))' }}>
                      {value}
                    </span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center">
            <div className="text-center">
              <Dumbbell className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">
                Complete workouts to see strength gains
              </p>
            </div>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/30">
            {chartData.slice(0, 4).map((exercise, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/20"
              >
                <span className="text-sm text-muted-foreground truncate flex-1">
                  {exercise.fullName}
                </span>
                <span
                  className={`text-sm font-bold ml-2 ${
                    exercise.gain >= 0 ? 'text-green-500' : 'text-destructive'
                  }`}
                >
                  {exercise.gain >= 0 ? '+' : ''}
                  {exercise.gain}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </EgyptianCard>
  );
};

export default StrengthGainsChart;
