import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Plus,
  Trash2,
  Calendar,
  Utensils,
  ChevronDown,
  ChevronUp,
  Clock,
  Apple,
  Edit2,
  MoreVertical,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NutritionPlan,
  NutritionDay,
  NutritionMeal,
  NutritionDayFood,
  Food,
} from '@/types/entities';
import { NutritionMealResponseDto } from '@/types/nutrition-plans';
import {
  useNutritionDays,
  useAddNutritionDay,
  useUpdateNutritionDay,
  useDeleteNutritionDay,
  useNutritionMeals,
  useAddNutritionMeal,
  useUpdateNutritionMeal,
  useDeleteNutritionMeal,
  useAddFoodToMeal,
  useDeleteNutritionMealFood,
} from '@/hooks/useNutritionPlans';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import FoodSelector from './FoodSelector';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface NutritionDayManagerProps {
  plan: NutritionPlan;
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

const NutritionDayManager = ({ plan }: NutritionDayManagerProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { auth } = useAuth();
  const isTrainer = auth?.user?.role === 'trainer';

  const { data: days = [], isLoading } = useNutritionDays(plan.id);
  const addDayMutation = useAddNutritionDay();
  const deleteDayMutation = useDeleteNutritionDay();

  const addMealMutation = useAddNutritionMeal();
  const updateMealMutation = useUpdateNutritionMeal();
  const deleteMealMutation = useDeleteNutritionMeal();

  const addFoodMutation = useAddFoodToMeal();
  const deleteFoodMutation = useDeleteNutritionMealFood();

  const [isAddingDay, setIsAddingDay] = useState(false);
  const [newDayName, setNewDayName] = useState('');
  const [newDayIndex, setNewDayIndex] = useState(0);

  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [isFoodSelectorOpen, setIsFoodSelectorOpen] = useState(false);
  const [activeMealId, setActiveMealId] = useState<string | null>(null);

  // Meal Dialog State
  const [isMealDialogOpen, setIsMealDialogOpen] = useState(false);
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('08:00');

  const toggleDay = (dayId: string) => {
    setExpandedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const handleAddDay = async () => {
    if (!newDayName) return;
    try {
      await addDayMutation.mutateAsync({
        planId: plan.id,
        dto: { name: newDayName, dayIndex: newDayIndex, planId: plan.id },
      });
      setNewDayName('');
      setNewDayIndex(0);
      setIsAddingDay(false);
      toast({
        title: t('common.success'),
        description: t('nutrition.createModal.createSuccess'),
      });
    } catch (e) {
      toast({ title: t('common.error.title'), variant: 'destructive' });
    }
  };

  const handleOpenMealDialog = (dayId: string, meal?: NutritionMeal) => {
    setActiveDayId(dayId);
    if (meal) {
      setEditingMealId(meal.id);
      setMealName(meal.name);
      setMealTime(meal.time || '08:00');
    } else {
      setEditingMealId(null);
      setMealName('');
      setMealTime('08:00');
    }
    setIsMealDialogOpen(true);
  };

  const handleSaveMeal = async () => {
    if (!mealName || !activeDayId) return;

    try {
      if (editingMealId) {
        await updateMealMutation.mutateAsync({
          mealId: editingMealId,
          dto: {
            name: mealName,
            time: mealTime,
            nutritionDayId: activeDayId,
            orderIndex: 0, // Keep current
          },
        });
        toast({
          title: t('common.success'),
          description: t('nutrition.createModal.updateSuccess'),
        });
      } else {
        const day = days.find((d) => d.id === activeDayId);
        const orderIndex = day?.meals?.length || 0;
        await addMealMutation.mutateAsync({
          dayId: activeDayId,
          dto: {
            nutritionDayId: activeDayId,
            name: mealName,
            orderIndex,
            time: mealTime,
          },
        });
        toast({
          title: t('common.success'),
          description: t('nutrition.createModal.createSuccess'),
        });
      }
      setIsMealDialogOpen(false);
    } catch (e) {
      toast({ title: t('common.error.title'), variant: 'destructive' });
    }
  };

  const handleMoveMeal = async (
    dayId: string,
    mealId: string,
    direction: 'up' | 'down',
    currentMeals: NutritionMealResponseDto[],
  ) => {
    if (!currentMeals) return;

    const meals = [...currentMeals].sort((a, b) => a.orderIndex - b.orderIndex);
    const currentIndex = meals.findIndex((m) => m.id === mealId);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= meals.length) return;

    const currentMeal = meals[currentIndex];
    const targetMeal = meals[targetIndex];

    try {
      // Swap order indices - backend handles the swap automatically when one index is updated
      await updateMealMutation.mutateAsync({
        mealId: currentMeal.id,
        dto: {
          orderIndex: targetMeal.orderIndex,
          nutritionDayId: dayId,
          name: currentMeal.name,
        },
      });
    } catch (e) {
      toast({
        title: t('common.error.title'),
        description: t('workoutPlans.dayManager.reorderError'),
        variant: 'destructive',
      });
    }
  };

  const [nextOrderIndex, setNextOrderIndex] = useState(0);

  const openFoodSelector = (mealId: string, currentFoodCount: number = 0) => {
    setActiveMealId(mealId);
    setNextOrderIndex(currentFoodCount);
    setIsFoodSelectorOpen(true);
  };

  const handleFoodSelect = async (
    food: Food,
    quantity: number,
    unit: string,
    orderIndex: number,
  ) => {
    if (!activeMealId) return;
    try {
      await addFoodMutation.mutateAsync({
        mealId: activeMealId,
        foodId: food.id,
        quantity,
        unit,
        orderIndex,
      });
      toast({
        title: t('common.success'),
        description: `${food.name} ${t('common.added')}`,
      });
    } catch (e) {
      toast({ title: t('common.error.title'), variant: 'destructive' });
    }
  };

  if (isLoading) return <div>{t('common.loading')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          {t('nutrition.planDays')}
        </h2>
        {isTrainer && (
          <Button onClick={() => setIsAddingDay(true)} className="btn-pharaoh">
            <Plus className="w-4 h-4 mr-2" />
            {t('nutrition.addDay')}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isAddingDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <EgyptianCard className="p-4 border-dashed border-primary/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('nutrition.dayName')}</Label>
                  <Input
                    value={newDayName}
                    onChange={(e) => setNewDayName(e.target.value)}
                    placeholder="e.g., Training Day, Rest Day"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('nutrition.dayOfWeek')}</Label>
                  <select
                    value={newDayIndex}
                    onChange={(e) => setNewDayIndex(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background"
                  >
                    {DAYS_OF_WEEK.map((day, index) => (
                      <option key={day} value={index}>
                        {t(`common.days.${day.toLowerCase()}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddDay} className="flex-1 btn-pharaoh">
                  {t('common.save')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingDay(false)}
                  className="flex-1"
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </EgyptianCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {days
          .sort((a, b) => a.dayIndex - b.dayIndex)
          .map((day) => (
            <EgyptianCard key={day.id} className="overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleDay(day.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">
                      {day.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        `common.days.${DAYS_OF_WEEK[day.dayIndex].toLowerCase()}`,
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="bg-muted/30">
                      {day.meals?.length || 0} {t('nutrition.meals')}
                    </Badge>
                    {day.totals && (
                      <div className="flex items-center gap-2 text-[10px] font-medium">
                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                          {day.totals.calories} kcal
                        </span>
                        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500">
                          P: {day.totals.protein}g
                        </span>
                        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-green-500/10 text-green-500">
                          C: {day.totals.carbs}g
                        </span>
                        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500">
                          F: {day.totals.fat}g
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isTrainer && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDayMutation.mutate(day.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                  {expandedDays[day.id] ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              <AnimatePresence>
                {expandedDays[day.id] && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="border-t border-border/30 overflow-hidden"
                  >
                    <DayMealsList
                      dayId={day.id}
                      onOpenMealDialog={handleOpenMealDialog}
                      onOpenFoodSelector={openFoodSelector}
                      onMoveMeal={handleMoveMeal}
                      isTrainer={isTrainer}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </EgyptianCard>
          ))}

        {days.length === 0 && (
          <div className="text-center py-20 bg-muted/10 rounded-2xl border-2 border-dashed border-border/50">
            <Utensils className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              {t('nutrition.noDaysDescription')}
            </p>
          </div>
        )}
      </div>

      <FoodSelector
        isOpen={isFoodSelectorOpen}
        onClose={() => {
          setIsFoodSelectorOpen(false);
          setActiveMealId(null);
        }}
        onSelect={handleFoodSelect}
        initialOrderIndex={nextOrderIndex}
      />

      {/* Add/Edit Meal Dialog */}
      <Dialog open={isMealDialogOpen} onOpenChange={setIsMealDialogOpen}>
        <DialogContent className="bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingMealId ? t('nutrition.editMeal') : t('nutrition.addMeal')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('nutrition.mealName')}</Label>
              <Input
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="e.g., Breakfast, Post-Workout"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('nutrition.mealTime')}</Label>
              <Input
                type="time"
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMealDialogOpen(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSaveMeal} className="btn-pharaoh">
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface DayMealsListProps {
  dayId: string;
  onOpenMealDialog: (dayId: string, meal?: NutritionMeal) => void;
  onOpenFoodSelector: (mealId: string, currentFoodCount?: number) => void;
  onMoveMeal: (
    dayId: string,
    mealId: string,
    direction: 'up' | 'down',
    currentMeals: NutritionMealResponseDto[],
  ) => Promise<void>;
  isTrainer: boolean;
}

const DayMealsList = ({
  dayId,
  onOpenMealDialog,
  onOpenFoodSelector,
  onMoveMeal,
  isTrainer,
}: DayMealsListProps) => {
  const { t } = useTranslation();
  const { data: meals = [], isLoading } = useNutritionMeals(dayId);
  const deleteMealMutation = useDeleteNutritionMeal();
  const deleteFoodMutation = useDeleteNutritionMealFood();

  if (isLoading)
    return (
      <div className="p-8 text-center">
        <Utensils className="w-8 h-8 mx-auto mb-2 text-primary animate-pulse" />
        <p className="text-xs text-muted-foreground">{t('common.loading')}</p>
      </div>
    );

  return (
    <div className="p-4 space-y-4 bg-muted/5">
      {meals
        ?.sort((a, b) => a.orderIndex - b.orderIndex)
        .map((meal, index, array) => (
          <div key={meal.id} className="space-y-3">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                {/* Reorder Controls */}
                {isTrainer && (
                  <div className="flex flex-col gap-1 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                      onClick={() => onMoveMeal(dayId, meal.id, 'up', meals)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                      onClick={() => onMoveMeal(dayId, meal.id, 'down', meals)}
                      disabled={index === array.length - 1}
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold text-foreground">
                      {meal.time}
                    </span>
                    <span className="font-heading font-semibold">
                      {meal.name}
                    </span>
                  </div>
                  {meal.totals && (
                    <div className="flex items-center gap-3 mt-1 pl-6">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        {meal.totals.calories} kcal
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-medium">
                        P: {meal.totals.protein}g
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 font-medium">
                        C: {meal.totals.carbs}g
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-medium">
                        F: {meal.totals.fat}g
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {isTrainer && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-primary/30 text-primary"
                    onClick={() =>
                      onOpenFoodSelector(meal.id, meal.foods?.length || 0)
                    }
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {t('nutrition.addFood')}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onOpenMealDialog(dayId, meal)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        {t('common.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteMealMutation.mutate(meal.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Foods in meal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-12">
              {meal.foods?.map((mealFood) => {
                const macros = mealFood.food?.macros;

                // Calculate multiplier based on unit and serving
                let unitFactor = 1;
                if (
                  mealFood.unit !== 'g' &&
                  mealFood.unit !== 'ml' &&
                  mealFood.food?.serving
                ) {
                  const s = mealFood.food.serving as any;
                  if (
                    s.common &&
                    s.metric &&
                    s.metric.unit === 'g' &&
                    s.common.unit === mealFood.unit
                  ) {
                    unitFactor = s.metric.quantity / s.common.quantity;
                  }
                }
                const multiplier = (mealFood.quantity * unitFactor) / 100;

                return (
                  <div
                    key={mealFood.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/30 group/food"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                        <Apple className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {mealFood.food?.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground">
                            {mealFood.quantity} {mealFood.unit}
                          </p>
                          {macros && (
                            <span className="text-[10px] text-muted-foreground/50">
                              • {macros.calories * multiplier} kcal
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isTrainer && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover/food:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                        onClick={() => deleteFoodMutation.mutate(mealFood.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                );
              })}
              {(!meal.foods || meal.foods.length === 0) && (
                <p className="text-xs text-muted-foreground italic py-2">
                  {t('nutrition.noFoodsInMeal')}
                </p>
              )}
            </div>
            <EgyptianDivider className="opacity-30" />
          </div>
        ))}

      {isTrainer && (
        <Button
          variant="outline"
          className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/5"
          onClick={() => onOpenMealDialog(dayId)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('nutrition.addMeal')}
        </Button>
      )}
    </div>
  );
};

export default NutritionDayManager;
