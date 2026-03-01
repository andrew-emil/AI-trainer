import { useState, useEffect, useRef } from 'react';
import {
  X,
  Check,
  Dumbbell,
  Award,
  Timer,
  ChevronRight,
  Play,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import {
  useCreateWorkoutLog,
  useWeightRecommendation,
} from '@/hooks/useWorkoutLogs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface WorkoutLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  dayId: string;
  plan: any | null; // This now contains the day's exercises
  scheduledDate?: Date;
}

const WorkoutLogger = ({
  isOpen,
  onClose,
  dayId,
  plan,
  scheduledDate,
}: WorkoutLoggerProps) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const createLogMutation = useCreateWorkoutLog();

  // State
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [sessionStartTime] = useState<Date>(scheduledDate || new Date());
  const [isFinished, setIsFinished] = useState(false);
  const [notes, setNotes] = useState('');

  // Local storage for batched data
  const [loggedExercises, setLoggedExercises] = useState<any[]>([]);
  const [currentExerciseSets, setCurrentExerciseSets] = useState<any[]>([]);
  const [exerciseStartTime, setExerciseStartTime] = useState<string>(
    new Date().toISOString(),
  );
  const [totalRestTime, setTotalRestTime] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0); // for UI
  const [restStartTime, setRestStartTime] = useState<number | null>(null);

  // Per-set inputs
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [rir, setRir] = useState<number>(0);

  // RIR descriptions mapping
  const rirDescriptions: Record<number, string> = {
    0: t('workoutLogger.rirDescriptions.0') || 'Max effort!',
    0.5:
      t('workoutLogger.rirDescriptions.0.5') ||
      'Perhaps could have done +1 more rep',
    1:
      t('workoutLogger.rirDescriptions.1') ||
      'Definitely could have done +1 more rep',
    1.5:
      t('workoutLogger.rirDescriptions.1.5') ||
      'Could have done +1 more rep, perhaps even +2',
    2:
      t('workoutLogger.rirDescriptions.2') ||
      'Definitely could have done +2 more reps',
    2.5:
      t('workoutLogger.rirDescriptions.2.5') ||
      'Could have done +2 more reps, perhaps even +3',
    3:
      t('workoutLogger.rirDescriptions.3') ||
      'Definitely could have done +3 more reps',
    3.5:
      t('workoutLogger.rirDescriptions.3.5') ||
      'Could have done +3 more reps, perhaps even +4',
    4:
      t('workoutLogger.rirDescriptions.4') ||
      'Definitely could have done +4 more reps',
    4.5:
      t('workoutLogger.rirDescriptions.4.5') ||
      'Could have done +4 more reps, perhaps even +5',
    5:
      t('workoutLogger.rirDescriptions.5') ||
      'Definitely could have done +5 more reps',
  };

  // Timer State
  const [restRemaining, setRestRemaining] = useState<number>(0);
  const timerRef = useRef<any>(null);

  const exercises = plan?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  const { data: recommendation, isLoading: isLoadingRecommendation } =
    useWeightRecommendation(
      auth.user?.id || '',
      currentExercise?.workoutDayExerciseId || currentExercise?.id || '',
    );
  const isLastSet =
    currentExercise && currentSetIndex === (currentExercise.sets || 1) - 1;

  // Prepare previous stats for display (placeholder)
  const previousBestSet = recommendation?.basedOn?.length
    ? recommendation.basedOn.reduce((best: any, current: any) => {
        if (
          current.weight > best.weight ||
          (current.weight === best.weight && current.reps > best.reps)
        ) {
          return current;
        }
        return best;
      }, recommendation.basedOn[0])
    : null;

  // Session timer (UI ONLY)
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize per-set inputs when exercise changes
  useEffect(() => {
    if (currentExercise) {
      setReps(currentExercise.reps?.toString() || '10');
      setWeight(currentExercise.weight?.toString() || '0');
      setRir(0);
    }
  }, [currentExerciseIndex]);

  // Rest Timer logic
  useEffect(() => {
    if (restRemaining > 0) {
      timerRef.current = setInterval(() => {
        setRestRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Add rest to totalRestTime
            if (restStartTime) {
              const actualDuration = Math.round(
                (Date.now() - restStartTime) / 1000,
              );
              setTotalRestTime((val) => val + actualDuration);
              setRestStartTime(null);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restRemaining, restStartTime]);

  if (!isOpen || !plan) return null;

  const handleLogSet = () => {
    if (!currentExercise) return;

    // Collect set data
    const setLog: any = {
      setNumber: currentSetIndex + 1,
      reps: parseInt(reps, 10) || 0,
      weight: parseFloat(weight) || 0,
    };

    const rirVal = rir;
    if (!isNaN(rirVal)) {
      setLog.rir = rirVal;
    }

    const newSets = [...currentExerciseSets, setLog];
    setCurrentExerciseSets(newSets);

    // Start rest timer
    const restDuration = currentExercise.restSeconds || 60;
    setRestRemaining(restDuration);
    setRestStartTime(Date.now());
    // Advance to next set or exercise
    if (isLastSet) {
      const finalizedExercise: any = {
        exerciseId: currentExercise.exerciseId || currentExercise.id,
        order: currentExerciseIndex + 1,
        startedAt: exerciseStartTime,
        finishedAt: new Date().toISOString(),
        sets: newSets,
      };
      setLoggedExercises((prev) => [...prev, finalizedExercise]);

      if (isLastExercise) {
        setIsFinished(true);
      } else {
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSetIndex(0);
        setCurrentExerciseSets([]);
        setExerciseStartTime(new Date().toISOString());
      }
    } else {
      setCurrentSetIndex((prev) => prev + 1);
    }

    toast({
      title: t('workoutLogger.setLogged') || 'Set Logged',
      description: `${currentExercise.name} - Set ${currentSetIndex + 1}`,
    });
  };

  const skipRest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (restStartTime) {
      const actualDuration = Math.round((Date.now() - restStartTime) / 1000);
      setTotalRestTime((val) => val + actualDuration);
      setRestStartTime(null);
    }
    setRestRemaining(0);
  };

  const handleFinishSession = async () => {
    const sessionPayload: any = {
      dayId: dayId,
      startedAt: sessionStartTime.toISOString(),
      finishedAt: new Date().toISOString(),
      exercises: loggedExercises,
    };

    const totalDuration = Math.round(
      (Date.now() - sessionStartTime.getTime()) / 1000,
    );
    if (totalDuration > 0) sessionPayload.totalDuration = totalDuration;
    if (totalRestTime > 0) sessionPayload.totalRestTime = totalRestTime;

    try {
      await createLogMutation.mutateAsync(sessionPayload);

      // Reset all state
      setCurrentExerciseIndex(0);
      setCurrentSetIndex(0);
      setWeight('');
      setReps('');
      setRir(0);
      setNotes('');
      setLoggedExercises([]);
      setRestRemaining(0);
      setSessionDuration(0);
      setTotalRestTime(0);
      setIsFinished(false);

      toast({
        title: t('workoutLogger.sessionLogged') || 'Workout Saved',
        description:
          t('workoutLogger.sessionLoggedDesc') ||
          'Your progress has been updated.',
      });
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description:
          t('workoutLogger.logError') || 'Failed to save workout session.',
        variant: 'destructive',
      });
    }
  };

  const handlePreviousSet = () => {
    if (currentSetIndex > 0) {
      // Go back to previous set in same exercise
      setCurrentSetIndex(currentSetIndex - 1);
    } else if (currentExerciseIndex > 0) {
      // Go back to last set of previous exercise
      const prevExercise = exercises[currentExerciseIndex - 1];
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentSetIndex(prevExercise.sets - 1);
    }
  };

  const canGoBack = currentExerciseIndex > 0 || currentSetIndex > 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (exercises.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div className="bg-card w-full max-w-md p-8 rounded-2xl text-center border border-border/50">
          <Dumbbell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">
            {t('workoutLogger.noExercises') || 'No Exercises'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('workoutLogger.noExercisesDesc') ||
              'This day has no exercises assigned.'}
          </p>
          <Button onClick={onClose} className="w-full">
            {t('common.close')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-4 overflow-hidden"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl h-full md:h-[90vh] bg-card border-t md:border border-border/50 md:rounded-2xl shadow-2xl flex flex-col relative"
        >
          {/* Header */}
          <div className="p-4 border-b border-border/30 flex items-center justify-between bg-primary/5">
            <div>
              <h2 className="font-heading text-lg font-bold truncate max-w-[200px] md:max-w-md">
                {plan.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <p>
                  {t('workoutLogger.exercise')} {currentExerciseIndex + 1} of{' '}
                  {exercises.length}
                </p>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-1 font-mono">
                  <Timer className="w-3 h-3" />
                  {formatTime(sessionDuration)}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!isFinished ? (
            <div className="flex-1 overflow-y-auto flex flex-col">
              {/* Exercise Info */}
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted border border-border/30 shrink-0">
                    {currentExercise.gifUrl ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL_FOR_ASSETS}${currentExercise.gifUrl}`}
                        alt={currentExercise.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Dumbbell className="w-full h-full p-6 text-muted-foreground/20" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {currentExercise.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">
                        {currentExercise.sets}{' '}
                        {t('workoutPlans.dayManager.sets')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary-foreground text-xs font-semibold">
                        {currentExercise.reps}{' '}
                        {t('workoutPlans.dayManager.reps')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-xl border border-border/30 mb-8">
                  {/* Recommendation Badge */}
                  {!isLoadingRecommendation && recommendation && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20"
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-primary">
                            {t('workoutLogger.recommended') || 'Recommended'}:{' '}
                            {recommendation.suggestedWeight !== null
                              ? `${
                                  recommendation.recommendationType === 'deload'
                                    ? Math.floor(
                                        recommendation.suggestedWeight / 2.5,
                                      ) * 2.5
                                    : Math.ceil(
                                        recommendation.suggestedWeight / 2.5,
                                      ) * 2.5
                                }kg`
                              : t('workoutLogger.bodyweight') ||
                                'Bodyweight'}{' '}
                            x {recommendation.suggestedReps}{' '}
                            {t('workoutPlans.dayManager.reps')}
                          </p>
                          {recommendation.reason && (
                            <p className="text-muted-foreground text-xs mt-1">
                              {recommendation.reason ===
                              'Repeated RIR 0 without progress'
                                ? t(
                                    'workoutLogger.recommendation.reasons.repeatedRIR0',
                                  )
                                : recommendation.reason}
                            </p>
                          )}
                          {recommendation.stalledGrindingStreak > 0 && (
                            <p className="text-yellow-600 dark:text-yellow-500 text-xs mt-1 font-medium">
                              ⚠️{' '}
                              {t('workoutLogger.recommendation.stalledStreak', {
                                count: recommendation.stalledGrindingStreak,
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-primary italic uppercase tracking-wider">
                      {t('workoutLogger.currentSet') || 'Current Set'}:{' '}
                      {currentSetIndex + 1} / {currentExercise.sets}
                    </span>
                    {restRemaining > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground animate-pulse">
                        <Timer className="w-4 h-4" />
                        <span className="font-mono font-bold">
                          {formatTime(restRemaining)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Weight and Reps Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase font-bold flex flex-col justify-end gap-1 h-8">
                          <span>
                            {t('workoutLogger.weight') || 'Weight (kg)'}
                          </span>
                          {previousBestSet?.weight !== undefined &&
                            previousBestSet?.weight !== null && (
                              <span className="text-[10px] text-primary/80 normal-case font-normal block">
                                {t('common.previous') || 'Prev'}:{' '}
                                {previousBestSet.weight}kg
                              </span>
                            )}
                        </label>
                        <Input
                          type="number"
                          step="0.5"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="text-center font-bold text-lg h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase font-bold flex flex-col justify-end gap-1 h-8">
                          <span>{t('workoutLogger.reps') || 'Reps'}</span>
                          {previousBestSet?.reps !== undefined &&
                            previousBestSet?.reps !== null && (
                              <span className="text-[10px] text-primary/80 normal-case font-normal block">
                                {t('common.previous') || 'Prev'}:{' '}
                                {previousBestSet.reps}
                              </span>
                            )}
                        </label>
                        <Input
                          type="number"
                          value={reps}
                          onChange={(e) => setReps(e.target.value)}
                          className="text-center font-bold text-lg h-12"
                        />
                      </div>
                    </div>

                    {/* RIR Slider - Full Width */}
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase font-bold flex flex-col justify-end gap-1 h-8">
                        <span>{t('workoutLogger.rir') || 'RIR'}</span>
                        {recommendation?.basedOn?.some(
                          (s) => s.rir !== undefined && s.rir !== null,
                        ) &&
                          previousBestSet?.rir !== undefined && (
                            <span className="text-[10px] text-primary/80 normal-case font-normal block">
                              {t('common.previous') || 'Prev'}:{' '}
                              {previousBestSet.rir}
                            </span>
                          )}
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-2xl font-bold text-primary">
                            {rir}
                          </span>
                        </div>
                        <Slider
                          value={[rir]}
                          onValueChange={(value) => setRir(value[0])}
                          min={0}
                          max={5}
                          step={0.5}
                          className="w-full"
                        />
                        <p className="text-xs text-center text-muted-foreground italic min-h-[2.5rem] flex items-center justify-center">
                          {rirDescriptions[rir] || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-auto">
                  {canGoBack && (
                    <Button
                      onClick={handlePreviousSet}
                      variant="outline"
                      className="w-full h-12 text-sm border-muted-foreground/30"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                      {t('common.previous') || 'Previous Set'}
                    </Button>
                  )}

                  {restRemaining > 0 ? (
                    <Button
                      onClick={skipRest}
                      variant="outline"
                      className="w-full h-14 text-lg border-primary/30"
                    >
                      {t('workoutLogger.skipRest') || 'Skip Rest'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleLogSet}
                      className="w-full h-14 text-lg btn-pharaoh shadow-lg"
                      disabled={createLogMutation.isPending}
                    >
                      {createLogMutation.isPending ? (
                        <span className="animate-spin mr-2">⏳</span>
                      ) : (
                        <Check className="w-6 h-6 mr-2" />
                      )}
                      {t('workoutLogger.logSet') || 'Log Set'}
                    </Button>
                  )}

                  <EgyptianDivider />

                  <div className="flex items-center justify-between text-muted-foreground px-2">
                    <span className="text-sm">
                      {t('workoutLogger.nextUp') || 'Next Up'}:
                    </span>
                    <span className="text-sm font-bold truncate ml-2 max-w-[150px]">
                      {isLastSet && isLastExercise
                        ? t('workoutLogger.finish')
                        : isLastSet
                          ? exercises[currentExerciseIndex + 1]?.name
                          : `${currentExercise.name} - Set ${currentSetIndex + 2}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-primary/5 to-transparent">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-8 border-4 border-primary/30"
              >
                <Award className="w-16 h-16 text-primary" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-gradient-gold">
                {t('workoutLogger.wellDone') || 'Well Done!'}
              </h2>
              <p className="text-muted-foreground mb-12 max-w-md text-lg">
                {t('workoutLogger.completionDesc') ||
                  'You have successfully completed your workout for today. Keep up the consistency!'}
              </p>

              <Button
                onClick={handleFinishSession}
                className="w-full max-w-md h-14 text-lg btn-pharaoh"
                disabled={createLogMutation.isPending}
              >
                {createLogMutation.isPending ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : null}
                {t('workoutLogger.viewSummary') || 'Done'}
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkoutLogger;
