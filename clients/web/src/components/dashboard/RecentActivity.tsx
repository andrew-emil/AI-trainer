import { useTranslation } from 'react-i18next';
import EgyptianCard from '../ui/EgyptianCard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLastThreeActivityLogs } from '@/services/activity-log';
import { formatDistanceToNow } from 'date-fns';
import { ActivityType } from '@/types/entities';
import { useNavigate } from 'react-router';
import {
  Dumbbell,
  Scale,
  UserPlus,
  RefreshCw,
  Apple,
  CheckCircle2,
  Lock,
  MessageSquare,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const getActivityIcon = (type: ActivityType): LucideIcon => {
  switch (type) {
    case ActivityType.WORKOUT_COMPLETED:
      return Dumbbell;
    case ActivityType.WEIGHT_LOGGED:
      return Scale;
    case ActivityType.TRAINER_REQUESTED:
      return UserPlus;
    case ActivityType.MEMBERSHIP_RENEWED:
      return RefreshCw;
    case ActivityType.NUTRITION_PLAN_ASSIGNED:
      return Apple;
    case ActivityType.TRAINER_APPROVED:
      return CheckCircle2;
    case ActivityType.PASSWORD_CHANGED:
      return Lock;
    case ActivityType.CHAT_MESSAGE_RECEIVED:
      return MessageSquare;
    case ActivityType.TRAINER_RANK_CHANGED:
      return ShieldCheck;
    default:
      return Dumbbell;
  }
};

const getActivityNavigation = (
  type: ActivityType,
  meta: any,
): string | null => {
  switch (type) {
    case ActivityType.WORKOUT_COMPLETED:
      return '/schedule';
    case ActivityType.WEIGHT_LOGGED:
      return '/weight-log';
    case ActivityType.TRAINER_REQUESTED:
      return '/trainers';
    case ActivityType.MEMBERSHIP_RENEWED:
      return '/dashboard';
    case ActivityType.NUTRITION_PLAN_ASSIGNED:
      return '/my-nutrition';
    case ActivityType.TRAINER_APPROVED:
      return '/trainers';
    case ActivityType.PASSWORD_CHANGED:
      return '/profile';
    case ActivityType.CHAT_MESSAGE_RECEIVED:
      return '/chats';
    case ActivityType.TRAINER_RANK_CHANGED:
      return '/profile';
    default:
      return null;
  }
};

function RecentActivity() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: { data: recentActivity, error },
  } = useSuspenseQuery({
    queryKey: ['recent-activity'],
    queryFn: getLastThreeActivityLogs,
  });

  if (error) {
    return (
      <EgyptianCard hoverable={false}>
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">
          {t('dashboard.recentActivity.title')}
        </h3>
        <div className="space-y-4">
          <p className="font-body text-sm text-foreground">
            {t('dashboard.recentActivity.error')}
          </p>
        </div>
      </EgyptianCard>
    );
  }

  if (!recentActivity || recentActivity.length === 0) {
    return (
      <EgyptianCard hoverable={false}>
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">
          {t('dashboard.recentActivity.title')}
        </h3>
        <div className="space-y-4">
          <p className="font-body text-sm text-muted-foreground">
            {t('dashboard.recentActivity.noActivity')}
          </p>
        </div>
      </EgyptianCard>
    );
  }

  return (
    <EgyptianCard hoverable={false}>
      <h3 className="font-heading text-lg font-bold text-foreground mb-4">
        {t('dashboard.recentActivity.title')}
      </h3>
      <div className="space-y-4">
        {recentActivity.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const navigationPath = getActivityNavigation(
            activity.type,
            activity.meta,
          );
          const isClickable = !!navigationPath;

          // Get localized description based on activity type and metadata
          const getLocalizedDescription = () => {
            const rawMeta = activity.meta;
            const meta =
              typeof rawMeta === 'string'
                ? JSON.parse(rawMeta)
                : (rawMeta as any);

            switch (activity.type) {
              case ActivityType.WORKOUT_COMPLETED:
                return t('dashboard.recentActivity.completedWorkoutSession');
              case ActivityType.WEIGHT_LOGGED:
                return t('dashboard.recentActivity.loggedBodyWeight', {
                  weight: meta?.weight,
                });
              case ActivityType.TRAINER_REQUESTED:
                return t('dashboard.recentActivity.requestedTrainer', {
                  trainerName:
                    meta?.trainerUsername ||
                    meta?.trainerName ||
                    meta?.trainerId ||
                    'Unknown',
                });
              case ActivityType.MEMBERSHIP_RENEWED:
                return t('dashboard.recentActivity.renewedMembership', {
                  trainerName:
                    meta?.trainerUsername ||
                    meta?.trainerName ||
                    meta?.trainerId ||
                    'Unknown',
                });
              case ActivityType.NUTRITION_PLAN_ASSIGNED:
                return t('dashboard.recentActivity.nutritionPlanAssigned');
              case ActivityType.TRAINER_APPROVED:
                return t('dashboard.recentActivity.trainerApproved');
              case ActivityType.PASSWORD_CHANGED:
                return t('dashboard.recentActivity.passwordChanged');
              case ActivityType.CHAT_MESSAGE_RECEIVED:
                return t('dashboard.recentActivity.chatMessageReceived');
              case ActivityType.TRAINER_RANK_CHANGED:
                return t('dashboard.recentActivity.trainerRankChanged');
              default:
                return activity.description;
            }
          };

          return (
            <div
              key={activity.id}
              className={cn(
                'flex items-start gap-3 rounded-lg p-2 -mx-2 transition-colors',
                isClickable && 'cursor-pointer hover:bg-muted/50',
              )}
              onClick={() => {
                if (navigationPath) {
                  navigate(navigationPath);
                }
              }}
            >
              <div className="mt-0.5">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-foreground">
                  {getLocalizedDescription()}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </EgyptianCard>
  );
}

export default RecentActivity;
