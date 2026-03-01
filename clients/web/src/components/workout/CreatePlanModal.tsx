import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import {
  useCreateWorkoutPlan,
  useUpdateWorkoutPlan,
} from '@/hooks/useWorkoutPlans';
import { useAuth } from '@/hooks/useAuth';
import {
  CreateWorkoutPlanDto,
  UpdateWorkoutPlanDto,
} from '@/types/workout-plans';
import { WorkoutPlan, TraineeGoal } from '@/types/entities';
import { useToast } from '@/hooks/use-toast';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPlan?: WorkoutPlan | null;
}

const CreatePlanModal = ({
  isOpen,
  onClose,
  editPlan,
}: CreatePlanModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { toast } = useToast();
  const createPlanMutation = useCreateWorkoutPlan();
  const updatePlanMutation = useUpdateWorkoutPlan();

  const [name, setName] = useState('');
  const [goal, setGoal] = useState<TraineeGoal>(TraineeGoal.bulk);
  const [weeks, setWeeks] = useState(4);

  useEffect(() => {
    if (editPlan) {
      setName(editPlan.name);
      setGoal(editPlan.goal);
      setWeeks(editPlan.weeks);
    } else {
      setName('');
      setGoal(TraineeGoal.bulk);
      setWeeks(4);
    }
  }, [editPlan, isOpen]);

  const handleSubmit = async () => {
    if (!name || !auth?.user?.id) {
      toast({
        title: t('common.error.title'),
        description: t('workoutPlans.createModal.requiredFields'),
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editPlan) {
        const dto: UpdateWorkoutPlanDto = {
          name,
          goal,
          weeks,
        };
        await updatePlanMutation.mutateAsync({ id: editPlan.id, dto });
        toast({
          title: t('common.success'),
          description: t('workoutPlans.createModal.updateSuccess'),
        });
        onClose();
      } else {
        const dto: CreateWorkoutPlanDto = {
          trainerId: auth.user!.id,
          name,
          goal,
          weeks,
        };
        const newPlan = await createPlanMutation.mutateAsync(dto);
        toast({
          title: t('common.success'),
          description: t('workoutPlans.createModal.createSuccess'),
        });
        onClose();
        // Navigate to plan details to add workout days
        if (newPlan?.id) {
          navigate(`/workout-plans/${newPlan.id}`);
        }
      }
    } catch (error) {
      toast({
        title: t('common.error.title'),
        description: t('workoutPlans.createModal.saveError'),
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
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border/50 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/30 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {editPlan
                  ? t('workoutPlans.createModal.titleEdit')
                  : t('workoutPlans.createModal.titleCreate')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Plan details */}
            <div className="space-y-4">
              <div>
                <Label className="text-foreground font-heading">
                  {t('workoutPlans.createModal.planName')} *
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(
                    'workoutPlans.createModal.planNamePlaceholder',
                  )}
                  className="mt-2 bg-background/50 border-border/50 text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground font-heading">
                    {t('workoutPlans.createModal.goal')} *
                  </Label>
                  <Select
                    value={goal}
                    onValueChange={(value) => setGoal(value as TraineeGoal)}
                  >
                    <SelectTrigger className="mt-2 bg-background/50 border-border/50">
                      <SelectValue
                        placeholder={t('workoutPlans.createModal.selectGoal')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TraineeGoal.bulk}>
                        {t('auth.register.goalOptions.bulk')}
                      </SelectItem>
                      <SelectItem value={TraineeGoal.cut}>
                        {t('auth.register.goalOptions.cut')}
                      </SelectItem>
                      <SelectItem value={TraineeGoal.maintenance}>
                        {t('auth.register.goalOptions.maintenance')}
                      </SelectItem>
                      <SelectItem value={TraineeGoal.strength}>
                        {t('auth.register.goalOptions.strength')}
                      </SelectItem>
                      <SelectItem value={TraineeGoal.body_recomb}>
                        {t('auth.register.goalOptions.body_recomb')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-foreground font-heading">
                    {t('workoutPlans.createModal.durationWeeks')} *
                  </Label>
                  <Input
                    type="number"
                    value={weeks}
                    onChange={(e) => setWeeks(parseInt(e.target.value) || 4)}
                    min={1}
                    max={52}
                    className="mt-2 bg-background/50 border-border/50 text-foreground"
                  />
                </div>
              </div>
            </div>

            <EgyptianDivider />

            <div className="text-sm text-muted-foreground">
              <p>{t('workoutPlans.createModal.createDesc')}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border/30 p-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={onClose}
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
                {editPlan
                  ? t('workoutPlans.createModal.savePlan')
                  : t('workoutPlans.createModal.createPlan')}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreatePlanModal;
