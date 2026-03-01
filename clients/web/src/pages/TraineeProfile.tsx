import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { useWorkout } from '@/contexts/WorkoutContext';
import { useNutrition } from '@/contexts/NutritionContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Dumbbell,
  Apple,
  TrendingUp,
  Flame,
  Target,
  Edit,
  Camera,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TraineeProfile = () => {
  const { workoutLogs, workoutPlans } = useWorkout();
  const { nutritionPlans } = useNutrition();

  // Mock trainee data
  const trainee = {
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+20 987 654 3210',
    location: 'Alexandria, Egypt',
    joinDate: 'March 2024',
    goal: 'Build Muscle',
    bio: 'Dedicated fitness enthusiast working towards building strength and muscle mass. Training 5 days a week with a focus on progressive overload.',
    trainer: 'Ramses El-Masry',
    stats: {
      workoutsCompleted: workoutLogs.length,
      currentStreak: 12,
      totalWeight: 45000,
      personalRecords: 8,
    },
    measurements: {
      weight: { current: 78, target: 85, unit: 'kg' },
      bodyFat: { current: 18, target: 12, unit: '%' },
      muscle: { current: 35, target: 40, unit: 'kg' },
    },
    achievements: [
      { name: 'First Workout', icon: '🏋️', earned: true },
      { name: 'Week Warrior', icon: '🔥', earned: true },
      { name: 'Month Master', icon: '👑', earned: true },
      { name: 'Century Club', icon: '💯', earned: false },
      { name: 'Iron Will', icon: '⚔️', earned: false },
    ],
  };

  const assignedPlan = workoutPlans[0];
  const assignedNutrition = nutritionPlans[0];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EgyptianCard className="relative overflow-hidden">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-egyptian-turquoise/30 via-egyptian-gold/20 to-egyptian-turquoise/20" />

            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-egyptian-turquoise bg-egyptian-night flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-egyptian-turquoise" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-egyptian-turquoise text-egyptian-night flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{trainee.name}</h1>
                    <span className="px-3 py-1 rounded-full bg-egyptian-turquoise/20 text-egyptian-turquoise text-sm font-medium">
                      Trainee
                    </span>
                  </div>
                  <p className="text-egyptian-gold font-medium mb-1">
                    Goal: {trainee.goal}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Trainer: {trainee.trainer}
                  </p>
                  <p className="text-muted-foreground max-w-xl">
                    {trainee.bio}
                  </p>
                </div>

                <Button className="bg-gradient-to-r from-egyptian-turquoise to-egyptian-gold text-egyptian-night hover:shadow-[0_0_20px_rgba(64,224,208,0.4)]">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </EgyptianCard>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            {
              label: 'Workouts Done',
              value: trainee.stats.workoutsCompleted,
              icon: Dumbbell,
              color: 'text-egyptian-gold',
            },
            {
              label: 'Day Streak',
              value: trainee.stats.currentStreak,
              icon: Flame,
              color: 'text-orange-500',
            },
            {
              label: 'Weight Lifted',
              value: `${(trainee.stats.totalWeight / 1000).toFixed(1)}k kg`,
              icon: TrendingUp,
              color: 'text-egyptian-turquoise',
            },
            {
              label: 'Personal Records',
              value: trainee.stats.personalRecords,
              icon: Trophy,
              color: 'text-yellow-500',
            },
          ].map((stat) => (
            <EgyptianCard key={stat.label} className="p-4 text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </EgyptianCard>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EgyptianCard className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-egyptian-gold" />
                Goal Progress
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Weight</span>
                    <span className="text-sm text-muted-foreground">
                      {trainee.measurements.weight.current} /{' '}
                      {trainee.measurements.weight.target}{' '}
                      {trainee.measurements.weight.unit}
                    </span>
                  </div>
                  <Progress
                    value={
                      (trainee.measurements.weight.current /
                        trainee.measurements.weight.target) *
                      100
                    }
                    className="h-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Body Fat</span>
                    <span className="text-sm text-muted-foreground">
                      {trainee.measurements.bodyFat.current} /{' '}
                      {trainee.measurements.bodyFat.target}{' '}
                      {trainee.measurements.bodyFat.unit}
                    </span>
                  </div>
                  <Progress
                    value={
                      100 -
                      ((trainee.measurements.bodyFat.current -
                        trainee.measurements.bodyFat.target) /
                        trainee.measurements.bodyFat.current) *
                        100
                    }
                    className="h-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Muscle Mass</span>
                    <span className="text-sm text-muted-foreground">
                      {trainee.measurements.muscle.current} /{' '}
                      {trainee.measurements.muscle.target}{' '}
                      {trainee.measurements.muscle.unit}
                    </span>
                  </div>
                  <Progress
                    value={
                      (trainee.measurements.muscle.current /
                        trainee.measurements.muscle.target) *
                      100
                    }
                    className="h-3"
                  />
                </div>
              </div>
            </EgyptianCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EgyptianCard className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-egyptian-gold" />
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <Mail className="w-5 h-5 text-egyptian-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{trainee.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <Phone className="w-5 h-5 text-egyptian-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{trainee.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <MapPin className="w-5 h-5 text-egyptian-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Location
                    </div>
                    <div className="font-medium">{trainee.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-egyptian-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Member Since
                    </div>
                    <div className="font-medium">{trainee.joinDate}</div>
                  </div>
                </div>
              </div>
            </EgyptianCard>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EgyptianCard className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-egyptian-gold" />
              Achievements
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {trainee.achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`p-4 rounded-xl text-center transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-egyptian-gold/20 to-egyptian-gold/5 border border-egyptian-gold/30'
                      : 'bg-muted/30 border border-muted opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-medium">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.earned ? 'Earned' : 'Locked'}
                  </div>
                </div>
              ))}
            </div>
          </EgyptianCard>
        </motion.div>

        {/* Assigned Plans */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <EgyptianCard className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-egyptian-gold" />
                Current Workout Plan
              </h2>

              {assignedPlan ? (
                <div className="p-4 rounded-lg border border-egyptian-gold/20 bg-gradient-to-r from-egyptian-gold/5 to-transparent">
                  <h3 className="font-semibold mb-2">{assignedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {assignedPlan.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {assignedPlan.exercises.length} exercises
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No workout plan assigned yet.
                </p>
              )}
            </EgyptianCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <EgyptianCard className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Apple className="w-5 h-5 text-egyptian-turquoise" />
                Current Nutrition Plan
              </h2>

              {assignedNutrition ? (
                <div className="p-4 rounded-lg border border-egyptian-turquoise/20 bg-gradient-to-r from-egyptian-turquoise/5 to-transparent">
                  <h3 className="font-semibold mb-2">
                    {assignedNutrition.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {assignedNutrition.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-2 py-1 rounded bg-egyptian-turquoise/20 text-egyptian-turquoise">
                      {assignedNutrition.totalCalories} cal
                    </span>
                    <span className="text-muted-foreground">
                      {assignedNutrition.meals.length} meals
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No nutrition plan assigned yet.
                </p>
              )}
            </EgyptianCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeProfile;
