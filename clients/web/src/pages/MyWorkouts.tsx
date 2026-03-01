import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  ChevronRight,
  TrendingUp,
  Clock,
  Dumbbell,
  Target,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Flame,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  useTraineeAssignedWorkoutPlans,
  useTraineeAssignedTrainers,
} from '@/hooks/useTrainee';
import { useTraineeWorkoutLogs } from '@/hooks/useWorkoutLogs';
import { useWorkoutPlan } from '@/hooks/useWorkoutPlans';
import { WorkoutPlan } from '@/types/entities';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkoutPlanCard from '@/components/workout/WorkoutPlanCard';
import { Button } from '@/components/ui/button';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const MyWorkouts = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const currentUser = auth?.user;
  const navigate = useNavigate();

  // Fetch assigned workout plans for current trainee
  const {
    data: assignedPlansData = [],
    isLoading: plansLoading,
    error: plansError,
  } = useTraineeAssignedWorkoutPlans();

  const {
    data: sessionsData,
    isLoading: logsLoading,
    error: logsError,
  } = useTraineeWorkoutLogs(currentUser?.id || '', { limit: 100 });

  const { data: assignedTrainer, isLoading: trainersLoading } =
    useTraineeAssignedTrainers();

  const isForbidden =
    (plansError as any)?.response?.status === 403 ||
    (logsError as any)?.response?.status === 403;

  const isMembershipExpired =
    assignedTrainer &&
    (Number(assignedTrainer.sessionsCount) <= 0 ||
      assignedTrainer.membershipStatus === 'inactive');

  const isUnassigned = !assignedTrainer && !plansLoading && !trainersLoading;

  // Extract workout plans from assigned data
  const myPlans = assignedPlansData.map((assignment) => assignment.plan);

  // Get recent sessions for current trainee
  const mySessions = (sessionsData?.data || [])
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    )
    .slice(0, 10);

  // Stats - calculate from backend data
  const totalWorkoutsThisWeek = mySessions.filter((session) => {
    const sessionDate = new Date(session.startedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  }).length;

  const handleViewWorkout = (planId: string) => {
    navigate(`/workout-plans/${planId}`);
  };

  const stats = [
    {
      label: t('myWorkouts.stats.assignedPlans'),
      value: myPlans.length,
      icon: Dumbbell,
    },
    {
      label: t('myWorkouts.stats.workoutsThisWeek'),
      value: totalWorkoutsThisWeek,
      icon: Calendar,
    },
    {
      label: t('myWorkouts.stats.workoutsLogged'),
      value: mySessions.length,
      icon: CheckCircle2,
    },
  ];

  // Show loading state
  if (plansLoading || logsLoading || trainersLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isUnassigned && !isForbidden) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/30"
          >
            <UserPlus className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 font-heading">
            {t('trainees.noTrainerTitle') || 'No Trainer Assigned'}
          </h2>
          <p className="text-muted-foreground max-w-md mb-8 font-body">
            {t('trainees.noTrainerDesc') ||
              "You don't have a trainer assigned yet. To start your fitness journey and get personalized workout plans, please choose an elite trainer from our community."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/trainers')}
              className="btn-pharaoh px-8 h-12"
            >
              {t('trainers.findTrainer') || 'Find a Trainer'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="px-8 h-12"
            >
              {t('common.backToDashboard') || 'Back to Dashboard'}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isForbidden || isMembershipExpired) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 border border-accent/30"
          >
            <Flame className="w-10 h-10 text-accent" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 font-heading">
            {t('membership.expiredTitle')}
          </h2>
          <p className="text-muted-foreground max-w-md mb-8 font-body">
            {t('membership.expiredDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                if (assignedTrainer?.trainerId) {
                  navigate(`/trainers/${assignedTrainer.trainerId}`);
                } else {
                  navigate('/trainers');
                }
              }}
              className="btn-pharaoh px-8 h-12"
            >
              {t('membership.renewNow')}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="px-8 h-12"
            >
              {t('common.backToDashboard')}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('myWorkouts.title')}{' '}
            <span className="text-gradient-gold">
              {t('myWorkouts.titleHighlight')}
            </span>
          </h1>
          <p className="font-body text-muted-foreground">
            {t('myWorkouts.subtitle')}
          </p>
        </motion.div>

        <EgyptianDivider />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* My Plans */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            {t('myWorkouts.assignedPlans')}
          </h2>
          {myPlans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPlans.map((plan) => (
                <WorkoutPlanCard
                  key={plan.id}
                  plan={plan}
                  onView={() => handleViewWorkout(plan.id)}
                />
              ))}
            </div>
          ) : (
            <EgyptianCard className="text-center py-12" hoverable={false}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {t('myWorkouts.noPlans')}
              </h3>
              <p className="font-body text-muted-foreground">
                {t('myWorkouts.noPlansDesc')}
              </p>
            </EgyptianCard>
          )}
        </div>

        {/* Workout History */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            {t('myWorkouts.recentHistory')}
          </h2>
          {mySessions.length > 0 ? (
            <div className="space-y-4">
              {mySessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EgyptianCard
                    className="flex items-center justify-between"
                    hoverable={false}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">
                          {session.workoutDay?.name ||
                            t('myWorkouts.session') ||
                            'Session'}
                        </h4>
                        <p className="font-body text-sm text-muted-foreground">
                          {format(new Date(session.startedAt), 'MMM d, yyyy')}
                          {session.totalDuration
                            ? ` • ${Math.round(session.totalDuration / 60)} min`
                            : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm text-primary">
                        {t('myWorkouts.completed')}
                      </p>
                    </div>
                  </EgyptianCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <EgyptianCard className="text-center py-12" hoverable={false}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {t('myWorkouts.noHistory')}
              </h3>
              <p className="font-body text-muted-foreground">
                {t('myWorkouts.noHistoryDesc')}
              </p>
            </EgyptianCard>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyWorkouts;
