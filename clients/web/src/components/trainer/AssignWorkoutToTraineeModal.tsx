import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Dumbbell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTrainerWorkoutPlans } from '@/hooks/useWorkoutPlans';
import { useWorkout } from '@/contexts/WorkoutContext';
import { assignWorkoutPlan, unassignWorkoutPlan } from '@/services/trainer';
import { toast } from 'sonner';

interface AssignWorkoutToTraineeModalProps {
  isOpen: boolean;
  onClose: () => void;
  traineeId: string;
  traineeName: string;
  currentPlanId?: string;
  onSuccess?: () => void;
}

const AssignWorkoutToTraineeModal = ({
  isOpen,
  onClose,
  traineeId,
  traineeName,
  currentPlanId,
  onSuccess,
}: AssignWorkoutToTraineeModalProps) => {
  const { t } = useTranslation();
  const { data: plans = [], isLoading } = useTrainerWorkoutPlans();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPlanId(null);
      setSearchQuery('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
    }
  }, [isOpen]);

  // Auto-calculate end date
  useEffect(() => {
    if (selectedPlanId && startDate) {
      const plan = plans.find((p) => p.id === selectedPlanId);
      if (plan) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + plan.weeks * 7);
        setEndDate(end.toISOString().split('T')[0]);
      }
    }
  }, [selectedPlanId, startDate, plans]);

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAssign = async () => {
    if (!selectedPlanId) return;

    setIsSubmitting(true);
    try {
      const isUnassigning = selectedPlanId === currentPlanId;

      if (isUnassigning) {
        const { error } = await unassignWorkoutPlan(traineeId, selectedPlanId);
        if (error) {
          toast.error(error.message || 'Failed to unassign plan');
        } else {
          toast.success(`Workout plan unassigned from ${traineeName}`);
          onSuccess?.();
          onClose();
        }
      } else {
        const { error } = await assignWorkoutPlan({
          planId: selectedPlanId,
          traineeId: traineeId,
          startDate: new Date(startDate).toISOString(),
          endDate: endDate ? new Date(endDate).toISOString() : undefined,
          active: true,
        });

        if (error) {
          toast.error(error.message || 'Failed to assign plan');
        } else {
          toast.success(
            t('workoutPlans.assignedSuccess', { trainee: traineeName }) ||
              `Workout plan assigned to ${traineeName}`,
          );
          onSuccess?.();
          onClose();
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
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
          className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-border/30 p-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Assign Workout Plan
                </h2>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  To:{' '}
                  <span className="text-primary font-semibold">
                    {traineeName}
                  </span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-muted/20 border-border/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-muted/20 border-border/50"
                />
              </div>
            </div>

            <Input
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/20 border-border/50"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-3 overflow-y-auto flex-grow">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredPlans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No workout plans found.</p>
              </div>
            ) : (
              filteredPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const isCurrent = currentPlanId === plan.id;
                return (
                  <motion.button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-300 text-left flex items-center gap-3 ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : isCurrent
                          ? 'border-green-500/50 bg-green-500/5'
                          : 'border-border/30 bg-muted/20 hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted/30 text-muted-foreground'
                      }`}
                    >
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-heading font-semibold text-foreground">
                        {plan.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {plan.weeks} weeks • {plan.goal}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 p-6 flex-shrink-0">
            <Button
              onClick={handleAssign}
              className="w-full btn-pharaoh"
              disabled={!selectedPlanId || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin me-2" />
              ) : null}
              {selectedPlanId === currentPlanId
                ? 'Unassign Plan'
                : 'Assign Plan'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignWorkoutToTraineeModal;
