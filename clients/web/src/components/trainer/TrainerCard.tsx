import { TrainerWithUser } from '@/types/trainer';
import { motion } from 'framer-motion';
import { Award, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

type Props = {
  trainer: TrainerWithUser;
  index: number;
};

function TrainerCard({ trainer, index }: Props) {
  const { t } = useTranslation();

  return (
    <motion.div
      key={trainer.user.username}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-card border border-egyptian-gold/20 rounded-2xl overflow-hidden hover:border-egyptian-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
        <div className="relative h-64 overflow-hidden">
          <img
            src={trainer.user.avatar}
            alt={trainer.user.username}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-egyptian-night/90 to-transparent" />
          <div className="absolute bottom-4 start-4 end-4">
            <h3 className="text-xl font-bold text-white">
              {trainer.user.username}
            </h3>
            <p className="text-egyptian-gold">{trainer.bio}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground mb-4">{trainer.bio}</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-egyptian-gold">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{trainer.ratingAvg}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('trainers.rating')}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-egyptian-gold">
                <Award className="w-4 h-4" />
                <span className="font-bold">
                  {trainer.experienceYears} {t('trainers.years')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('trainers.experience')}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-egyptian-gold">
                <Users className="w-4 h-4" />
                <span className="font-bold">{trainer.rankScore}+</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('trainers.rank')}
              </p>
            </div>
          </div>

          <Link
            to={`/trainers/${trainer.userId}`}
            className="block w-full py-3 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-egyptian-night font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 text-center"
          >
            {t('trainers.viewProfile')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default TrainerCard;
