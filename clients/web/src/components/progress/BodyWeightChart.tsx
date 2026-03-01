import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format, isValid } from 'date-fns';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { useTranslation } from 'react-i18next';

interface BodyWeightChartProps {
  trend: any[];
  isRTL: boolean;
}

const BodyWeightChart = ({ trend, isRTL }: BodyWeightChartProps) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    return trend.map((item) => {
      const dateObj = new Date(item.date);
      return {
        ...item,
        dateFormatted: isValid(dateObj) ? format(dateObj, 'MMM d') : '',
      };
    });
  }, [trend]);

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
                {entry.name}:
              </span>
              <span className="text-sm font-bold text-foreground">
                {entry.value}{' '}
                {entry.name === t('weightLog.history.weight')
                  ? 'kg'
                  : entry.name === t('weightLog.history.smm')
                    ? 'kg'
                    : '%'}
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
          {t('weightLog.chartPlaceholder')}
        </h3>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="dateFormatted"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                reversed={isRTL}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                orientation={isRTL ? 'right' : 'left'}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="circle"
              />
              <Line
                name={t('weightLog.history.weight')}
                type="monotone"
                dataKey="weight"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
              <Line
                name={t('weightLog.history.smm')}
                type="monotone"
                dataKey="smm"
                stroke="hsl(var(--accent))"
                strokeWidth={3}
                dot={{ r: 4, fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
              <Line
                name={t('weightLog.history.pbf')}
                type="monotone"
                dataKey="pbf"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                dot={{ r: 4, fill: 'hsl(var(--secondary))', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </EgyptianCard>
  );
};

export default BodyWeightChart;
