import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import {
  Dumbbell,
  Apple,
  Calendar,
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  Zap,
  Shield,
  Smartphone,
  BarChart3,
  Award,
} from 'lucide-react';

const Features = () => {
  const { t } = useTranslation();

  const mainFeatures = [
    {
      icon: Dumbbell,
      titleKey: 'features.mainFeatures.customWorkouts.title',
      descriptionKey: 'features.mainFeatures.customWorkouts.description',
      highlightsKey: 'features.mainFeatures.customWorkouts.highlights',
    },
    {
      icon: Apple,
      titleKey: 'features.mainFeatures.nutrition.title',
      descriptionKey: 'features.mainFeatures.nutrition.description',
      highlightsKey: 'features.mainFeatures.nutrition.highlights',
    },
    {
      icon: Calendar,
      titleKey: 'features.mainFeatures.scheduling.title',
      descriptionKey: 'features.mainFeatures.scheduling.description',
      highlightsKey: 'features.mainFeatures.scheduling.highlights',
    },
    {
      icon: TrendingUp,
      titleKey: 'features.mainFeatures.analytics.title',
      descriptionKey: 'features.mainFeatures.analytics.description',
      highlightsKey: 'features.mainFeatures.analytics.highlights',
    },
  ];

  const additionalFeatures = [
    {
      icon: Users,
      titleKey: 'features.additionalFeatures.trainerConnect',
      descKey: 'features.additionalFeatures.trainerConnectDesc',
    },
    {
      icon: MessageSquare,
      titleKey: 'features.additionalFeatures.messaging',
      descKey: 'features.additionalFeatures.messagingDesc',
    },
    {
      icon: Target,
      titleKey: 'features.additionalFeatures.goals',
      descKey: 'features.additionalFeatures.goalsDesc',
    },
    {
      icon: Zap,
      titleKey: 'features.additionalFeatures.quickWorkouts',
      descKey: 'features.additionalFeatures.quickWorkoutsDesc',
    },
    {
      icon: Shield,
      titleKey: 'features.additionalFeatures.formCheck',
      descKey: 'features.additionalFeatures.formCheckDesc',
    },
    {
      icon: Smartphone,
      titleKey: 'features.additionalFeatures.mobile',
      descKey: 'features.additionalFeatures.mobileDesc',
    },
    {
      icon: BarChart3,
      titleKey: 'features.additionalFeatures.leaderboards',
      descKey: 'features.additionalFeatures.leaderboardsDesc',
    },
    {
      icon: Award,
      titleKey: 'features.additionalFeatures.achievements',
      descKey: 'features.additionalFeatures.achievementsDesc',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-egyptian-night via-background to-background">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-gold">
                {t('features.title')} {t('features.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('features.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <EgyptianDivider />

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-egyptian-gold/20 to-egyptian-gold/5 border border-egyptian-gold/30 flex items-center justify-center mb-6">
                    <feature.icon className="w-10 h-10 text-egyptian-gold" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {t(feature.titleKey)}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t(feature.descriptionKey)}
                  </p>
                  <ul className="space-y-3">
                    {(
                      t(feature.highlightsKey, {
                        returnObjects: true,
                      }) as string[]
                    ).map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-egyptian-gold" />
                        <span className="text-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-egyptian-gold/20 to-egyptian-turquoise/10 rounded-3xl blur-3xl" />
                    <div className="relative bg-card border border-egyptian-gold/20 rounded-3xl p-8 h-80 flex items-center justify-center">
                      <feature.icon className="w-32 h-32 text-egyptian-gold/30" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EgyptianDivider />

      {/* Additional Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-egyptian-night/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('features.additionalTitle')}{' '}
              <span className="text-gradient-gold">
                {t('features.additionalTitleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('features.additionalSubtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card border border-egyptian-gold/10 rounded-xl p-6 hover:border-egyptian-gold/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-egyptian-gold/10 flex items-center justify-center mb-4 group-hover:bg-egyptian-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-egyptian-gold" />
                </div>
                <h3 className="font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-egyptian-gold/20 via-egyptian-night to-egyptian-night border border-egyptian-gold/30 p-12 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-egyptian-gold/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {t('features.cta.title')}{' '}
                <span className="text-gradient-gold">
                  {t('features.cta.titleHighlight')}
                </span>
                ?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                {t('features.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="px-8 py-4 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-egyptian-night font-bold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                >
                  {t('features.cta.getStarted')}
                </a>
                <a
                  href="/trainers"
                  className="px-8 py-4 border border-egyptian-gold/50 text-egyptian-gold font-bold rounded-xl hover:bg-egyptian-gold/10 transition-all duration-300"
                >
                  {t('features.cta.meetTrainers')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
