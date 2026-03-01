import { motion } from 'framer-motion';
import {
  Dumbbell,
  Apple,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Dumbbell,
      titleKey: 'landing.features.workoutPlans.title',
      descKey: 'landing.features.workoutPlans.description',
    },
    {
      icon: Apple,
      titleKey: 'landing.features.nutritionTracking.title',
      descKey: 'landing.features.nutritionTracking.description',
    },
    {
      icon: TrendingUp,
      titleKey: 'landing.features.progressAnalytics.title',
      descKey: 'landing.features.progressAnalytics.description',
    },
    {
      icon: Users,
      titleKey: 'landing.features.trainerConnect.title',
      descKey: 'landing.features.trainerConnect.description',
    },
    {
      icon: Calendar,
      titleKey: 'landing.features.scheduling.title',
      descKey: 'landing.features.scheduling.description',
    },
    {
      icon: MessageSquare,
      titleKey: 'landing.features.community.title',
      descKey: 'landing.features.community.description',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hieroglyph-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">
              {t('landing.features.title')}
            </span>{' '}
            {t('landing.features.titleHighlight')}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
          <EgyptianDivider className="mt-8 max-w-md mx-auto" />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <EgyptianCard className="h-full">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {t(feature.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-muted-foreground leading-relaxed flex-1">
                    {t(feature.descKey)}
                  </p>
                </div>
              </EgyptianCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
