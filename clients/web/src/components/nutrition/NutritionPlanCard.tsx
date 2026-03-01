import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Users,
  Trash2,
  Calendar,
  Eye,
  Utensils,
  Edit,
} from 'lucide-react';
import { NutritionPlan } from '@/types/entities';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Button } from '@/components/ui/button';

interface NutritionPlanCardProps {
  plan: NutritionPlan;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAssign?: () => void;
  showActions?: boolean;
}

const NutritionPlanCard = ({
  plan,
  onView,
  onEdit,
  onDelete,
  onAssign,
  showActions = true,
}: NutritionPlanCardProps) => {
  const { t } = useTranslation();

  return (
    <EgyptianCard className="h-full group hover:border-primary/50 transition-colors">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className="cursor-pointer flex-1 flex items-center gap-3"
            onClick={onView}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
              <Utensils className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {plan.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground capitalize">
                {plan.goal
                  ? t(`auth.register.goalOptions.${plan.goal}`)
                  : t('auth.register.goalOptions.maintenance')}
              </p>
            </div>
          </div>
          {showActions && (
            <div className="flex gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t('common.created')}
              </p>
              <p className="font-heading font-bold text-foreground text-xs">
                {new Date(plan.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t('nutrition.trainees')}
              </p>
              <p className="font-heading font-bold text-foreground">
                {plan.assignedTo?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Macro Summary */}
        {plan.totals && (
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {t('nutrition.calories')}
              </span>
              <span className="font-heading font-bold text-primary text-sm">
                {plan.totals.calories} kcal
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">
                  {t('nutrition.protein')}
                </span>
                <span className="text-xs font-bold text-blue-500">
                  {plan.totals.protein}g
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">
                  {t('nutrition.carbs')}
                </span>
                <span className="text-xs font-bold text-green-500">
                  {plan.totals.carbs}g
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">
                  {t('nutrition.fats')}
                </span>
                <span className="text-xs font-bold text-yellow-500">
                  {plan.totals.fat}g
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            {t('common.view')}
          </Button>

          {showActions && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAssign}
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              <Users className="w-4 h-4 mr-2" />
              {t('nutrition.assign')}
            </Button>
          )}
        </div>
      </div>
    </EgyptianCard>
  );
};

export default NutritionPlanCard;
