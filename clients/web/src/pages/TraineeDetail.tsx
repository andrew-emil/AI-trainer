import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Button } from '@/components/ui/button';
import { useBodyWeightHistory } from '@/hooks/useBodyWeightLogs';
import { findTraineeById, traineeQueryKeys } from '@/services/trainee';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  Flame,
  Loader2,
  Mail,
  Ruler,
  Scale,
  Target,
  TrendingUp,
  Weight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

const TraineeDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: trainee, isPending: loading } = useQuery({
    queryKey: traineeQueryKeys.detail(id || ''),
    queryFn: () => findTraineeById(),
  })

  const { data: weightLogs } = useBodyWeightHistory(trainee?.userId || '');
  const latestLog = weightLogs && weightLogs.length > 0 ? weightLogs[0] : null;


  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
        </div>
      </DashboardLayout>
    );
  }

  if (!trainee) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('traineeDetail.notFound')}</p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/trainees">{t('traineeDetail.backToTrainees')}</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Link */}
        <Link
          to="/trainees"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-egyptian-gold transition-colors gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('traineeDetail.backToTrainees')}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                {trainee.user.avatar ? (
                  <img
                    src={trainee.user.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-heading text-4xl font-bold text-primary">
                    {trainee.user.firstName.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {trainee.user.firstName} {trainee.user.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-egyptian-gold" />
                    {trainee.user.email}
                  </span>
                  <span className="flex items-center gap-1 text-egyptian-turquoise">
                    <Target className="w-4 h-4" />
                    {t('traineeDetail.goal')}:{' '}
                    {trainee.goal || t('traineeDetail.notSet')}
                  </span>
                </div>
              </div>
            </div>

            <Button asChild className="gap-2">
              <Link to={`/trainees/${id}/progress`}>
                <TrendingUp className="w-4 h-4" />
                {t('common.view')} {t('progress.title')}
              </Link>
            </Button>
          </div>
        </motion.div>

        <EgyptianDivider />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <EgyptianCard className="p-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-egyptian-gold" />
                {t('traineeDetail.physicalMetrics')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Ruler className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      {t('traineeDetail.height')}
                    </span>
                  </div>
                  <p className="text-xl font-heading font-bold">
                    {trainee.heightCm
                      ? `${trainee.heightCm} cm`
                      : t('common.none')}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Weight className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      {t('traineeDetail.weight')}
                    </span>
                  </div>
                  <p className="text-xl font-heading font-bold">
                    {latestLog?.weight
                      ? `${latestLog.weight} kg`
                      : t('common.none')}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Scale className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      {t('weightLog.history.smm')}
                    </span>
                  </div>
                  <p className="text-xl font-heading font-bold">
                    {latestLog?.smm ? `${latestLog.smm} kg` : t('common.none')}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      {t('weightLog.history.pbf')}
                    </span>
                  </div>
                  <p className="text-xl font-heading font-bold">
                    {latestLog?.pbf ? `${latestLog.pbf}%` : t('common.none')}
                  </p>
                </div>
              </div>
            </EgyptianCard>

            <EgyptianCard className="p-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-egyptian-gold" />
                {t('traineeDetail.trainingOverview')}
              </h2>
              <p className="text-muted-foreground italic">
                {t('traineeDetail.noActivity')}
              </p>
            </EgyptianCard>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <EgyptianCard className="p-6">
              <h3 className="font-heading font-bold mb-4">
                {t('traineeDetail.accountInfo')}
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    {t('traineeDetail.memberSince')}
                  </p>
                  <p className="font-medium">
                    {new Date(trainee.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {t('traineeDetail.status')}
                  </p>
                  <p
                    className={`font-medium ${trainee.isActive ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {trainee.isActive
                      ? t('traineeDetail.active')
                      : t('traineeDetail.inactive')}
                  </p>
                </div>
              </div>
            </EgyptianCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeDetail;
