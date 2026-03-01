import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getAssignedTrainees,
  assignNutritionPlan,
  unassignNutritionPlan,
} from '@/services/trainer';
import { GetAssignedTraineesResponse } from '@/types/trainer';
import { toast } from 'sonner';

interface AssignNutritionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  planWeeks?: number;
  currentlyAssigned: string[];
}

const AssignNutritionPlanModal = ({
  isOpen,
  onClose,
  planId,
  planName,
  planWeeks = 4,
  currentlyAssigned,
}: AssignNutritionPlanModalProps) => {
  const { t } = useTranslation();
  const [trainees, setTrainees] = useState<GetAssignedTraineesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [assignedTraineeIds, setAssignedTraineeIds] = useState<string[]>([]);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTrainees();
      setAssignedTraineeIds(currentlyAssigned || []);
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
    }
  }, [isOpen, currentlyAssigned]);

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + planWeeks * 7);
      setEndDate(end.toISOString().split('T')[0]);
    }
  }, [startDate, planWeeks]);

  const fetchTrainees = async () => {
    setLoading(true);
    const { data, error } = await getAssignedTrainees();
    if (data) {
      setTrainees(data);
    } else {
      toast.error(error?.message || 'Failed to fetch trainees');
    }
    setLoading(false);
  };

  const handleToggleAssignment = async (traineeId: string) => {
    setProcessingId(traineeId);
    const isAssigned = assignedTraineeIds.includes(traineeId);

    try {
      if (isAssigned) {
        // Unassign
        const { error } = await unassignNutritionPlan(traineeId, planId);
        if (error) throw error;
        setAssignedTraineeIds((prev) => prev.filter((id) => id !== traineeId));
        toast.success(
          t('nutrition.assignModal.unassignedSuccess') ||
            'Trainee unassigned successfully',
        );
      } else {
        // Assign
        const { error } = await assignNutritionPlan({
          nutritionPlanId: planId,
          traineeId,
          startDate: new Date(startDate).toISOString(),
          endDate: endDate ? new Date(endDate).toISOString() : undefined,
          active: true,
        });
        if (error) throw error;
        setAssignedTraineeIds((prev) => [...prev, traineeId]);
        toast.success(
          t('nutrition.assignModal.assignedSuccess') ||
            'Trainee assigned successfully',
        );
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update assignment');
    } finally {
      setProcessingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-card border border-border/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {t('nutrition.assignPlan')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{planName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
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

          {/* Trainee List */}
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : trainees.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No trainees found.
              </p>
            ) : (
              trainees.map((item) => {
                const isAssigned = assignedTraineeIds.includes(item.traineeId);
                const isProcessing = processingId === item.traineeId;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleToggleAssignment(item.traineeId)}
                    disabled={isProcessing}
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      isAssigned
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-muted/10 border-border/30 hover:border-primary/30'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isAssigned ? 'bg-primary/20' : 'bg-muted/20'
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
                      <div className="text-left">
                        <p className="font-medium text-foreground">
                          {item.trainee.user.firstName}{' '}
                          {item.trainee.user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.trainee.user.email}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isAssigned
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border/50'
                      }`}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        isAssigned && <Check className="w-4 h-4" />
                      )}
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/30">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
            >
              {t('nutrition.done') || 'Done'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignNutritionPlanModal;
