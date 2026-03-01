import { useRouteError, useNavigate } from 'react-router';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const RootErrorBoundary = () => {
  const error = useRouteError() as {
    statusText?: string;
    message?: string;
  } | null;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 hieroglyph-pattern opacity-5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="card-egyptian p-8 rounded-lg shadow-2xl gold-glow border egyptian-border text-center space-y-6 relative overflow-hidden">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30"
          >
            <AlertTriangle className="h-10 w-10 text-primary animate-pulse-gold" />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-heading text-gradient-gold tracking-wider">
              {t('error.subtitle')}
            </h1>
            <p className="text-muted-foreground">
              {error?.statusText ||
                error?.message ||
                'An unexpected error occurred. The spirits are displeased.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:text-primary gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {t('error.tryAgainButton')}
            </Button>

            <Button onClick={() => navigate('/')} className="btn-pharaoh gap-2">
              <Home className="h-4 w-4" />
              {t('error.homeButton')}
            </Button>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
        </div>
      </motion.div>
    </div>
  );
};

export default RootErrorBoundary;
