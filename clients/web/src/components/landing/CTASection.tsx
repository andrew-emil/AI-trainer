import { motion } from 'framer-motion';
import { ArrowRight, Crown, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { tokenStore } from '@/store/tokenStore';
import { UserRole } from '@/types/entities';

const CTASection = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const isTokenSet = tokenStore.isSet();

  function handleNavDashboard() {
    if (!auth || !auth.user) return '/dashboard';

    switch (auth.user.role) {
      case UserRole.admin:
        return '/admin';
      case UserRole.trainer:
        return '/workout-plans';
      case UserRole.trainee:
        return '/dashboard';
      default:
        return '/dashboard';
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0 hieroglyph-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Crown icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 mb-8 animate-pulse-gold"
          >
            <Crown className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            {t('landing.cta.titleLine1')}{' '}
            <span className="text-gradient-gold">
              {t('landing.cta.titleHighlight')}
            </span>
            <br />
            {t('landing.cta.titleLine2')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            {t('landing.cta.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {!isTokenSet ? (
              <>
                <Link
                  to="/register?role=trainee"
                  className="btn-pharaoh rounded-lg flex items-center justify-center gap-2"
                >
                  {t('landing.cta.joinTrainee')}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link
                  to="/register?role=trainer"
                  className="px-8 py-4 rounded-lg border-2 border-primary/50 text-primary font-heading font-semibold tracking-wider uppercase text-center transition-all duration-300 hover:bg-primary/10 hover:border-primary flex items-center justify-center gap-2"
                >
                  {t('landing.cta.joinTrainer')}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
              </>
            ) : (
              <Link
                to={handleNavDashboard()}
                className="btn-pharaoh rounded-lg flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                {t('nav.dashboard')}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
