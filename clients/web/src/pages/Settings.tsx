import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileSettings from '@/components/settings/ProfileSettings';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'ar');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            <span className="text-gradient-gold">{t('settings.title')}</span>
          </h1>
          <p className="font-body text-muted-foreground">
            {t('settings.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Profile Section */}
          <ProfileSettings />

          {/* Right Column: Preferences & Notifications */}
          <div className="space-y-8">
            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <EgyptianCard hoverable={false}>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  {t('settings.preferences.title')}
                </h2>

                <EgyptianDivider className="mb-6" />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    {t('settings.preferences.language')}
                  </Label>
                  <Select
                    value={language}
                    onValueChange={(value) => handleLanguageChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('settings.preferences.language')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en" className='cursor-pointer'>English</SelectItem>
                      <SelectItem value="ar" className='cursor-pointer'>العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </EgyptianCard>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout >
  );
};

export default Settings;
