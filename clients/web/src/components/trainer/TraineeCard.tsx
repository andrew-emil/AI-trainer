import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  Mail,
  Dumbbell,
  Apple,
  UserMinus,
  Calendar,
  Activity,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isSameWeek, parseISO } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

import EgyptianCard from '@/components/ui/EgyptianCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GetAssignedTraineesResponse,
  GetAllTraineesWithWorkoutPlans,
  GetAllTraineesWithNutritionPlans,
} from '@/types/trainer';
import { findAllWorkoutLogsForATrainee } from '@/services/workout-log';

interface TraineeCardProps {
  item: GetAssignedTraineesResponse;
  index: number;
  workoutPlanData: GetAllTraineesWithWorkoutPlans[];
  nutritionPlanData: GetAllTraineesWithNutritionPlans[];
  onAssignWorkout: (trainee: {
    id: string;
    name: string;
    currentPlanId?: string;
  }) => void;
  onAssignNutrition: (trainee: {
    id: string;
    name: string;
    currentPlanId?: string;
  }) => void;
  onUnassign: (traineeId: string) => void;
}

const TraineeCard = ({
  item,
  index,
  workoutPlanData,
  nutritionPlanData,
  onAssignWorkout,
  onAssignNutrition,
  onUnassign,
}: TraineeCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const dateLocale = isRTL ? ar : enUS;

  const [lastWorkout, setLastWorkout] = useState<Date | null>(null);
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const { data } = await findAllWorkoutLogsForATrainee(item.traineeId, {
          limit: 20,
        });

        if (data && data.data && data.data.length > 0) {
          // Sort by date desc just in case, though API usually returns desc
          const sortedLogs = [...data.data].sort(
            (a, b) =>
              new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
          );

          const lastLog = sortedLogs[0];
          setLastWorkout(new Date(lastLog.startedAt));

          const now = new Date();
          const thisWeekCount = sortedLogs.filter(
            (log) =>
              isSameWeek(parseISO(log.startedAt), now, { weekStartsOn: 6 }), // Saturday start for EG/AR usually, or adjust based on preference
          ).length;
          setWorkoutsThisWeek(thisWeekCount);
        } else {
          setLastWorkout(null);
          setWorkoutsThisWeek(0);
        }
      } catch (error) {
        console.error('Failed to fetch trainee stats', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [item.traineeId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <EgyptianCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Link
            to={`/trainees/${item.traineeId}`}
            className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
          >
            <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
              {item.trainee.user.avatar ? (
                <img
                  src={item.trainee.user.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-heading text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                  {item.trainee.user.firstName.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {item.trainee.user.firstName} {item.trainee.user.lastName}
              </h3>
              <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {item.trainee.user.email}
              </p>
            </div>
          </Link>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {t('traineeDetail.active') || 'Active'}
          </Badge>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="font-body text-xs text-muted-foreground mb-1">
                {t('trainees.labels.sessions')}
              </p>
              <p className="font-heading font-bold text-foreground">
                {item.sessionsCount}
              </p>
            </div>

            <div>
              <p className="font-body text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 opacity-70" />
                {t('trainees.stats.lastWorkout') || 'Last Workout'}
              </p>
              <p className="font-heading font-bold text-foreground text-sm truncate">
                {loadingStats ? (
                  <span className="animate-pulse">...</span>
                ) : lastWorkout ? (
                  format(lastWorkout, 'MMM d, yyyy', { locale: dateLocale })
                ) : (
                  <span className="text-muted-foreground/60">
                    {t('trainees.stats.never') || 'Never'}
                  </span>
                )}
              </p>
            </div>

            <div>
              <p className="font-body text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Activity className="w-3 h-3 opacity-70" />
                {t('trainees.stats.thisWeek') || 'This Week'}
              </p>
              <p className="font-heading font-bold text-foreground">
                {loadingStats ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  workoutsThisWeek
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {/* Workout Plan Action */}
          {workoutPlanData.find((wp) => wp.trainee.userId === item.traineeId)
            ?.assignedPlan ? (
            <Button
              size="sm"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 bg-primary/5 shadow-pharaoh-sm"
              onClick={() => {
                const plan = workoutPlanData.find(
                  (wp) => wp.trainee.userId === item.traineeId,
                )?.assignedPlan;
                if (plan) {
                  onAssignWorkout({
                    id: item.traineeId,
                    name: `${item.trainee.user.firstName} ${item.trainee.user.lastName}`,
                    currentPlanId: plan.id,
                  });
                }
              }}
            >
              <Dumbbell className="w-4 h-4 me-2" />
              {t('trainees.buttons.removeWorkoutPlan')}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
              onClick={() =>
                onAssignWorkout({
                  id: item.traineeId,
                  name: `${item.trainee.user.firstName} ${item.trainee.user.lastName}`,
                })
              }
            >
              <Dumbbell className="w-4 h-4 me-2" />
              {t('trainees.buttons.assignWorkoutPlan')}
            </Button>
          )}

          {/* Nutrition Plan Action */}
          {nutritionPlanData.find((np) => np.trainee.userId === item.traineeId)
            ?.assignedPlan ? (
            <Button
              size="sm"
              variant="outline"
              className="border-green-500/50 text-green-500 hover:bg-green-500/10 bg-green-500/5 shadow-pharaoh-sm"
              onClick={() => {
                const plan = nutritionPlanData.find(
                  (np) => np.trainee.userId === item.traineeId,
                )?.assignedPlan;
                if (plan) {
                  onAssignNutrition({
                    id: item.traineeId,
                    name: `${item.trainee.user.firstName} ${item.trainee.user.lastName}`,
                    currentPlanId: plan.id,
                  });
                }
              }}
            >
              <Apple className="w-4 h-4 me-2" />
              {t('trainees.buttons.removeNutritionPlan')}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-green-500/30 text-green-500 hover:bg-green-500/10"
              onClick={() =>
                onAssignNutrition({
                  id: item.traineeId,
                  name: `${item.trainee.user.firstName} ${item.trainee.user.lastName}`,
                })
              }
            >
              <Apple className="w-4 h-4 me-2" />
              {t('trainees.buttons.assignNutritionPlan')}
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => onUnassign(item.traineeId)}
          >
            <UserMinus className="w-4 h-4 me-2" />
            {t('trainees.buttons.unassign')}
          </Button>
        </div>
      </EgyptianCard>
    </motion.div>
  );
};

export default TraineeCard;
