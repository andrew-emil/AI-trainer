import { useTranslation } from 'react-i18next';
import EgyptianLogo from '@/components/ui/EgyptianLogo';
import { Link } from 'react-router';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t border-border/50 relative">
      <div className="absolute inset-0 hieroglyph-pattern opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <EgyptianLogo size="sm" />

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/about"
              className="font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </Link>
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
              to="/"
              className="font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.connect')}
            </Link>
          </nav>

          <p className="font-body text-sm text-muted-foreground">
            {'© ' + new Date().getFullYear() + ' ' + t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
