import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import EgyptianCard from '@/components/ui/EgyptianCard';
import {
  Scale,
  Plus,
  History,
  TrendingUp,
  Target,
  Activity,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import {
  getWeightTrend,
  analyzeWeightChanges,
  getBodyWeightLogsByTrainee,
} from '@/services/body-weight-log';
import { useAuth } from '@/hooks/useAuth';
import BodyWeightChart from '@/components/progress/BodyWeightChart';
import WeightLogModal from '@/components/progress/WeightLogModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';

const WeightLog = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { auth } = useAuth();
  const traineeId = auth?.user?.id || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    if (!traineeId) return;
    setLoading(true);

    const [analyticsRes, trendRes, historyRes] = await Promise.all([
      analyzeWeightChanges(traineeId),
      getWeightTrend(traineeId),
      getBodyWeightLogsByTrainee(traineeId),
    ]);

    if (!analyticsRes.error) setAnalytics(analyticsRes.data);
    if (!trendRes.error) setTrendData(trendRes.data.trend || []);
    if (!historyRes.error) setRecentLogs(historyRes.data.slice(0, 5) || []);

    setLoading(false);
  }, [traineeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const summaryItems = [
    {
      label: t('weightLog.summary.startWeight'),
      value: analytics?.startWeight ? `${analytics.startWeight} kg` : '--',
      icon: Target,
      color: 'text-primary',
    },
    {
      label: t('weightLog.summary.currentWeight'),
      value: analytics?.endWeight ? `${analytics.endWeight} kg` : '--',
      icon: Activity,
      color: 'text-accent',
    },
    {
      label: t('weightLog.summary.totalChange'),
      value: analytics?.weightChange
        ? `${analytics.weightChange > 0 ? '+' : ''}${analytics.weightChange} kg`
        : '--',
      icon: TrendingUp,
      subValue: analytics?.weightChangePercentage
        ? `${analytics.weightChangePercentage}%`
        : '',
      color: analytics?.weightChange < 0 ? 'text-green-500' : 'text-primary',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {t('weightLog.title')}{' '}
              <span className="text-gradient-gold">
                {t('weightLog.titleHighlight')}
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('weightLog.subtitle')}
            </p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            <span>{t('weightLog.addLog')}</span>
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EgyptianCard>
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/30 flex items-center justify-center shadow-inner">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {item.value}
                      </p>
                      {item.subValue && (
                        <span className="text-xs font-medium text-muted-foreground">
                          ({item.subValue})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </EgyptianCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {loading ? (
              <EgyptianCard>
                <div className="p-6 h-[400px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </EgyptianCard>
            ) : trendData.length > 0 ? (
              <BodyWeightChart trend={trendData} isRTL={isRTL} />
            ) : (
              <EgyptianCard>
                <div className="p-6 h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Scale className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">
                    {t('weightLog.chartPlaceholder')}
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    {t('weightLog.chartDescription')}
                  </p>
                </div>
              </EgyptianCard>
            )}
          </motion.div>

          {/* Recent History */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <EgyptianCard>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <History className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-lg font-bold">
                    {t('weightLog.history.title')}
                  </h3>
                </div>
                <div className="space-y-4">
                  {recentLogs.length > 0 ? (
                    recentLogs.map((log, index) => (
                      <div
                        key={log.id}
                        className={`flex justify-between items-center py-3 ${index !== recentLogs.length - 1 ? 'border-b border-border/30' : ''}`}
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {format(new Date(log.loggedAt), 'MMM dd, yyyy')}
                          </p>
                          <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                            {log.smm && <span>SMM: {log.smm}kg</span>}
                            {log.pbf && <span>PBF: {log.pbf}%</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {log.weight}kg
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      {t('common.none')}
                    </p>
                  )}
                </div>
              </div>
            </EgyptianCard>
          </motion.div>
        </div>
      </div>

      <WeightLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        traineeId={traineeId}
        onSuccess={fetchData}
      />
    </DashboardLayout>
  );
};

export default WeightLog;
