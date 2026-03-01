import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { useTranslation } from 'react-i18next';
import { GroupedWorkoutResult } from '@/types/workout-log';

interface WorkoutSummaryChartProps {
  summary: GroupedWorkoutResult[];
  isRTL?: boolean;
}

const WorkoutSummaryChart = ({
  summary,
  isRTL = false,
}: WorkoutSummaryChartProps) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    // Sort by volume descending and take top 10
    return [...summary]
      .sort((a, b) => b.totalVolume - a.totalVolume)
      .slice(0, 10)
      .map((item) => ({
        name: item.exerciseName || t('common.unknown'),
        volume: item.totalVolume,
        sets: item.totalSets,
        reps: item.totalReps,
      }));
  }, [summary, t]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border/30 p-4 rounded-xl shadow-xl backdrop-blur-md">
          <p className="font-heading font-bold text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 py-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name === 'volume'
                  ? t('progress.volume')
                  : t('progress.sets')}
                :
              </span>
              <span className="text-sm font-bold text-foreground">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <EgyptianCard>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-6">
          {t('progress.workoutSummary')}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({t('progress.topExercisesByVolume')})
          </span>
        </h3>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  orientation={isRTL ? 'right' : 'left'}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                />
                <Bar
                  dataKey="volume"
                  name="volume"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                  animationDuration={1500}
                />
              </BarChart>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                {t('common.noDataAvailable')}
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </EgyptianCard>
  );
};

export default WorkoutSummaryChart;
