import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserRole } from '@/services/user';
import { TFunction } from 'i18next';
import {
  LayoutDashboard,
  Shield,
  MessageCircle,
  Apple,
  Calendar,
  Dumbbell,
  TrendingUp,
  Users,
  Scale,
  Calculator,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function returnNavItems(
  role: UserRole,
  t: TFunction<'translation', undefined>,
) {
  switch (role) {
    case UserRole.admin:
      return [
        { icon: Shield, label: t('nav.admin'), path: '/admin' },
        { icon: MessageCircle, label: t('nav.chats'), path: '/chats' },
      ];
    case UserRole.trainer:
      return [
        {
          icon: Dumbbell,
          label: t('nav.workoutPlans'),
          path: '/workout-plans',
        },
        { icon: Users, label: t('nav.trainees'), path: '/trainees' },
        { icon: Apple, label: t('nav.nutrition'), path: '/nutrition' },
        {
          icon: Calculator,
          label: t('nav.nutritionCalculator'),
          path: '/nutrition-calculator',
        },
        { icon: MessageCircle, label: t('nav.chats'), path: '/chats' },
      ];
    case UserRole.trainee:
      return [
        {
          icon: LayoutDashboard,
          label: t('nav.dashboard'),
          path: '/dashboard',
        },
        { icon: Dumbbell, label: t('nav.myWorkouts'), path: '/my-workouts' },
        { icon: Apple, label: t('nav.nutrition'), path: '/my-nutrition' },
        { icon: Scale, label: t('nav.weightLog'), path: '/weight-log' },
        { icon: TrendingUp, label: t('nav.progress'), path: '/progress' },
        { icon: Calendar, label: t('nav.schedule'), path: '/schedule' },
        { icon: Star, label: t('nav.myReviews'), path: '/my-reviews' },
        { icon: MessageCircle, label: t('nav.chats'), path: '/chats' },
      ];
    default:
      return [];
  }
}

export const validateImage = (file: File, t: TFunction) => {
  if (!file.type.startsWith('image/')) {
    toast.error(t('auth.register.avatarFileTypeError'));
    return false;
  }
  if (file.size > 2 * 1024 * 1024) {
    toast.error(t('auth.register.avatarFileSizeError'));
    return false;
  }
  return true;
};
