import { Switch } from '../ui/switch';
import { NotificationPreference } from '@/types/entities';
import { NotificationType } from '@/types/entities';
import { updateNotificationPreferences } from '@/services/notification-preferences';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@/App';
import { startTransition, useOptimistic } from 'react';

type Props = {
  pref: NotificationPreference;
  dir: 'ltr' | 'rtl';
};

function NotificationSettingsItem({ pref, dir }: Props) {
  const { t } = useTranslation();
  const [optimisticPref, setOptimisticPref] = useOptimistic(
    pref,
    (state, newEnabled: boolean) => ({ ...state, enabled: newEnabled }),
  );

  const getTranslationKey = (type: NotificationType) => {
    switch (type) {
      case NotificationType.NEW_CHAT_MESSAGE:
        return 'newMessages';
      case NotificationType.PASSWORD_RESET:
        return 'passwordReset';
      case NotificationType.TRAINER_APPROVAL:
        return 'trainerApproval';
      case NotificationType.TRAINER_REJECTION:
        return 'trainerRejection';
      case NotificationType.TRAINER_RANK_CHANGED:
        return 'trainerRankChanged';
      case NotificationType.NEW_TRAINER_REGISTERED:
        return 'newTrainerRegistered';
      case NotificationType.NEW_TRAINEE_REQUESTED:
        return 'newTraineeRequested';
      case NotificationType.WORKOUT_PLAN_ASSIGNED:
        return 'workoutPlanAssigned';
      case NotificationType.WORKOUT_PLAN_UNASSIGNED:
        return 'workoutPlanUnassigned';
      case NotificationType.NUTRITION_PLAN_ASSIGNED:
        return 'nutritionPlanAssigned';
      case NotificationType.NUTRITION_PLAN_UNASSIGNED:
        return 'nutritionPlanUnassigned';
      case NotificationType.TRAINER_UNASSIGNED:
        return 'trainerUnassigned';
      case NotificationType.TRAINEE_SWITCHED_TRAINER:
        return 'traineeSwitchedTrainer';
      case NotificationType.BODY_WEIGHT_LOGGED:
        return 'bodyWeightLogged';
      default:
        return type;
    }
  };

  const handleToggle = (checked: boolean) => {
    startTransition(async () => {
      setOptimisticPref(checked);
      const { error } = await updateNotificationPreferences({
        type: pref.type,
        enabled: checked,
      });

      if (error) {
        toast.error(t('common.error'));
      }
      await queryClient.invalidateQueries({
        queryKey: ['notification-preferences'],
      });
    });
  };

  const key = getTranslationKey(optimisticPref.type);
  const title = t(`settings.notifications.${key}`);
  const desc = t(`settings.notifications.${key}Desc`);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30">
      <div>
        <p className="font-body font-medium text-foreground">{title}</p>
        <p className="font-body text-xs text-muted-foreground mr-3">{desc}</p>
      </div>
      <Switch
        dir={dir}
        checked={optimisticPref.enabled}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}

export default NotificationSettingsItem;
