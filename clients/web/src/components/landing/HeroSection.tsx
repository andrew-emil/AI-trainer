import { motion } from 'framer-motion';
import { ArrowRight, Crown, Dumbbell, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/services/user';
import heroPharaoh from '@/assets/hero-pharaoh.jpg';
import EgyptianDivider from '@/components/ui/EgyptianDivider';

const HeroSection = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const isLoggedIn = !!auth?.user;

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPharaoh}
          alt="Pharaoh Warrior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 hieroglyph-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-body mb-6"
          >
            <Crown className="w-4 h-4" />
            <span>{t('landing.hero.badge')}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient-gold">
              {t('landing.hero.titleLine1')}
            </span>
            <br />
            <span className="text-foreground">
              {t('landing.hero.titleLine2')}
            </span>
            <br />
            <span className="text-gradient-gold">
              {t('landing.hero.titleLine3')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            {t('landing.hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="btn-pharaoh rounded-lg flex items-center justify-center gap-2"
                >
                  <Dumbbell className="w-5 h-5" />
                  {t('landing.hero.startTraining')}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-lg border-2 border-primary/50 text-primary font-heading font-semibold tracking-wider uppercase text-center transition-all duration-300 hover:bg-primary/10 hover:border-primary"
                >
                  {t('landing.hero.signIn')}
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <EgyptianDivider className="mb-8" />
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold">
                  1000+
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {t('landing.hero.stats.activeWarriors')}
                </p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold">
                  50+
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {t('landing.hero.stats.eliteTrainers')}
                </p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold">
                  10K+
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {t('landing.hero.stats.workoutPlans')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
