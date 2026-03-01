import { cn } from '@/lib/utils';
import { markNotificationAsRead } from '@/services/notifications';
import { Notification, NotificationType } from '@/types/entities';
import { useMutation } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  UserPlus,
  ShieldCheck,
  Bell,
  Dumbbell,
  Apple,
  UserMinus,
  Scale,
  Edit,
} from 'lucide-react';

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.TRAINEE_REQUEST_APPROVED:
    case NotificationType.TRAINER_APPROVAL:
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case NotificationType.TRAINEE_REQUEST_REJECTED:
    case NotificationType.TRAINER_REJECTION:
      return <XCircle className="h-4 w-4 text-destructive" />;
    case NotificationType.MEMBERSHIP_EXPIRED:
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case NotificationType.NEW_CHAT_MESSAGE:
      return <MessageSquare className="h-4 w-4 text-primary" />;
    case NotificationType.NEW_TRAINEE_REQUESTED:
      return <UserPlus className="h-4 w-4 text-primary" />;
    case NotificationType.NEW_TRAINER_REGISTERED:
      return <ShieldCheck className="h-4 w-4 text-primary" />;
    case NotificationType.WORKOUT_PLAN_ASSIGNED:
      return <Dumbbell className="h-4 w-4 text-green-500" />;
    case NotificationType.WORKOUT_PLAN_UNASSIGNED:
      return <Dumbbell className="h-4 w-4 text-yellow-500" />;
    case NotificationType.NUTRITION_PLAN_ASSIGNED:
      return <Apple className="h-4 w-4 text-green-500" />;
    case NotificationType.NUTRITION_PLAN_UNASSIGNED:
      return <Apple className="h-4 w-4 text-yellow-500" />;
    case NotificationType.TRAINER_UNASSIGNED:
      return <UserMinus className="h-4 w-4 text-destructive" />;
    case NotificationType.TRAINEE_SWITCHED_TRAINER:
      return <UserMinus className="h-4 w-4 text-yellow-500" />;
    case NotificationType.BODY_WEIGHT_LOGGED:
      return <Scale className="h-4 w-4 text-primary" />;
    case NotificationType.TRAINER_PROFILE_UPDATE:
      return <Edit className="h-4 w-4 text-blue-500" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

function NotificationItem({ notification }: { notification: Notification }) {
  const isUnread = !notification.readAt;
  const navigate = useNavigate();

  const { mutateAsync: markAsRead } = useMutation({
    mutationFn: async () => {
      const { error } = await markNotificationAsRead(notification.id);
      if (error) throw error;
    },
  });

  return (
    <div
      className={cn(
        'flex flex-col gap-1 border-b p-4 transition-colors last:border-0 hover:bg-muted/50 cursor-pointer',
        isUnread ? 'bg-muted/30' : 'opacity-80',
      )}
      onClick={() => {
        if (notification.actionUrl) {
          navigate(notification.actionUrl);
        } else if (notification.type === NotificationType.MEMBERSHIP_EXPIRED) {
          navigate('/trainers');
        } else if (
          notification.type === NotificationType.WORKOUT_PLAN_ASSIGNED
        ) {
          const data = notification.data as { planId?: string } | null;
          if (data?.planId) {
            navigate(`/workout-plans/${data.planId}`);
          }
        } else if (
          notification.type === NotificationType.NUTRITION_PLAN_ASSIGNED
        ) {
          const data = notification.data as { planId?: string } | null;
          if (data?.planId) {
            navigate(`/nutrition/${data.planId}`);
          }
        } else if (notification.type === NotificationType.TRAINER_UNASSIGNED) {
          navigate('/trainers');
        } else if (notification.type === NotificationType.BODY_WEIGHT_LOGGED) {
          const data = notification.data as { traineeId?: string } | null;
          if (data?.traineeId) {
            navigate(`/progress/${data.traineeId}`);
          }
        } else if (
          notification.type === NotificationType.TRAINER_PROFILE_UPDATE
        ) {
          const data = notification.data as { trainerId?: string } | null;
          if (data?.trainerId) {
            navigate(`/trainers/${data.trainerId}`);
          }
        }
        if (isUnread) {
          markAsRead();
        }
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {getNotificationIcon(notification.type)}
          <h4
            className={cn(
              'text-sm font-semibold leading-none',
              isUnread && 'text-primary',
            )}
          >
            {notification.title}
          </h4>
        </div>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {notification.body}
      </p>
      {isUnread && (
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
}

export default NotificationItem;
