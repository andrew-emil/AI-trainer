import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { WorkoutLog } from '@/types/workout-log';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface WeightProgressionChartProps {
  workoutLogs: WorkoutLog[];
  exerciseName?: string;
}

const WeightProgressionChart = ({
  workoutLogs,
  exerciseName = 'Bench Press',
}: WeightProgressionChartProps) => {
  const chartData = useMemo(() => {
    const exerciseData: { date: string; weight: number; reps: number }[] = [];

    workoutLogs
      .sort(
        (a, b) =>
          new Date(a.loggedAt).getTime() - new Date(b.loggedAt).getTime(),
      )
      .forEach((log) => {
        log.completedExercises.forEach((exercise) => {
          if (
            exercise.exerciseName
              .toLowerCase()
              .includes(exerciseName.toLowerCase())
          ) {
            const maxWeight = Math.max(
              ...exercise.sets
                .filter((s) => s.completed && s.weight)
                .map((s) => s.weight || 0),
            );
            const totalReps = exercise.sets
              .filter((s) => s.completed)
              .reduce((sum, s) => sum + s.reps, 0);

            if (maxWeight > 0) {
              exerciseData.push({
                date: format(new Date(log.loggedAt), 'MMM d'),
                weight: maxWeight,
                reps: totalReps,
              });
            }
          }
        });
      });

    return exerciseData;
  }, [workoutLogs, exerciseName]);

  const firstWeight = chartData[0]?.weight || 0;
  const lastWeight = chartData[chartData.length - 1]?.weight || 0;
  const weightChange = lastWeight - firstWeight;
  const percentChange =
    firstWeight > 0 ? ((weightChange / firstWeight) * 100).toFixed(1) : 0;
  const isPositive = weightChange >= 0;

  return (
    <EgyptianCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              Weight Progression
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {exerciseName} max weight over time
            </p>
          </div>
          {chartData.length > 1 && (
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isPositive
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-destructive/10 border border-destructive/20'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span
                className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-destructive'}`}
              >
                {isPositive ? '+' : ''}
                {weightChange}kg ({percentChange}%)
              </span>
            </div>
          )}
        </div>

        {chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 5', 'dataMax + 5']}
                  unit="kg"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  labelStyle={{
                    color: 'hsl(var(--foreground))',
                    fontWeight: 'bold',
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'weight' ? `${value}kg` : `${value} reps`,
                    name === 'weight' ? 'Max Weight' : 'Total Reps',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: 'hsl(var(--primary))',
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">
              No data for {exerciseName} yet
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-primary">
              {firstWeight}kg
            </p>
            <p className="text-xs text-muted-foreground">Starting Weight</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent">
              {lastWeight}kg
            </p>
            <p className="text-xs text-muted-foreground">Current Weight</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-secondary">
              {Math.max(...chartData.map((d) => d.weight), 0)}kg
            </p>
            <p className="text-xs text-muted-foreground">Personal Best</p>
          </div>
        </div>
      </div>
    </EgyptianCard>
  );
};

export default WeightProgressionChart;
