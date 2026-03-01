import { X, Check, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { WorkoutPlan } from '@/types/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import {
  getAllTraineesAndTheirAssignedPlans,
  assignWorkoutPlan,
  unassignWorkoutPlan,
} from '@/services/trainer';
import { GetAllTraineesWithWorkoutPlans } from '@/types/trainer';
import { toast } from 'sonner';

interface AssignPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: WorkoutPlan | null;
}

const AssignPlanModal = ({ isOpen, onClose, plan }: AssignPlanModalProps) => {
  const { t } = useTranslation();
  const [traineeData, setTraineeData] = useState<
    GetAllTraineesWithWorkoutPlans[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTraineeData();
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (plan && startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + plan.weeks * 7);
      setEndDate(end.toISOString().split('T')[0]);
    }
  }, [plan, startDate]);

  const fetchTraineeData = async () => {
    setLoading(true);
    const { data, error } = await getAllTraineesAndTheirAssignedPlans();
    if (data) {
      setTraineeData(data);
    } else {
      toast.error(error?.message || 'Failed to fetch trainees and plans');
    }
    setLoading(false);
  };

  if (!isOpen || !plan) return null;

  const handleToggleAssignment = async (
    item: GetAllTraineesWithWorkoutPlans,
  ) => {
    const targetTraineeId = item.trainee.userId;
    setProcessingId(targetTraineeId);

    const isAssignedToThisPlan = item.assignedPlan?.id === plan.id;

    try {
      if (isAssignedToThisPlan) {
        // Unassign
        const { error } = await unassignWorkoutPlan(targetTraineeId, plan.id);
        if (error) throw error;

        // Update local state
        setTraineeData((prev) =>
          prev.map((d) =>
            d.trainee.userId === targetTraineeId
              ? { ...d, assignedPlan: null }
              : d,
          ),
        );
        toast.success(
          t('workoutPlans.assignModal.unassignedSuccess') ||
            'Trainee unassigned successfully',
        );
      } else {
        // Assign (will overwrite if they have another plan? Or should we warn?)
        // If they have another plan, maybe we should warn or it just overwrites.
        // Assuming overwrite is fine for now, or backend handles it.
        const { error } = await assignWorkoutPlan({
          planId: plan.id,
          traineeId: targetTraineeId,
          startDate: new Date(startDate).toISOString(),
          endDate: endDate ? new Date(endDate).toISOString() : undefined,
          active: true,
        });
        if (error) throw error;

        // Update local state
        setTraineeData((prev) =>
          prev.map((d) =>
            d.trainee.userId === targetTraineeId
              ? { ...d, assignedPlan: plan }
              : d,
          ),
        );
        toast.success(
          t('workoutPlans.assignModal.assignedSuccess') ||
            'Trainee assigned successfully',
        );
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update assignment');
    } finally {
      setProcessingId(null);
    }
  };

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
          className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-border/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {t('workoutPlans.assignModal.title') || 'Assign Plan'}
                </h2>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {plan.name}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-muted/20 p-3 rounded-lg border border-border/30">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                Assignment Settings
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-8 text-sm bg-card"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-8 text-sm bg-card"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : traineeData.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No trainees found.
              </p>
            ) : (
              traineeData.map((item) => {
                const assignedPlan = item.assignedPlan;
                const isAssignedToThisPlan = assignedPlan?.id === plan.id;
                const isAssignedToOtherPlan =
                  assignedPlan && !isAssignedToThisPlan;
                const traineeUserId = item.trainee.userId;
                const isProcessing = processingId === traineeUserId;

                return (
                  <motion.button
                    key={traineeUserId}
                    onClick={() => handleToggleAssignment(item)}
                    disabled={isProcessing}
                    className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                      isAssignedToThisPlan
                        ? 'border-primary bg-primary/10'
                        : isAssignedToOtherPlan
                          ? 'border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50'
                          : 'border-border/30 bg-muted/20 hover:border-primary/50'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isAssignedToThisPlan
                              ? 'bg-primary/20'
                              : 'bg-muted/30'
                          }`}
                        >
                          {item.trainee.user.avatar ? (
                            <img
                              src={item.trainee.user.avatar}
                              alt="avatar"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="font-heading text-sm font-semibold text-primary">
                              {item.trainee.user.firstName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-foreground">
                            {item.trainee.user.firstName}{' '}
                            {item.trainee.user.lastName}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            {isAssignedToOtherPlan
                              ? `Assigned to: ${assignedPlan?.name}`
                              : item.trainee.user.email}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isAssignedToThisPlan
                            ? 'bg-primary text-primary-foreground'
                            : isAssignedToOtherPlan
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'border border-border/50'
                        }`}
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : isAssignedToThisPlan ? (
                          <Check className="w-4 h-4" />
                        ) : isAssignedToOtherPlan ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : null}
                      </div>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 p-6">
            <Button onClick={onClose} className="w-full btn-pharaoh">
              {t('workoutPlans.assignModal.done') || 'Done'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignPlanModal;
