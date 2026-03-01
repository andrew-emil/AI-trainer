import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Search,
  Filter,
  X,
  Plus,
  Check,
  ArrowLeft,
  Clock,
  Repeat,
  Hash,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Exercise } from '@/types/entities';
import { useInfiniteExercises, useExercise } from '@/hooks/useExercises';
import { useQuery } from '@tanstack/react-query';
import { findAllMuscles } from '@/services/muscles';
import { findAllBodyParts } from '@/services/body-parts';
import { findAllEquipments } from '@/services/equipments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateWorkoutDayExerciseDto } from '@/types/workout-plans';

interface ExerciseSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (
    exercise: Exercise,
    config: Omit<CreateWorkoutDayExerciseDto, 'exerciseId' | 'orderIndex'>,
  ) => void;
  selectedExerciseIds?: string[];
}

const ExerciseSelector = ({
  isOpen,
  onClose,
  onSelect,
  selectedExerciseIds = [],
}: ExerciseSelectorProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');

  const [muscleSearch, setMuscleSearch] = useState('');
  const [bodyPartSearch, setBodyPartSearch] = useState('');
  const [equipmentSearch, setEquipmentSearch] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteExercises({
      limit: 16,
      search: searchQuery,
      muscle: selectedMuscle,
      bodyPart: selectedBodyPart,
      equipment: selectedEquipment,
      enabled: isOpen,
    });

  const exercises = useMemo(() => {
    if (!data?.pages) return [];

    // If the first page is just an array and not a Paginated object,
    // it means the backend returned all exercises. We'll handle this
    // by slicing the data to respect the 16 items per page request.
    return data.pages.flatMap((page) => {
      const items = Array.isArray(page) ? page : page?.data || [];
      return items;
    });
  }, [data]);

  // Trust Tanstack Query's hasNextPage which now uses our refined hook logic
  const showLoadMore = hasNextPage;

  // Configuration State
  const [selectedExerciseIdForConfig, setSelectedExerciseIdForConfig] =
    useState<string | null>(null);

  // Fetch specific exercise details when selected for config
  const { data: selectedExerciseDetail, isLoading: isLoadingDetail } =
    useExercise(selectedExerciseIdForConfig || '');

  // Use the fetched detail if available, otherwise fallback (though detail is preferred)
  const selectedExerciseForConfig = selectedExerciseDetail;
  const [sets, setSets] = useState(3);
  const [repsMin, setRepsMin] = useState(8);
  const [repsMax, setRepsMax] = useState(12);
  const [restSeconds, setRestSeconds] = useState(60);

  // Fetch filter options independently
  const { data: muscles = [] } = useQuery({
    queryKey: ['muscles'],
    queryFn: async () => {
      const { data, error } = await findAllMuscles();
      if (error) throw error;
      return data || [];
    },
    enabled: isOpen,
  });

  const { data: bodyParts = [] } = useQuery({
    queryKey: ['body-parts'],
    queryFn: async () => {
      const { data, error } = await findAllBodyParts();
      if (error) throw error;
      return data || [];
    },
    enabled: isOpen,
  });

  const { data: equipments = [] } = useQuery({
    queryKey: ['equipments'],
    queryFn: async () => {
      const { data, error } = await findAllEquipments();
      if (error) throw error;
      return data || [];
    },
    enabled: isOpen,
  });

  const filterOptions = useMemo(
    () => ({
      muscles: muscles.map((m) => (typeof m === 'string' ? m : m.name)).sort(),
      bodyParts: bodyParts
        .map((bp) => (typeof bp === 'string' ? bp : bp.name))
        .sort(),
      equipments: equipments
        .map((eq) => (typeof eq === 'string' ? eq : eq.name))
        .sort(),
    }),
    [muscles, bodyParts, equipments],
  );

  const filteredFilterOptions = useMemo(
    () => ({
      muscles: filterOptions.muscles.filter((m) =>
        m.toLowerCase().includes(muscleSearch.toLowerCase()),
      ),
      bodyParts: filterOptions.bodyParts.filter((bp) =>
        bp.toLowerCase().includes(bodyPartSearch.toLowerCase()),
      ),
      equipments: filterOptions.equipments.filter((eq) =>
        eq.toLowerCase().includes(equipmentSearch.toLowerCase()),
      ),
    }),
    [filterOptions, muscleSearch, bodyPartSearch, equipmentSearch],
  );

  // Filter exercises based on search and filters (AND logic)
  // This performs local filtering on the result set provided by the server
  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      // 1. Muscle filter (local intersection if not the primary server filter)
      const matchesMuscle =
        selectedMuscle === 'all' ||
        exercise.targetMuscles.includes(selectedMuscle);

      // 2. Body part filter (local intersection if not the primary server filter)
      const matchesBodyPart =
        selectedBodyPart === 'all' ||
        exercise.bodyParts.includes(selectedBodyPart);

      // 3. Equipment filter (local intersection if not the primary server filter)
      const matchesEquipment =
        selectedEquipment === 'all' ||
        exercise.equipments.includes(selectedEquipment);

      // 4. Search filter (local intersection)
      const matchesSearch =
        !searchQuery ||
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesMuscle && matchesBodyPart && matchesEquipment && matchesSearch
      );
    });
  }, [
    exercises,
    selectedMuscle,
    selectedBodyPart,
    selectedEquipment,
    searchQuery,
  ]);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExerciseIdForConfig(exercise.id);
    // Reset defaults
    setSets(3);
    setRepsMin(8);
    setRepsMax(12);
    setRestSeconds(60);
  };

  const handleConfirmAdd = () => {
    if (selectedExerciseForConfig) {
      onSelect(selectedExerciseForConfig, {
        sets,
        repsMin,
        repsMax,
        restSeconds,
      });
      setSelectedExerciseIdForConfig(null);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMuscle('all');
    setSelectedBodyPart('all');
    setSelectedEquipment('all');
    setMuscleSearch('');
    setBodyPartSearch('');
    setEquipmentSearch('');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedMuscle !== 'all' ||
    selectedBodyPart !== 'all' ||
    selectedEquipment !== 'all';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl h-[90vh] max-h-[100vh] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 border-b border-border/30 p-6 bg-card z-10">
            <div className="flex items-center justify-between">
              {selectedExerciseForConfig ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedExerciseIdForConfig(null)}
                    className="hover:bg-muted/50 rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {t('workoutPlans.exerciseSelector.configure')}{' '}
                    {selectedExerciseForConfig.name}
                  </h2>
                </div>
              ) : (
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {t('workoutPlans.exerciseSelector.title')}
                </h2>
              )}

              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Show search/filters only when NOT in config mode */}
            {!selectedExerciseForConfig && (
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      'workoutPlans.exerciseSelector.searchPlaceholder',
                    )}
                    className="pl-12 bg-background/50 border-border/50 text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* filters for exercises */}
                  <Select
                    value={selectedMuscle}
                    onValueChange={(val) => {
                      setSelectedMuscle(val);
                      setMuscleSearch('');
                    }}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue
                        placeholder={t(
                          'workoutPlans.exerciseSelector.allMuscles',
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent className="h-[50vh] ">
                      <div className="p-2 sticky top-0 bg-popover z-10 border-b border-border/30 mb-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <Input
                            placeholder={t(
                              'workoutPlans.exerciseSelector.filterMuscles',
                            )}
                            value={muscleSearch}
                            onChange={(e) => setMuscleSearch(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="pl-7 h-8 text-xs bg-muted/50"
                          />
                        </div>
                      </div>
                      <SelectItem value="all">
                        {t('workoutPlans.exerciseSelector.allMuscles')}
                      </SelectItem>

                      {filteredFilterOptions.muscles.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedBodyPart}
                    onValueChange={(val) => {
                      setSelectedBodyPart(val);
                      setBodyPartSearch('');
                    }}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue
                        placeholder={t(
                          'workoutPlans.exerciseSelector.allBodyParts',
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent className="h-[50vh]">
                      <div className="p-2 sticky top-0 bg-popover z-10 border-b border-border/30 mb-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <Input
                            placeholder={t(
                              'workoutPlans.exerciseSelector.filterBodyParts',
                            )}
                            value={bodyPartSearch}
                            onChange={(e) => setBodyPartSearch(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="pl-7 h-8 text-xs bg-muted/50"
                          />
                        </div>
                      </div>
                      <SelectItem value="all">
                        {t('workoutPlans.exerciseSelector.allBodyParts')}
                      </SelectItem>

                      {filteredFilterOptions.bodyParts.map((bp) => (
                        <SelectItem key={bp} value={bp}>
                          {bp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedEquipment}
                    onValueChange={(val) => {
                      setSelectedEquipment(val);
                      setEquipmentSearch('');
                    }}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue
                        placeholder={t(
                          'workoutPlans.exerciseSelector.allEquipment',
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent className="h-[50vh]">
                      <div className="p-2 sticky top-0 bg-popover z-10 border-b border-border/30 mb-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <Input
                            placeholder={t(
                              'workoutPlans.exerciseSelector.filterEquipment',
                            )}
                            value={equipmentSearch}
                            onChange={(e) => setEquipmentSearch(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="pl-7 h-8 text-xs bg-muted/50"
                          />
                        </div>
                      </div>
                      <SelectItem value="all">
                        {t('workoutPlans.exerciseSelector.allEquipment')}
                      </SelectItem>

                      {filteredFilterOptions.equipments.map((eq) => (
                        <SelectItem key={eq} value={eq}>
                          {eq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Filter className="w-3 h-3 mr-1" />
                      {filteredExercises.length}{' '}
                      {t('workoutPlans.exerciseSelector.results')}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      {t('workoutPlans.exerciseSelector.clearFilters')}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content Area */}
          <ScrollArea className="flex-1 p-6 min-h-0 bg-background/50">
            {selectedExerciseIdForConfig ? (
              /* Configuration View */
              <div className="max-w-4xl mx-auto">
                {isLoadingDetail ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground animate-pulse">
                      {t('workoutPlans.exerciseSelector.loadingDetails')}
                    </p>
                  </div>
                ) : selectedExerciseForConfig ? (
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Exercise Preview (GIF) */}
                    <div className="flex-1">
                      <div className="aspect-square rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-border/50">
                        {selectedExerciseForConfig.gifUrl ? (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL_FOR_ASSETS}${selectedExerciseForConfig.gifUrl}`}
                            alt={selectedExerciseForConfig.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground flex flex-col items-center gap-2">
                            <Clock className="w-12 h-12 opacity-20" />
                            <span>
                              {t('workoutPlans.exerciseSelector.noPreview')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <h3 className="font-heading font-bold text-xl mb-2">
                          {selectedExerciseForConfig.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedExerciseForConfig.targetMuscles.map((m) => (
                            <Badge key={m} variant="secondary">
                              {m}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Configuration Controls */}
                    <div className="flex-1 space-y-6">
                      <div className="p-4 rounded-lg bg-card border border-border/50 shadow-sm">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="col-span-2">
                            <Label className="flex items-center gap-2 mb-2">
                              <Hash className="w-4 h-4 text-primary" />
                              {t('workoutPlans.exerciseSelector.sets')}
                            </Label>

                            <Input
                              type="number"
                              min={1}
                              value={sets}
                              onChange={(e) =>
                                setSets(
                                  Math.max(1, parseInt(e.target.value) || 0),
                                )
                              }
                              className="text-lg font-semibold text-center"
                            />
                          </div>

                          <div>
                            <Label className="flex items-center gap-2 mb-2">
                              <Repeat className="w-4 h-4 text-primary" />
                              {t('workoutPlans.exerciseSelector.repsMin')}
                            </Label>

                            <Input
                              type="number"
                              min={1}
                              value={repsMin}
                              onChange={(e) =>
                                setRepsMin(
                                  Math.max(1, parseInt(e.target.value) || 0),
                                )
                              }
                              className="text-lg font-semibold text-center"
                            />
                          </div>

                          <div>
                            <Label className="flex items-center gap-2 mb-2">
                              <Repeat className="w-4 h-4 text-primary" />
                              {t('workoutPlans.exerciseSelector.repsMax')}
                            </Label>

                            <Input
                              type="number"
                              min={1}
                              value={repsMax}
                              onChange={(e) =>
                                setRepsMax(
                                  Math.max(1, parseInt(e.target.value) || 0),
                                )
                              }
                              className="text-lg font-semibold text-center"
                            />
                          </div>

                          <div className="col-span-2">
                            <Label className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-primary" />
                              {t('workoutPlans.exerciseSelector.restTime')}
                            </Label>

                            <div className="flex items-center gap-4">
                              <Input
                                type="number"
                                min={0}
                                step={15}
                                value={restSeconds}
                                onChange={(e) =>
                                  setRestSeconds(
                                    Math.max(0, parseInt(e.target.value) || 0),
                                  )
                                }
                                className="text-lg font-semibold text-center"
                              />
                              <div className="flex gap-2">
                                {[30, 60, 90, 120].map((sec) => (
                                  <Button
                                    key={sec}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setRestSeconds(sec)}
                                    className={
                                      restSeconds === sec
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : ''
                                    }
                                  >
                                    {sec}s
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pt-4">
                        <Button
                          onClick={handleConfirmAdd}
                          className="w-full btn-pharaoh h-12 text-lg"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          {t('workoutPlans.exerciseSelector.addToWorkout')}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setSelectedExerciseIdForConfig(null)}
                          className="w-full"
                        >
                          {t('common.cancel')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {t('workoutPlans.exerciseSelector.notFound')}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => setSelectedExerciseIdForConfig(null)}
                    >
                      {t('workoutPlans.exerciseSelector.backToList')}
                    </Button>
                  </div>
                )}
              </div>
            ) : /* Exercise List View */
            isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t('workoutPlans.exerciseSelector.loadingExercises')}
                </p>
              </div>
            ) : filteredExercises.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map((exercise) => {
                    const isSelected = selectedExerciseIds.includes(
                      exercise.id,
                    );
                    return (
                      <motion.button
                        key={exercise.id}
                        onClick={() =>
                          setSelectedExerciseIdForConfig(exercise.id)
                        }
                        className={`text-left rounded-xl border transition-all overflow-hidden flex ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border/30 bg-muted/20 hover:border-primary/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* GIF */}
                        <div className="w-20 bg-muted/50 relative overflow-hidden">
                          {exercise.gifUrl ? (
                            <img
                              src={`${import.meta.env.VITE_BASE_URL_FOR_ASSETS}${exercise.gifUrl}`}
                              alt={exercise.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Clock className="w-6 h-6 opacity-10" />
                            </div>
                          )}

                          {/* Select Icon */}
                          <div
                            className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background/80 border border-border/50 text-muted-foreground'
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-4">
                          <h3 className="font-heading font-semibold mb-2 line-clamp-1">
                            {exercise.name}
                          </h3>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {exercise.targetMuscles
                              .slice(0, 3)
                              .map((muscle) => (
                                <Badge
                                  key={muscle}
                                  variant="outline"
                                  className="text-[10px] px-1.5 h-4"
                                >
                                  {muscle}
                                </Badge>
                              ))}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {exercise.equipments
                              .slice(0, 2)
                              .map((equipment) => (
                                <Badge
                                  key={equipment}
                                  variant="secondary"
                                  className="text-[10px] px-1.5 h-4"
                                >
                                  {equipment}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {hasNextPage && (
                  <div className="flex justify-center pb-8 mt-4">
                    <Button
                      onClick={() => {
                        console.log('Fetching next page...');
                        fetchNextPage();
                      }}
                      disabled={isFetchingNextPage}
                      variant="outline"
                      className="min-w-[200px] border-primary/30 hover:border-primary hover:bg-primary/5 bg-background shadow-sm shadow-primary/10"
                    >
                      {isFetchingNextPage ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span>{t('common.loading')}</span>
                        </div>
                      ) : (
                        t('workoutPlans.exerciseSelector.loadMore')
                      )}
                    </Button>
                  </div>
                )}

                {isFetchingNextPage && !hasNextPage && (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      {t('workoutPlans.exerciseSelector.allLoaded')}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">
                  {t('workoutPlans.exerciseSelector.noExercisesFound')}
                </p>
                <Button variant="link" onClick={clearFilters}>
                  {t('workoutPlans.exerciseSelector.clearAllFilters')}
                </Button>
              </div>
            )}
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExerciseSelector;
