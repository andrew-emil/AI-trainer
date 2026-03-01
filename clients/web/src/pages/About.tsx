import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Crown, Target, Heart, Sparkles } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Crown,
      titleKey: 'about.values.excellence',
      descKey: 'about.values.excellenceDesc',
    },
    {
      icon: Target,
      titleKey: 'about.values.precision',
      descKey: 'about.values.precisionDesc',
    },
    {
      icon: Heart,
      titleKey: 'about.values.dedication',
      descKey: 'about.values.dedicationDesc',
    },
    {
      icon: Sparkles,
      titleKey: 'about.values.innovation',
      descKey: 'about.values.innovationDesc',
    },
  ];

  const milestoneYears = ['2020', '2021', '2022', '2023', '2024'] as const;

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
              {t('about.title')}{' '}
              <span className="text-gradient-gold">
                {t('about.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <EgyptianDivider />

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('about.mission.title')}{' '}
                <span className="text-gradient-gold">
                  {t('about.mission.titleHighlight')}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.description1')}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.description2')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('about.mission.description3')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-egyptian-gold/20 to-egyptian-turquoise/10 rounded-3xl blur-3xl" />
              <div className="relative bg-card border border-egyptian-gold/20 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold text-gradient-gold mb-4">
                    10K+
                  </div>
                  <p className="text-xl text-muted-foreground">
                    {t('about.stats.warriors')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-egyptian-night/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.values.title')}{' '}
              <span className="text-gradient-gold">
                {t('about.values.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-egyptian-gold/20 to-egyptian-gold/5 border border-egyptian-gold/30 flex items-center justify-center mb-6">
                  <value.icon className="w-10 h-10 text-egyptian-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(value.titleKey)}</h3>
                <p className="text-muted-foreground">{t(value.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EgyptianDivider />

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.journey.title')}{' '}
              <span className="text-gradient-gold">
                {t('about.journey.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('about.journey.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-egyptian-gold/50 via-egyptian-gold/30 to-transparent hidden lg:block" />

            <div className="space-y-12">
              {milestoneYears.map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                  >
                    <div className="bg-card border border-egyptian-gold/20 rounded-xl p-6 inline-block">
                      <div className="text-2xl font-bold text-egyptian-gold mb-2">
                        {year}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t(`about.journey.milestones.${year}.title`)}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(`about.journey.milestones.${year}.description`)}
                      </p>
                    </div>
                  </div>

                  <div className="w-4 h-4 rounded-full bg-egyptian-gold border-4 border-background shadow-[0_0_20px_rgba(212,175,55,0.5)] hidden lg:block" />

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-egyptian-night/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.cta.title')}{' '}
              <span className="text-gradient-gold">
                {t('about.cta.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-egyptian-night font-bold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                {t('about.cta.startJourney')}
              </a>
              <a
                href="/trainers"
                className="px-8 py-4 border border-egyptian-gold/50 text-egyptian-gold font-bold rounded-xl hover:bg-egyptian-gold/10 transition-all duration-300"
              >
                {t('about.cta.meetTeam')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
