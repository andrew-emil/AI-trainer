import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Trash2,
  Calendar,
  Utensils,
  StickyNote,
  Info,
  Clock,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NutritionDayManager from '@/components/nutrition/NutritionDayManager';
import {
  useNutritionPlan,
  useDeleteNutritionPlan,
} from '@/hooks/useNutritionPlans';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const NutritionPlanDetails = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const isTrainer = auth?.user?.role === 'trainer';
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: plan, isLoading } = useNutritionPlan(id!);
  const deletePlanMutation = useDeleteNutritionPlan();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deletePlanMutation.mutateAsync(id);
      toast({
        title: t('common.yes') || 'Success',
        description:
          t('nutrition.pageDetails.deleteSuccess') ||
          'Plan deleted successfully',
      });
      navigate('/nutrition');
    } catch (error) {
      toast({
        title: t('error.title') || 'Error',
        description:
          t('nutrition.pageDetails.deleteError') || 'Failed to delete plan',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Utensils className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-muted-foreground">
              {t('nutrition.pageDetails.loadingPlan') ||
                'Loading plan details...'}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!plan) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t('nutrition.pageDetails.planNotFound') ||
                'Nutrition plan not found'}
            </p>
            <Button
              onClick={() => navigate('/nutrition')}
              className="btn-pharaoh"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('nutrition.pageDetails.backToPlans') || 'Back to plans'}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/nutrition')}
              className="border-border/50 h-10 w-10 p-0 md:h-auto md:w-auto md:px-4 md:py-2"
            >
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">
                {t('common.back') || 'Back'}
              </span>
            </Button>

            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                {plan.name}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  {t('common.created')}:{' '}
                  {new Date(plan.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>
          {isTrainer && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('nutrition.deletePlan') || 'Delete Plan'}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <EgyptianCard>
            <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-primary">
              <Info className="w-5 h-5" />
              {t('nutrition.pageDetails.planInformation')}
            </h2>
            <div className="flex lg:flex-row flex-col gap-2 justify-between ">
              <div className="flex  items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 flex-1">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {t('nutrition.createModal.planGoal')}
                  </span>
                </div>
                <span className="font-heading font-bold text-foreground capitalize">
                  {plan.goal
                    ? t(`auth.register.goalOptions.${plan.goal}`)
                    : '-'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {t('nutrition.createModal.weeks')}
                  </span>
                </div>
                <span className="font-heading font-bold text-foreground">
                  {plan.weeks} {t('workoutPlans.card.weeks')}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {t('common.created')}
                  </span>
                </div>
                <span className="font-heading font-bold text-foreground">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </EgyptianCard>

          {plan.totals && (
            <EgyptianCard>
              <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                <Utensils className="w-5 h-5" />
                {t('nutrition.planTotals') || 'Total Plan Macros'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('nutrition.calories') || 'Calories'}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {plan.totals.calories}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    kcal
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('nutrition.protein') || 'Protein'}
                  </span>
                  <span className="text-xl font-bold text-blue-500">
                    {plan.totals.protein}g
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {t('nutrition.dailyAvg') || 'Daily Avg'}:{' '}
                    {(plan.totals.protein / (plan.days?.length || 1)).toFixed(
                      1,
                    )}
                    g
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('nutrition.carbs') || 'Carbs'}
                  </span>
                  <span className="text-xl font-bold text-green-500">
                    {plan.totals.carbs}g
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {t('nutrition.dailyAvg') || 'Daily Avg'}:{' '}
                    {(plan.totals.carbs / (plan.days?.length || 1)).toFixed(1)}g
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('nutrition.fats') || 'Fat'}
                  </span>
                  <span className="text-xl font-bold text-yellow-500">
                    {plan.totals.fat}g
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {t('nutrition.dailyAvg') || 'Daily Avg'}:{' '}
                    {(plan.totals.fat / (plan.days?.length || 1)).toFixed(1)}g
                  </span>
                </div>
              </div>
            </EgyptianCard>
          )}

          {plan.note && (
            <EgyptianCard>
              <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                <StickyNote className="w-5 h-5" />
                {t('nutrition.pageDetails.notes')}
              </h2>
              <p className="text-muted-foreground text-sm italic leading-relaxed">
                "{plan.note}"
              </p>
            </EgyptianCard>
          )}
        </div>

        {/* Nutrition Days Manager */}
        <NutritionDayManager plan={plan} />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-card border-border/50">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading text-foreground">
                {t('nutrition.deleteDialog.title')}
              </AlertDialogTitle>
              <AlertDialogDescription className="font-body text-muted-foreground">
                {t('nutrition.deleteDialog.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="border-border/50 text-foreground hover:bg-muted/50">
                {t('common.cancel')}
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {t('common.delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default NutritionPlanDetails;
