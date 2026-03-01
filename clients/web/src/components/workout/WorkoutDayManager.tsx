import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Dumbbell,
  ArrowUp,
  ArrowDown,
  Play,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { WorkoutPlan, WorkoutDayExercise, Exercise } from '@/types/entities';
import WorkoutLogger from './WorkoutLogger';
import {
  CreateWorkoutDayExerciseDto,
  UpdateWorkoutDayExerciseDto,
  WorkoutDayResponseDto,
} from '@/types/workout-plans';
import {
  useWorkoutDays,
  useAddWorkoutDay,
  useUpdateWorkoutDay,
  useDeleteWorkoutDay,
  useAddExerciseToWorkoutDay,
  useUpdateWorkoutDayExercise,
  useDeleteWorkoutDayExercise,
} from '@/hooks/useWorkoutPlans';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import ExerciseSelector from './ExerciseSelector';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface WorkoutDayManagerProps {
  plan: WorkoutPlan;
  isTrainer: boolean;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const WorkoutDayManager = ({ plan, isTrainer }: WorkoutDayManagerProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: workoutDays = [], isLoading } = useWorkoutDays(plan.id);
  const addDayMutation = useAddWorkoutDay();
  const updateDayMutation = useUpdateWorkoutDay();
  const deleteDayMutation = useDeleteWorkoutDay();
  const addExerciseMutation = useAddExerciseToWorkoutDay();
  const updateExerciseMutation = useUpdateWorkoutDayExercise();
  const deleteExerciseMutation = useDeleteWorkoutDayExercise();

  const [isAddingDay, setIsAddingDay] = useState(false);
  const [newDayName, setNewDayName] = useState('');
  const [newDayIndex, setNewDayIndex] = useState(0);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [activeDayForLogger, setActiveDayForLogger] = useState<any | null>(
    null,
  );
  const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState(false);

  // Edit Exercise State
  const [exerciseToEdit, setExerciseToEdit] =
    useState<WorkoutDayExercise | null>(null);
  const [editSets, setEditSets] = useState(3);
  const [editRepsMin, setEditRepsMin] = useState(8);
  const [editRepsMax, setEditRepsMax] = useState(12);
  const [editRestSeconds, setEditRestSeconds] = useState(60);

  const handleAddDay = async () => {
    if (!newDayName) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.dayManager.dayNamePlaceholder'),
        variant: 'destructive',
      });
      return;
    }

    try {
      await addDayMutation.mutateAsync({
        planId: plan.id,
        dto: {
          name: newDayName,
          dayIndex: newDayIndex,
        },
      });
      toast({
        title: t('common.yes'),
        description: t('workoutPlans.dayManager.addDaySuccess'),
      });

      setIsAddingDay(false);
      setNewDayName('');
      setNewDayIndex(0);
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.dayManager.addDayError'),
        variant: 'destructive',
      });
    }
  };

  const handleDeleteDay = async (dayId: string) => {
    try {
      await deleteDayMutation.mutateAsync(dayId);
      toast({
        title: t('common.yes'),
        description: t('workoutPlans.dayManager.deleteDaySuccess'),
      });
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.dayManager.deleteDayError'),
        variant: 'destructive',
      });
    }
  };

  const handleAddExercise = (dayId: string) => {
    setSelectedDayId(dayId);
    setIsExerciseSelectorOpen(true);
  };

  const handleExerciseSelect = async (
    exercise: Exercise,
    config: Omit<CreateWorkoutDayExerciseDto, 'exerciseId' | 'orderIndex'>,
  ) => {
    if (!selectedDayId) return;

    const selectedDay = workoutDays.find((d) => d.id === selectedDayId);
    const orderIndex = (selectedDay?.exercises?.length || 0) + 1;

    try {
      await addExerciseMutation.mutateAsync({
        dayId: selectedDayId,
        dto: {
          exerciseId: exercise.id,
          orderIndex,
          ...config,
        },
      });
      toast({
        title: t('common.yes'),
        description: `${exercise.name} ${t('common.add') ?? 'added'}`,
      });
    } catch (error) {
      toast({
        title: t('error.title'),
        description:
          t('workoutPlans.dayManager.addExerciseError') ||
          'Failed to add exercise',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    try {
      await deleteExerciseMutation.mutateAsync(exerciseId);
      toast({
        title: t('common.yes'),
        description: t('workoutPlans.dayManager.removeExerciseSuccess'),
      });
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.dayManager.removeExerciseError'),
        variant: 'destructive',
      });
    }
  };

  const handleMoveExercise = async (
    dayId: string,
    exerciseId: string,
    direction: 'up' | 'down',
  ) => {
    const day = workoutDays.find((d) => d.id === dayId);
    if (!day || !day.exercises) return;

    const exercises = [...day.exercises].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
    const currentIndex = exercises.findIndex((e) => e.id === exerciseId);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= exercises.length) return;

    const currentExercise = exercises[currentIndex];
    const targetExercise = exercises[targetIndex];

    try {
      // Swap order indices
      await Promise.all([
        updateExerciseMutation.mutateAsync({
          id: currentExercise.id,
          dto: { orderIndex: targetExercise.orderIndex },
        }),
      ]);
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.dayManager.reorderError'),
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (exercise: WorkoutDayExercise) => {
    setExerciseToEdit(exercise);
    setEditSets(exercise.sets);
    setEditRepsMin(exercise.repsMin);
    setEditRepsMax(exercise.repsMax);
    setEditRestSeconds(exercise.restSeconds || 60);
  };

  const handleUpdateExercise = async () => {
    if (!exerciseToEdit) return;

    try {
      await updateExerciseMutation.mutateAsync({
        id: exerciseToEdit.id,
        dto: {
          sets: editSets,
          repsMin: editRepsMin,
          repsMax: editRepsMax,
          restSeconds: editRestSeconds,
        },
      });

      setExerciseToEdit(null);
      toast({
        title: t('common.yes'),
        description: t('workoutPlans.dayManager.updateExerciseSuccess'),
      });
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('workoutPlans.dayManager.updateExerciseError'),
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {t('workoutPlans.pageDetails.loadingPlan')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {t('workoutPlans.pageDetails.workoutDays')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('workoutPlans.pageDetails.manageDaysDesc')}
          </p>
        </div>

        {isTrainer && (
          <Button
            onClick={() => setIsAddingDay(true)}
            className="btn-pharaoh"
            disabled={isAddingDay}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('workoutPlans.pageDetails.addDay')}
          </Button>
        )}
      </div>

      {/* Add Day Form */}
      {isAddingDay && (
        <EgyptianCard>
          <h3 className="font-heading text-lg font-semibold mb-4">
            {t('workoutPlans.dayManager.addNewDay')}
          </h3>

          <div className="space-y-4">
            <div>
              <Label>{t('workoutPlans.dayManager.dayName')}</Label>
              <Input
                value={newDayName}
                onChange={(e) => setNewDayName(e.target.value)}
                placeholder={t('workoutPlans.dayManager.dayNamePlaceholder')}
                className="mt-2"
              />
            </div>

            <div>
              <Label>{t('workoutPlans.dayManager.dayOfWeek')}</Label>
              <select
                value={newDayIndex}
                onChange={(e) => setNewDayIndex(parseInt(e.target.value))}
                className="w-full mt-2 px-3 py-2 rounded-md border border-border bg-background"
              >
                {DAYS_OF_WEEK.map((day, index) => (
                  <option key={day} value={index}>
                    {t(`common.days.${day.toLowerCase()}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddDay} className="flex-1 btn-pharaoh">
                {t('workoutPlans.dayManager.addDay')}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingDay(false);
                  setNewDayName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </EgyptianCard>
      )}

      {/* Workout Days List */}
      {workoutDays.length > 0 ? (
        <div className="space-y-4">
          {workoutDays
            .sort((a, b) => a.dayIndex - b.dayIndex)
            .map((day) => (
              <EgyptianCard key={day.id}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">
                        {day.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {DAYS_OF_WEEK[day.dayIndex]}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!isTrainer && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setActiveDayForLogger(day)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Play className="w-4 h-4 mr-1 fill-current" />
                        {t('workoutPlans.dayManager.startWorkout') ||
                          'Start Workout'}
                      </Button>
                    )}

                    {isTrainer && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddExercise(day.id)}
                          className="border-primary/30 text-primary hover:bg-primary/10"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          {t('workoutPlans.dayManager.addExercise')}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDay(day.id)}
                          className="border-destructive/30 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <EgyptianDivider />

                {/* Exercises */}
                {day.exercises && day.exercises.length > 0 ? (
                  <div className="space-y-3 mt-4">
                    {day.exercises
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((dayExercise, index, array) => (
                        <div
                          key={dayExercise.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                            {index + 1}
                          </span>

                          <div className="flex flex-col gap-1 shrink-0">
                            {isTrainer && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleMoveExercise(
                                      day.id,
                                      dayExercise.id,
                                      'up',
                                    )
                                  }
                                  disabled={index === 0}
                                  className="h-6 w-6 p-0 hover:bg-primary/10"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleMoveExercise(
                                      day.id,
                                      dayExercise.id,
                                      'down',
                                    )
                                  }
                                  disabled={index === array.length - 1}
                                  className="h-6 w-6 p-0 hover:bg-primary/10"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>

                          <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0 border border-border/30">
                            {dayExercise.exercise.gifUrl ? (
                              <img
                                src={`${import.meta.env.VITE_BASE_URL_FOR_ASSETS}${dayExercise.exercise.gifUrl}`}
                                alt={dayExercise.exercise.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Dumbbell className="w-full h-full p-4 text-muted-foreground/30" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-semibold truncate">
                              {dayExercise.exercise.name}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {dayExercise.sets}{' '}
                                {t('workoutPlans.dayManager.sets')}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {dayExercise.repsMin}-{dayExercise.repsMax}{' '}
                                {t('workoutPlans.dayManager.reps')}
                              </Badge>
                              {dayExercise.restSeconds && (
                                <Badge variant="secondary" className="text-xs">
                                  {dayExercise.restSeconds}s{' '}
                                  {t('workoutPlans.dayManager.rest')}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {isTrainer && (
                            <div className="flex shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(dayExercise)}
                                className="text-muted-foreground hover:text-foreground hover:bg-muted"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteExercise(dayExercise.id)
                                }
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 mt-4">
                    <Dumbbell className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      {t('workoutPlans.dayManager.noExercises')}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => handleAddExercise(day.id)}
                      className="mt-2"
                    >
                      {t('workoutPlans.dayManager.addFirstExercise')}
                    </Button>
                  </div>
                )}
              </EgyptianCard>
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-heading text-lg font-bold mb-2">
            {t('workoutPlans.dayManager.noDays')}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('workoutPlans.dayManager.noDaysDesc')}
          </p>
          {isTrainer && (
            <Button
              onClick={() => setIsAddingDay(true)}
              className="btn-pharaoh"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('workoutPlans.dayManager.addFirstDay')}
            </Button>
          )}
        </div>
      )}

      {/* Workout Logger Modal */}
      <WorkoutLogger
        isOpen={!!activeDayForLogger}
        onClose={() => setActiveDayForLogger(null)}
        dayId={activeDayForLogger?.id || ''}
        plan={{
          ...plan,
          exercises: activeDayForLogger?.exercises?.map((de: any) => ({
            ...de.exercise,
            id: de.exerciseId,
            workoutDayExerciseId: de.id,
            sets: de.sets,
            reps: de.repsMin,
            weight: 0,
            restSeconds: de.restSeconds,
            dayId: activeDayForLogger.id,
          })),
        }}
      />

      {/* Exercise Selector Modal */}
      {isTrainer && (
        <ExerciseSelector
          isOpen={isExerciseSelectorOpen}
          onClose={() => {
            setIsExerciseSelectorOpen(false);
            setSelectedDayId(null);
          }}
          onSelect={handleExerciseSelect}
          selectedExerciseIds={
            selectedDayId
              ? workoutDays
                  .find((d) => d.id === selectedDayId)
                  ?.exercises?.map((e) => e.exerciseId) || []
              : []
          }
        />
      )}

      {/* Edit Exercise Modal */}
      <Dialog
        open={!!exerciseToEdit}
        onOpenChange={(open) => !open && setExerciseToEdit(null)}
      >
        <DialogContent className="sm:max-w-[425px] bg-card border-border/50">
          <DialogHeader>
            <DialogTitle>
              {t('workoutPlans.dayManager.editExercise')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                {t('workoutPlans.dayManager.sets')}
              </Label>
              <Input
                type="number"
                value={editSets}
                onChange={(e) => setEditSets(parseInt(e.target.value) || 0)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                {t('workoutPlans.dayManager.reps')} (Min)
              </Label>
              <Input
                type="number"
                value={editRepsMin}
                onChange={(e) => setEditRepsMin(parseInt(e.target.value) || 0)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                {t('workoutPlans.dayManager.reps')} (Max)
              </Label>
              <Input
                type="number"
                value={editRepsMax}
                onChange={(e) => setEditRepsMax(parseInt(e.target.value) || 0)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                {t('workoutPlans.dayManager.rest')} (s)
              </Label>
              <Input
                type="number"
                value={editRestSeconds}
                onChange={(e) =>
                  setEditRestSeconds(parseInt(e.target.value) || 0)
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateExercise} className="btn-pharaoh">
              {t('workoutPlans.dayManager.saveChanges')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutDayManager;
