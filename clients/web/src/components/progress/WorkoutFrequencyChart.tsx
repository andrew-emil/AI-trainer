import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  eachWeekOfInterval,
} from 'date-fns';
import { WorkoutLog } from '@/types/workout-log';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Calendar } from 'lucide-react';

interface WorkoutFrequencyChartProps {
  workoutLogs: WorkoutLog[];
  weeks?: number;
}

const WorkoutFrequencyChart = ({
  workoutLogs,
  weeks = 8,
}: WorkoutFrequencyChartProps) => {
  const chartData = useMemo(() => {
    const today = new Date();
    const startDate = subDays(today, weeks * 7);

    const weekIntervals = eachWeekOfInterval(
      { start: startDate, end: today },
      { weekStartsOn: 0 },
    );

    return weekIntervals.map((weekStart) => {
      const weekEnd = endOfWeek(weekStart);
      const weekLogs = workoutLogs.filter((log) => {
        const logDate = new Date(log.loggedAt);
        return logDate >= weekStart && logDate <= weekEnd;
      });

      return {
        week: format(weekStart, 'MMM d'),
        workouts: weekLogs.length,
        totalMinutes: weekLogs.reduce((sum, log) => sum + log.duration, 0),
      };
    });
  }, [workoutLogs, weeks]);

  const totalWorkouts = chartData.reduce((sum, week) => sum + week.workouts, 0);
  const avgPerWeek = totalWorkouts / chartData.length;

  return (
    <EgyptianCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              Workout Frequency
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Workouts per week over time
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {avgPerWeek.toFixed(1)} avg/week
            </span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="week"
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
                allowDecimals={false}
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
                itemStyle={{ color: 'hsl(var(--primary))' }}
                formatter={(value: number) => [
                  `${value} workouts`,
                  'Completed',
                ]}
              />
              <Bar
                dataKey="workouts"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-primary">
              {totalWorkouts}
            </p>
            <p className="text-xs text-muted-foreground">Total Workouts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent">
              {chartData.reduce((sum, week) => sum + week.totalMinutes, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Minutes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-secondary">
              {Math.max(...chartData.map((w) => w.workouts))}
            </p>
            <p className="text-xs text-muted-foreground">Best Week</p>
          </div>
        </div>
      </div>
    </EgyptianCard>
  );
};

export default WorkoutFrequencyChart;
