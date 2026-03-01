import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays, eachWeekOfInterval, endOfWeek } from 'date-fns';
import { WorkoutLog } from '@/types/workout-log';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Activity } from 'lucide-react';

interface VolumeChartProps {
  workoutLogs: WorkoutLog[];
  weeks?: number;
}

const VolumeChart = ({ workoutLogs, weeks = 8 }: VolumeChartProps) => {
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

      // Calculate total volume (sets x reps x weight)
      let totalVolume = 0;
      let totalSets = 0;
      let totalReps = 0;

      weekLogs.forEach((log) => {
        log.completedExercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            if (set.completed) {
              totalSets++;
              totalReps += set.reps;
              totalVolume += set.reps * (set.weight || 0);
            }
          });
        });
      });

      return {
        week: format(weekStart, 'MMM d'),
        volume: Math.round(totalVolume / 1000), // Convert to tons
        sets: totalSets,
        reps: totalReps,
      };
    });
  }, [workoutLogs, weeks]);

  const totalVolume = chartData.reduce((sum, week) => sum + week.volume, 0);
  const avgVolume = totalVolume / chartData.length;

  return (
    <EgyptianCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              Training Volume
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Total weight lifted per week (tons)
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/20 border border-secondary/30">
            <Activity className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              {avgVolume.toFixed(1)}t avg
            </span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--accent))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--accent))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
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
                unit="t"
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
                formatter={(value: number, name: string) => {
                  if (name === 'volume') return [`${value}t`, 'Volume'];
                  return [value, name];
                }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--accent))"
                strokeWidth={3}
                fill="url(#volumeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-primary">
              {totalVolume.toFixed(1)}t
            </p>
            <p className="text-xs text-muted-foreground">Total Volume</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent">
              {chartData.reduce((sum, w) => sum + w.sets, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Sets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-secondary">
              {chartData.reduce((sum, w) => sum + w.reps, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Reps</p>
          </div>
        </div>
      </div>
    </EgyptianCard>
  );
};

export default VolumeChart;
