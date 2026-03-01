import EgyptianLogo from '@/components/ui/EgyptianLogo';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { tokenStore } from '@/store/tokenStore';
import { UserRole } from '@/types/entities';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { Activity, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTokenSet, setIsTokenSet] = useState(tokenStore.isSet());
  const { t } = useTranslation();
  const { auth } = useAuth();

  function handleNavDashboard() {
    if (!auth || !auth.user) return '/register';

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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/">
            <EgyptianLogo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/features"
              className="font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.features')}
            </Link>
            <Link
              to="/trainers"
              className="font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.trainers')}
            </Link>
            <Link
              to="/about"
              className="font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Activity mode={isTokenSet ? 'hidden' : 'visible'}>
              <Link
                to="/login"
                className="font-body text-muted-foreground hover:text-primary transition-colors px-4 py-2"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsla(43,87%,55%,0.5)]"
              >
                {t('nav.getStarted')}
              </Link>
            </Activity>
            <Activity mode={isTokenSet ? 'visible' : 'hidden'}>
              <Link
                onClick={() => {
                  tokenStore.clear();
                  setIsTokenSet(false);
                }}
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-body">{t('nav.logout')}</span>
              </Link>
              <Link
                to={handleNavDashboard()}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsla(43,87%,55%,0.5)]"
              >
                {t('nav.dashboard')}
              </Link>
            </Activity>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/30 bg-background"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
              <Link
                to="/features"
                className="font-body text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.features')}
              </Link>
              <Link
                to="/trainers"
                className="font-body text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.trainers')}
              </Link>
              <Link
                to="/about"
                className="font-body text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.about')}
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/30">
                <LanguageSwitcher />
                <Activity mode={isTokenSet ? 'hidden' : 'visible'}>
                  <Link
                    to="/login"
                    className="font-body text-center text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="btn-pharaoh rounded-lg text-center"
                  >
                    {t('nav.getStarted')}
                  </Link>
                </Activity>
                <Activity mode={isTokenSet ? 'visible' : 'hidden'}>
                  <Link
                    onClick={() => {
                      tokenStore.clear();
                      setIsTokenSet(false);
                    }}
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-body">{t('nav.logout')}</span>
                  </Link>
                  <Link
                    to={handleNavDashboard()}
                    className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsla(43,87%,55%,0.5)]"
                  >
                    {t('nav.dashboard')}
                  </Link>
                </Activity>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
