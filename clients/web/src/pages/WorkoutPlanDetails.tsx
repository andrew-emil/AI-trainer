import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Dumbbell,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkoutDayManager from '@/components/workout/WorkoutDayManager';
import {
  useWorkoutPlan,
  useUpdateWorkoutPlan,
  useDeleteWorkoutPlan,
} from '@/hooks/useWorkoutPlans';
import { useTraineeWorkoutLogs } from '@/hooks/useWorkoutLogs';
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

const WorkoutPlanDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const { toast } = useToast();
  const { auth } = useAuth();
  const isTrainer = auth?.user?.role === 'trainer';
  const { data: plan, isLoading } = useWorkoutPlan(id!);
  const deletePlanMutation = useDeleteWorkoutPlan();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deletePlanMutation.mutateAsync(id);
      toast({
        title: t('common.yes'),
        description: t('workoutPlans.pageDetails.deleteSuccess'),
      });
      navigate('/workout-plans');
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.pageDetails.deleteError'),
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Dumbbell className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-muted-foreground">
              {t('workoutPlans.pageDetails.loadingPlan')}
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
              {t('workoutPlans.pageDetails.planNotFound')}
            </p>
            <Button
              onClick={() => navigate('/workout-plans')}
              className="btn-pharaoh"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('workoutPlans.pageDetails.backToPlans')}
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
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/workout-plans')}
              className="border-border/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('workoutPlans.pageDetails.back')}
            </Button>

            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                {plan.name}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  <Target className="w-3 h-3 mr-1" />
                  {plan.goal?.replace('_', ' ') || 'General'}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  {plan.weeks} {t('workoutPlans.pageDetails.weeks')}
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
                {t('workoutPlans.deletePlan')}
              </Button>
            </div>
          )}
        </div>

        <EgyptianDivider />

        {/* Plan Info Card */}
        <EgyptianCard>
          <h2 className="font-heading text-xl font-bold mb-4">
            {t('workoutPlans.pageDetails.planInformation')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t('workoutPlans.createModal.goal')}
              </p>
              <p className="font-heading font-semibold capitalize">
                {plan.goal?.replace('_', ' ') || 'General Fitness'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t('workoutPlans.pageDetails.duration')}
              </p>
              <p className="font-heading font-semibold">
                {plan.weeks} {t('workoutPlans.pageDetails.weeks')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t('workoutPlans.pageDetails.created')}
              </p>
              <p className="font-heading font-semibold">
                {new Date(plan.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </EgyptianCard>

        <EgyptianDivider />

        {/* Workout Days Manager */}
        <WorkoutDayManager plan={plan} isTrainer={isTrainer} />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-card border-border/50">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading text-foreground">
                {t('workoutPlans.deleteDialog.title')}
              </AlertDialogTitle>
              <AlertDialogDescription className="font-body text-muted-foreground">
                {t('workoutPlans.deleteDialog.description')}
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

export default WorkoutPlanDetails;
