import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-foreground hover:border-primary/50 transition-all"
      title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className="font-body text-sm">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
