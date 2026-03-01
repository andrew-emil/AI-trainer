import { motion } from 'framer-motion';
import { Dumbbell, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WorkoutPlan } from '@/types/entities';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Button } from '@/components/ui/button';

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  showTrainerActions?: boolean;
}

const WorkoutPlanCard = ({
  plan,
  onEdit,
  onDelete,
  onView,
  showTrainerActions = false,
}: WorkoutPlanCardProps) => {
  const { t, i18n } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <EgyptianCard className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground capitalize">
                {plan.goal
                  ? t(`auth.register.goalOptions.${plan.goal}`)
                  : t('auth.register.goalOptions.maintenance')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2 rounded-lg bg-muted/30 border border-border/30 text-center">
            <p className="font-heading text-lg font-bold text-primary">
              {plan.weeks}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              {t('workoutPlans.card.weeks')}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-muted/30 border border-border/30 text-center">
            <div className="flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="font-heading text-sm font-bold text-primary">
                {new Date(plan.createdAt).toLocaleDateString(i18n.language)}
              </p>
            </div>
            <p className="font-body text-xs text-muted-foreground">
              {t('workoutPlans.card.created')}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          {showTrainerActions ? (
            <>
              <Button
                onClick={onView}
                variant="outline"
                className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('workoutPlans.card.view')}
              </Button>
              <Button
                onClick={onEdit}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                onClick={onDelete}
                variant="outline"
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button onClick={onView} className="w-full btn-pharaoh">
              <Eye className="w-4 h-4 mr-2" />
              {t('workoutPlans.card.viewPlan')}
            </Button>
          )}
        </div>
      </EgyptianCard>
    </motion.div>
  );
};

export default WorkoutPlanCard;
