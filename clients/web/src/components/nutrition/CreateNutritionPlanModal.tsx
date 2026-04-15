import { Button } from '@/components/ui/button';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  useCreateNutritionPlan,
  useUpdateNutritionPlan,
} from '@/hooks/useNutritionPlans';
import { TraineeGoal } from '@/services/trainee';
import { NutritionPlan } from '@/services/trainer';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface CreateNutritionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: NutritionPlan | null;
}

const CreateNutritionPlanModal = ({
  isOpen,
  onClose,
  plan,
}: CreateNutritionPlanModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createPlanMutation = useCreateNutritionPlan();
  const updatePlanMutation = useUpdateNutritionPlan();

  const isEditing = !!plan;

  const [name, setName] = useState('');
  const [goal, setGoal] = useState<TraineeGoal>(TraineeGoal.cut);
  const [weeks, setWeeks] = useState(1);

  useEffect(() => {
    if (plan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(plan.name);
      setGoal(plan.goal);
      setWeeks(plan.weeks);
    } else {
      setName('');
      setGoal(TraineeGoal.cut);
      setWeeks(1);
    }
  }, [plan, isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (!name || !goal || !weeks) {
      toast({
        title: t('error.title'),
        description: t('nutrition.createModal.requiredFields'),
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isEditing && plan) {
        await updatePlanMutation.mutateAsync({
          id: plan.id,
          dto: { name, goal, weeks },
        });

        toast({
          title: t('common.success'),
          description: t('nutrition.createModal.updateSuccess'),
        });
      } else {
        const newPlan = await createPlanMutation.mutateAsync({
          name,
          goal,
          weeks,
        });

        toast({
          title: t('common.success'),
          description: t('nutrition.createModal.createSuccess'),
        });

        if (newPlan?.id) {
          navigate(`/nutrition/${newPlan.id}`);
        }
      }

      handleClose();
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('nutrition.createModal.saveError'),
        variant: 'destructive',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/30 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {isEditing
                  ? t('nutrition.editPlan') || 'Edit Plan'
                  : t('nutrition.createPlan')}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-foreground font-heading">
                  {t('nutrition.createModal.planName')} *
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('nutrition.createModal.planNamePlaceholder')}
                  className="mt-2 bg-background/50 border-border/50 text-foreground"
                />
              </div>

              <div>
                <Label className="text-foreground font-heading">
                  {t('nutrition.createModal.planGoal')} *
                </Label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as TraineeGoal)}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-border/50 bg-background/50 text-foreground"
                >
                  {Object.values(TraineeGoal).map((g) => (
                    <option key={g} value={g}>
                      {t(`goals.${g}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-foreground font-heading">
                  {t('nutrition.createModal.weeks')} *
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={weeks}
                  onChange={(e) => setWeeks(Number(e.target.value))}
                  placeholder="e.g., 12"
                  className="mt-2 bg-background/50 border-border/50 text-foreground"
                />
              </div>
            </div>

            <EgyptianDivider />

            {!isEditing && (
              <div className="text-sm text-muted-foreground">
                <p>{t('nutrition.createModal.createDesc')}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border/30 p-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-border/50 text-foreground hover:bg-muted/50"
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !name ||
                  createPlanMutation.isPending ||
                  updatePlanMutation.isPending
                }
                className="flex-1 btn-pharaoh"
              >
                {createPlanMutation.isPending || updatePlanMutation.isPending
                  ? t('common.saving')
                  : isEditing
                    ? t('common.save')
                    : t('nutrition.createPlan')}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateNutritionPlanModal;
