import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { XCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RejectRequestDialogProps {
  onConfirm: (note: string) => void;
  isLoading: boolean;
  trigger?: React.ReactNode;
}

export function RejectRequestDialog({
  onConfirm,
  isLoading,
  trigger,
}: RejectRequestDialogProps) {
  const { t } = useTranslation();
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm(note);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <XCircle className="w-4 h-4 me-2" />
            {t('admin.requests.reject')}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('admin.requests.rejectTitle')}</DialogTitle>
          <DialogDescription>
            {t('admin.requests.rejectDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            id="note"
            placeholder={t('admin.requests.reasonPlaceholder')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="col-span-3"
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || !note.trim()}
            variant="destructive"
          >
            {t('admin.requests.confirmReject')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
