import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createBodyWeightLog } from '@/services/body-weight-log';

interface WeightLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  traineeId: string;
  onSuccess: () => void;
}

const WeightLogModal = ({
  isOpen,
  onClose,
  traineeId,
  onSuccess,
}: WeightLogModalProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    smm: '',
    pbf: '',
    loggedAt: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.weight) {
      toast.error(t('weightLog.form.weightRequired') || 'Weight is required');
      return;
    }

    setLoading(true);
    const { error } = await createBodyWeightLog({
      traineeId,
      weight: parseFloat(formData.weight),
      smm: formData.smm ? parseFloat(formData.smm) : undefined,
      pbf: formData.pbf ? parseFloat(formData.pbf) : undefined,
      loggedAt: new Date(formData.loggedAt),
    });

    setLoading(false);
    if (error) {
      toast.error(t('weightLog.form.error'));
    } else {
      toast.success(t('weightLog.form.success'));
      onSuccess();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border/30">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-foreground">
            {t('weightLog.form.title')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="weight">{t('weightLog.form.weight')}</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              required
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              className="bg-muted/20 border-border/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smm">{t('weightLog.form.smm')}</Label>
            <Input
              id="smm"
              type="number"
              step="0.1"
              value={formData.smm}
              onChange={(e) =>
                setFormData({ ...formData, smm: e.target.value })
              }
              className="bg-muted/20 border-border/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pbf">{t('weightLog.form.pbf')}</Label>
            <Input
              id="pbf"
              type="number"
              step="0.1"
              value={formData.pbf}
              onChange={(e) =>
                setFormData({ ...formData, pbf: e.target.value })
              }
              className="bg-muted/20 border-border/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loggedAt">{t('weightLog.form.loggedAt')}</Label>
            <Input
              id="loggedAt"
              type="date"
              value={formData.loggedAt}
              onChange={(e) =>
                setFormData({ ...formData, loggedAt: e.target.value })
              }
              className="bg-muted/20 border-border/30 text-white [color-scheme:dark]"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="border-border/30 hover:bg-muted/30"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[100px]"
            >
              {loading ? t('common.saving') : t('weightLog.form.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WeightLogModal;
