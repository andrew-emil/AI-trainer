import RecentActivity from '@/components/dashboard/RecentActivity';
import RecentActivitySkeleton from '@/components/dashboard/RecentActivitySkeleton';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { motion } from 'framer-motion';
import {
  Apple,
  Award,
  Calendar,
  ChevronRight,
  Dumbbell,
  Flame,
  History,
  Play,
  Scale,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Suspense, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { useTraineeWorkoutLogs } from '@/hooks/useWorkoutLogs';
import { useWorkoutPlan } from '@/hooks/useWorkoutPlans';
import { useNutrition } from '@/contexts/NutritionContext';
import WorkoutLogger from '@/components/workout/WorkoutLogger';
import { useWeightAnalytics } from '@/hooks/useBodyWeightLogs';
import {
  useTraineeAssignedTrainers,
  useTraineeAssignedWorkoutPlans,
} from '@/hooks/useTrainee';
import { createTrainerRequest } from '@/services/trainee';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, UserPlus } from 'lucide-react';
import {
  format,
  isSameWeek,
  isToday,
  parseISO,
  startOfToday,
  subDays,
} from 'date-fns';
import { MembershipStatus } from '@/types/entities';

const Dashboard = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const user = auth?.user;
  const { scheduledWorkouts } = useNutrition();

  const { data: logResponse, isLoading: logsLoading } = useTraineeWorkoutLogs(
    user?.id || '',
    {
      limit: 100,
    },
  );

  const { data: weightAnalytics } = useWeightAnalytics(user?.id || '');
  const { data: assignedTrainer, isLoading: trainersLoading } =
    useTraineeAssignedTrainers();
  const { data: assignedPlans, isLoading: plansLoading } =
    useTraineeAssignedWorkoutPlans();

  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [isRenewalDialogOpen, setIsRenewalDialogOpen] = useState(false);
  const [sessionsCount, setSessionsCount] = useState<string>('20');
  const [isRequesting, setIsRequesting] = useState(false);

  const activePlanTrainerId = assignedPlans?.[0]?.plan?.trainerId;
  const effectiveTrainerId =
    assignedTrainer?.trainer?.userId ||
    assignedTrainer?.trainerId ||
    activePlanTrainerId;

  const workoutLogs = logResponse?.data || [];

  const stats = useMemo(() => {
    // Workouts This Week
    const workoutsThisWeek = workoutLogs.filter((log) => {
      const logDate = parseISO(log.startedAt);
      return isSameWeek(logDate, new Date(), { weekStartsOn: 1 });
    }).length;

    // Current Streak
    let streak = 0;
    const logDates = new Set(
      workoutLogs.map((log) => format(parseISO(log.startedAt), 'yyyy-MM-dd')),
    );
    let checkDate = startOfToday();

    while (logDates.has(format(checkDate, 'yyyy-MM-dd'))) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }

    // If no workout today, check if they worked out yesterday to maintain the streak display
    if (streak === 0) {
      checkDate = subDays(startOfToday(), 1);
      while (logDates.has(format(checkDate, 'yyyy-MM-dd'))) {
        streak++;
        checkDate = subDays(checkDate, 1);
      }
    }

    return [
      {
        labelKey: 'dashboard.stats.workoutsThisWeek',
        value: workoutsThisWeek.toString(),
        icon: Dumbbell,
        change: '',
      },
      {
        labelKey: 'dashboard.stats.remainingSessions',
        value: assignedTrainer?.sessionsCount?.toString() || '0',
        icon: History,
        change: '',
      },
      {
        labelKey: 'dashboard.stats.muscleGain',
        value: weightAnalytics?.smmChange
          ? `${weightAnalytics.smmChange > 0 ? '+' : ''}${weightAnalytics.smmChange} kg`
          : '---',
        icon: TrendingUp,
        change: '',
      },
      {
        labelKey: 'dashboard.stats.pbfLoss',
        value: weightAnalytics?.pbfChange
          ? `${weightAnalytics.pbfChange > 0 ? '+' : ''}${weightAnalytics.pbfChange}%`
          : '---',
        icon: Target,
        change: '',
      },
    ];
  }, [workoutLogs, weightAnalytics, assignedTrainer]);

  const isUnassigned = !trainersLoading && !assignedTrainer;
  const isMembershipExpired =
    assignedTrainer &&
    (Number(assignedTrainer.sessionsCount) <= 0 ||
      assignedTrainer.membershipStatus === 'inactive');

  const todayWorkout = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const scheduled = scheduledWorkouts.find(
      (sw) => sw.scheduledDate === today,
    );
    return scheduled || null;
  }, [scheduledWorkouts]);

  const { data: planDetails, isLoading: planLoading } = useWorkoutPlan(
    todayWorkout?.planId || '',
  );

  const todayDayDetails = useMemo(() => {
    if (!planDetails || !todayWorkout) return null;
    return (
      planDetails.days.find((d) => d.id === todayWorkout.dayId) ||
      planDetails.days.find((d) => d.name === todayWorkout.dayName) ||
      null
    );
  }, [planDetails, todayWorkout]);

  const quickActions = [
    {
      icon: Calendar,
      labelKey: 'dashboard.quickActions.viewSchedule',
      actionKey: 'schedule',
    },
    {
      icon: Apple,
      labelKey: 'dashboard.quickActions.nutritionPlan',
      actionKey: 'my-nutrition',
    },
    {
      icon: Dumbbell,
      labelKey: 'dashboard.quickActions.workouts',
      actionKey: 'my-workouts',
    },
    {
      icon: TrendingUp,
      labelKey: 'dashboard.quickActions.progress',
      actionKey: 'progress',
    },
    {
      icon: Scale,
      labelKey: 'dashboard.quickActions.weightLog',
      actionKey: 'weight-log',
    },
    {
      icon: Users,
      labelKey: 'dashboard.quickActions.myTrainer',
      actionKey: 'trainer-profile',
    },
    {
      icon: UserPlus,
      labelKey: 'dashboard.quickActions.renewalMembership',
      actionKey: 'renewal',
    },
  ].filter((action) => {
    if (action.actionKey === 'renewal') {
      return (assignedTrainer?.sessionsCount ?? 0) === 0;
    }
    return true;
  });

  const handleQuickActionClick = (actionKey: string) => {
    if (actionKey === 'renewal') {
      if (trainersLoading || plansLoading) return;
      if (!effectiveTrainerId) {
        navigate('/trainers');
        return;
      }
      setIsRenewalDialogOpen(true);
      return;
    }

    if (actionKey === 'trainer-profile') {
      if (trainersLoading || plansLoading) return;

      if (effectiveTrainerId) {
        navigate(`/trainers/${effectiveTrainerId}`);
      } else {
        navigate('/trainers');
      }
      return;
    }

    navigate(`/${actionKey}`);
  };

  const handleRenewalRequest = async () => {
    if (!effectiveTrainerId) return;
    setIsRequesting(true);
    try {
      const { error } = await createTrainerRequest(
        effectiveTrainerId,
        Number(sessionsCount),
      );
      if (error) {
        toast.error(t('dashboard.renewalMembershipDialog.requestError'));
      } else {
        toast.success(t('dashboard.renewalMembershipDialog.requestSuccess'));
        setIsRenewalDialogOpen(false);
        // Refresh assigned trainers and plans to reflect renewal
        queryClient.invalidateQueries({
          queryKey: ['traineeAssignedTrainers'],
        });
        queryClient.invalidateQueries({ queryKey: ['traineeWorkoutPlans'] });
        queryClient.invalidateQueries({ queryKey: ['traineeNutritionPlans'] });
      }
    } catch (err) {
      console.error(err);
      toast.error(t('dashboard.renewalMembershipDialog.requestError'));
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          {/* Welcome section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('dashboard.welcome')}{' '}
              <span className="text-gradient-gold">
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : t('roles.trainee')}
              </span>
            </h1>
            <p className="font-body text-muted-foreground">
              {t('dashboard.subtitle')}
            </p>
          </motion.div>

          {isUnassigned ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <EgyptianCard className="p-8 text-center bg-gradient-to-br from-card to-background border-primary/20">
                <div className="max-w-2xl mx-auto py-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/30">
                    <UserPlus className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    {t('trainees.noTrainerTitle') ||
                      'Ready to Start Your Journey?'}
                  </h2>
                  <p className="font-body text-lg text-muted-foreground mb-8">
                    {t('trainees.noTrainerDesc') ||
                      "You don't have a trainer assigned yet. To start your fitness journey and get personalized plans, please choose an elite trainer from our community."}
                  </p>
                  <Button
                    onClick={() => navigate('/trainers')}
                    className="btn-pharaoh px-10 h-14 text-lg font-bold"
                  >
                    {t('trainers.findTrainer') || 'Browse Elite Trainers'}
                  </Button>
                </div>
              </EgyptianCard>
            </motion.div>
          ) : isMembershipExpired ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <EgyptianCard className="p-8 text-center bg-gradient-to-br from-card to-background border-accent/20">
                <div className="max-w-2xl mx-auto py-6">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/30">
                    <Flame className="w-10 h-10 text-accent" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    {t('membership.expiredTitle')}
                  </h2>
                  <p className="font-body text-lg text-muted-foreground mb-8">
                    {t('membership.expiredDesc')}
                  </p>
                  <Button
                    onClick={() => setIsRenewalDialogOpen(true)}
                    className="btn-pharaoh px-10 h-14 text-lg font-bold"
                  >
                    {t('membership.renewNow')}
                  </Button>
                </div>
              </EgyptianCard>
            </motion.div>
          ) : null}

          {/* Stats Grid */}
          {!isUnassigned && !isMembershipExpired && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EgyptianCard className="h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-body text-sm text-nile font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <p className="font-heading text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {t(stat.labelKey)}
                    </p>
                  </EgyptianCard>
                </motion.div>
              ))}
            </div>
          )}

          {!isUnassigned && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Today's Workout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <EgyptianCard className="h-full" hoverable={false}>
                  {todayWorkout ? (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Dumbbell className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h2 className="font-heading text-xl font-bold text-foreground">
                              {t('dashboard.todayWorkout.title')}
                            </h2>
                            <p className="font-body text-sm text-muted-foreground">
                              {todayWorkout.planName} - {todayWorkout.dayName}
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn-pharaoh rounded-lg text-sm py-2 px-4 flex items-center gap-2"
                          onClick={() => setIsLoggerOpen(true)}
                          disabled={!todayDayDetails}
                        >
                          <Play className="w-4 h-4 fill-current" />
                          {t('workoutPlans.dayManager.startWorkout') ||
                            t('dashboard.todayWorkout.start')}
                        </button>
                      </div>

                      <EgyptianDivider className="mb-6" />

                      <div className="space-y-4">
                        {planLoading ? (
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="h-16 bg-muted/50 animate-pulse rounded-lg"
                              />
                            ))}
                          </div>
                        ) : todayDayDetails?.exercises &&
                          todayDayDetails.exercises.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {todayDayDetails.exercises.map((de) => (
                              <div
                                key={de.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border/30 hover:border-primary/30 transition-colors"
                              >
                                <div className="w-14 h-14 rounded bg-muted flex-shrink-0 border border-border/30 overflow-hidden relative">
                                  {de.exercise.gifUrl ? (
                                    <img
                                      src={`${import.meta.env.VITE_BASE_URL_FOR_ASSETS}${de.exercise.gifUrl}`}
                                      alt={de.exercise.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Dumbbell className="w-full h-full p-3 text-muted-foreground/30" />
                                  )}
                                  <div className="absolute top-0 right-0 bg-primary/80 text-primary-foreground text-[10px] px-1 rounded-bl">
                                    {de.sets}×
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <p className="font-heading text-sm font-semibold truncate text-foreground">
                                    {de.exercise.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {de.repsMin}-{de.repsMax}{' '}
                                    {t('workoutPlans.dayManager.reps')}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/20 rounded-xl border border-dashed border-border/50">
                            <Calendar className="w-12 h-12 text-primary/40 mb-3" />
                            <p className="font-heading text-lg font-medium text-foreground mb-1">
                              {todayWorkout.dayName}
                            </p>
                            <p className="font-body text-sm text-muted-foreground max-w-xs">
                              {t('dashboard.todayWorkout.readyMessage', {
                                plan: todayWorkout.planName,
                              })}
                            </p>
                          </div>
                        )}

                        <button
                          className="w-full mt-2 text-primary text-sm font-medium hover:underline flex items-center justify-center gap-1"
                          onClick={() => navigate('/schedule')}
                        >
                          {t('dashboard.todayWorkout.viewFullSchedule')}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                        {t('dashboard.todayWorkout.noWorkoutTitle')}
                      </h3>
                      <p className="font-body text-muted-foreground mb-6 max-w-sm">
                        {t('dashboard.todayWorkout.noWorkoutMessage')}
                      </p>
                      <button
                        className="btn-pharaoh px-6 py-2 rounded-lg"
                        onClick={() => navigate('/schedule')}
                      >
                        {t('dashboard.todayWorkout.viewSchedule')}
                      </button>
                    </div>
                  )}
                </EgyptianCard>
              </motion.div>

              {/* Quick Actions & Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                {/* Quick Actions */}
                <EgyptianCard hoverable={false}>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    {t('dashboard.quickActions.title')}
                  </h3>
                  <div className="space-y-3">
                    {quickActions.map((action) => (
                      <button
                        key={action.labelKey}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                        onClick={() => handleQuickActionClick(action.actionKey)}
                      >
                        <div className="flex items-center gap-3">
                          <action.icon className="w-5 h-5 text-primary" />
                          <span className="font-body">
                            {t(action.labelKey)}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                </EgyptianCard>

                {/* Recent Activity */}
                <Suspense fallback={<RecentActivitySkeleton />}>
                  <RecentActivity />
                </Suspense>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {todayWorkout && todayDayDetails && (
        <WorkoutLogger
          isOpen={isLoggerOpen}
          onClose={() => setIsLoggerOpen(false)}
          dayId={todayDayDetails.id}
          plan={{
            id: todayWorkout.planId,
            name: todayWorkout.planName,
            exercises: todayDayDetails.exercises?.map((de: any) => ({
              ...de.exercise,
              id: de.exerciseId,
              workoutDayExerciseId: de.id,
              sets: de.sets,
              reps: de.repsMin,
              weight: 0,
              restSeconds: de.restSeconds,
              dayId: todayDayDetails.id,
            })),
          }}
        />
      )}

      {/* Renewal Dialog */}
      <Dialog open={isRenewalDialogOpen} onOpenChange={setIsRenewalDialogOpen}>
        <DialogContent
          className="sm:max-w-[425px] bg-card border-border/50"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>
              {assignedTrainer
                ? t('dashboard.renewalMembershipDialog.renewTitle', {
                    trainer: assignedTrainer.trainer?.user?.firstName || '',
                  })
                : t('dashboard.renewalMembershipDialog.title')}
            </DialogTitle>
            <DialogDescription>
              {assignedTrainer
                ? t('dashboard.renewalMembershipDialog.renewDesc')
                : t('dashboard.renewalMembershipDialog.requestDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sessions" className="text-right">
                {t('dashboard.renewalMembershipDialog.sessions')}
              </Label>
              <div className="col-span-3">
                <Select value={sessionsCount} onValueChange={setSessionsCount}>
                  <SelectTrigger id="sessions">
                    <SelectValue
                      placeholder={t(
                        'dashboard.renewalMembershipDialog.selectSessions',
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">
                      {t('dashboard.renewalMembershipDialog.sessionCount', {
                        count: 20,
                      })}
                    </SelectItem>
                    <SelectItem value="40">
                      {t('dashboard.renewalMembershipDialog.sessionCount', {
                        count: 40,
                      })}
                    </SelectItem>
                    <SelectItem value="60">
                      {t('dashboard.renewalMembershipDialog.sessionCount', {
                        count: 60,
                      })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleRenewalRequest}
              disabled={isRequesting}
              className="bg-egyptian-gold text-egyptian-night hover:bg-egyptian-gold-light w-full"
            >
              {isRequesting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                t('dashboard.renewalMembershipDialog.sendRenewal')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Dashboard;
