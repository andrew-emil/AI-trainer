import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Apple,
  Search,
  Utensils,
  AlertCircle,
  UserPlus,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NutritionPlanCard from '@/components/nutrition/NutritionPlanCard';
import {
  useTraineeAssignedNutritionPlans,
  useTraineeAssignedTrainers,
} from '@/hooks/useTrainee';
import { useAuth } from '@/hooks/useAuth';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Input } from '@/components/ui/input';

const MyNutrition = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const currentUser = auth?.user;

  const {
    data: assignedPlansData = [],
    isLoading,
    error: plansError,
  } = useTraineeAssignedNutritionPlans();

  const { data: assignedTrainer, isLoading: trainersLoading } =
    useTraineeAssignedTrainers();

  const isForbidden = (plansError as any)?.response?.status === 403;
  const isMembershipExpired =
    assignedTrainer &&
    (Number(assignedTrainer.sessionsCount) <= 0 ||
      assignedTrainer.membershipStatus === 'inactive');

  const isUnassigned = !assignedTrainer && !isLoading && !trainersLoading;

  const [searchQuery, setSearchQuery] = useState('');

  // Extract nutrition plans from assigned data
  const myPlans = assignedPlansData.map(
    (assignment) => assignment.nutritionPlan,
  );

  // Filter plans by search query
  const displayedPlans = myPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate stats from assigned plans
  const totalPlans = myPlans.length;

  // Get first plan's totals (assuming trainee typically has one active plan)
  const activePlan = myPlans.find((_, index) => index === 0);
  const dailyCalories = activePlan?.totals?.calories || 0;
  const dailyProtein = activePlan?.totals?.protein || 0;
  const dailyCarbs = activePlan?.totals?.carbs || 0;
  const dailyFat = activePlan?.totals?.fat || 0;

  const stats = [
    {
      labelKey: 'myNutrition.stats.assignedPlans',
      value: totalPlans,
      icon: Apple,
    },
    {
      labelKey: 'myNutrition.stats.dailyCalories',
      value: Math.round(dailyCalories),
      unit: 'kcal',
      icon: Apple,
    },
    {
      labelKey: 'myNutrition.stats.dailyProtein',
      value: Math.round(dailyProtein),
      unit: 'g',
      icon: Utensils,
    },
    {
      labelKey: 'myNutrition.stats.dailyCarbs',
      value: Math.round(dailyCarbs),
      unit: 'g',
      icon: Utensils,
    },
  ];

  const handleView = (id: string) => {
    navigate(`/nutrition/${id}`);
  };

  if (isLoading || trainersLoading) {
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
              "You don't have a trainer assigned yet. To start your fitness journey and get personalized nutrition plans, please choose an elite trainer from our community."}
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
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('myNutrition.title')}{' '}
              <span className="text-gradient-gold">
                {t('myNutrition.titleHighlight')}
              </span>
            </h1>
            <p className="font-body text-muted-foreground">
              {t('myNutrition.subtitle')}
            </p>
          </div>
        </motion.div>

        <EgyptianDivider />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
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
                {stat.unit && (
                  <span className="text-sm text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                )}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('myNutrition.searchPlaceholder')}
            className="ps-12 bg-card border-border/50 text-foreground h-12"
          />
        </div>

        {/* Plans Grid */}
        {displayedPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NutritionPlanCard
                  plan={plan}
                  showActions={false}
                  onView={() => handleView(plan.id)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
              <Apple className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              {t('myNutrition.noPlans')}
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              {t('myNutrition.noPlansDesc')}
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyNutrition;
