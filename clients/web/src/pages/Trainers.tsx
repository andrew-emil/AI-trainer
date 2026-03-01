import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';
import TrainersGrid from '@/components/trainer/TrainersGrid';
import TrainersGridSkeleton from '@/components/trainer/TrainersGridSkeleton';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';


const Trainers = () => {
  const { t } = useTranslation();

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
                {t('trainers.title')} {t('trainers.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('trainers.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <EgyptianDivider />

      {/* Trainers Grid */}
      <Suspense fallback={<TrainersGridSkeleton />} >
        <TrainersGrid />
      </Suspense>

      {/* Join CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-egyptian-night/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Dumbbell className="w-16 h-16 text-egyptian-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('trainers.becomeTrainer')}{' '}
              <span className="text-gradient-gold">
                {t('trainers.becomeTrainerHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {t('trainers.becomeTrainerDesc')}
            </p>
            <Link
              to="/register?role=trainer"
              className="px-8 py-4 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-egyptian-night font-bold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              {t('trainers.applyNow')}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trainers;
