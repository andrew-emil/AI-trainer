import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTraineeAssignedWorkoutPlans } from '@/hooks/useTrainee';
import { findWorkoutDaysByPlan } from '@/services/workout-plans';
import { addDays, format, parseISO, startOfWeek } from 'date-fns';
import { WorkoutDayResponseDto } from '@/types/workout-plans';
import {
  Meal,
  NutritionPlan,
  ScheduledWorkout,
  FoodItem,
} from '@/types/nutrition';
import { useTraineeWorkoutLogs } from '@/hooks/useWorkoutLogs';
import { AuthContext } from '@/contexts/AuthContext';

interface NutritionContextType {
  // Nutrition Plans
  nutritionPlans: NutritionPlan[];
  createNutritionPlan: (
    plan: Omit<
      NutritionPlan,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'totalCalories'
      | 'totalProtein'
      | 'totalCarbs'
      | 'totalFats'
    >,
  ) => void;
  updateNutritionPlan: (id: string, plan: Partial<NutritionPlan>) => void;
  deleteNutritionPlan: (id: string) => void;
  getNutritionPlanById: (id: string) => NutritionPlan | undefined;
  assignNutritionPlanToTrainee: (planId: string, traineeId: string) => void;
  unassignNutritionPlanFromTrainee: (planId: string, traineeId: string) => void;

  // Scheduled Workouts
  scheduledWorkouts: ScheduledWorkout[];
  scheduleWorkout: (workout: Omit<ScheduledWorkout, 'id'>) => void;
  updateScheduledWorkout: (
    id: string,
    updates: Partial<ScheduledWorkout>,
  ) => void;
  deleteScheduledWorkout: (id: string) => void;
  getScheduledWorkoutsForTrainee: (traineeId: string) => ScheduledWorkout[];
  getScheduledWorkoutsForDate: (date: string) => ScheduledWorkout[];
}

const NutritionContext = createContext<NutritionContextType | undefined>(
  undefined,
);

const STORAGE_KEYS = {
  NUTRITION_PLANS: 'fr3on_nutrition_plans',
  SCHEDULED_WORKOUTS: 'fr3on_scheduled_workouts',
};

// Sample nutrition plans
const sampleNutritionPlans: NutritionPlan[] = [
  {
    id: 'np1',
    name: "Pharaoh's Muscle Building",
    description: 'High protein diet for muscle growth and recovery',
    meals: [
      {
        id: 'm1',
        name: 'Breakfast of Champions',
        time: '07:00',
        foods: [
          {
            id: 'f1',
            name: 'Eggs',
            quantity: '4 whole',
            calories: 280,
            protein: 24,
            carbs: 2,
            fats: 20,
          },
          {
            id: 'f2',
            name: 'Oatmeal',
            quantity: '100g',
            calories: 380,
            protein: 13,
            carbs: 67,
            fats: 7,
          },
          {
            id: 'f3',
            name: 'Banana',
            quantity: '1 medium',
            calories: 105,
            protein: 1,
            carbs: 27,
            fats: 0,
          },
        ],
      },
      {
        id: 'm2',
        name: 'Midday Fuel',
        time: '12:00',
        foods: [
          {
            id: 'f4',
            name: 'Grilled Chicken Breast',
            quantity: '200g',
            calories: 330,
            protein: 62,
            carbs: 0,
            fats: 7,
          },
          {
            id: 'f5',
            name: 'Brown Rice',
            quantity: '150g',
            calories: 170,
            protein: 4,
            carbs: 36,
            fats: 1,
          },
          {
            id: 'f6',
            name: 'Mixed Vegetables',
            quantity: '200g',
            calories: 80,
            protein: 4,
            carbs: 16,
            fats: 0,
          },
        ],
      },
      {
        id: 'm3',
        name: 'Evening Feast',
        time: '19:00',
        foods: [
          {
            id: 'f7',
            name: 'Salmon Fillet',
            quantity: '200g',
            calories: 400,
            protein: 40,
            carbs: 0,
            fats: 25,
          },
          {
            id: 'f8',
            name: 'Sweet Potato',
            quantity: '200g',
            calories: 180,
            protein: 4,
            carbs: 41,
            fats: 0,
          },
          {
            id: 'f9',
            name: 'Avocado',
            quantity: '1/2',
            calories: 160,
            protein: 2,
            carbs: 8,
            fats: 15,
          },
        ],
      },
    ],
    totalCalories: 2085,
    totalProtein: 154,
    totalCarbs: 197,
    totalFats: 75,
    createdBy: 'trainer1',
    assignedTo: ['t1', 't2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'np2',
    name: 'Nile Lean Cut',
    description: 'Low calorie, high protein for cutting phase',
    meals: [
      {
        id: 'm4',
        name: 'Light Start',
        time: '07:30',
        foods: [
          {
            id: 'f10',
            name: 'Greek Yogurt',
            quantity: '200g',
            calories: 130,
            protein: 20,
            carbs: 8,
            fats: 2,
          },
          {
            id: 'f11',
            name: 'Berries',
            quantity: '100g',
            calories: 50,
            protein: 1,
            carbs: 12,
            fats: 0,
          },
        ],
      },
      {
        id: 'm5',
        name: 'Power Lunch',
        time: '13:00',
        foods: [
          {
            id: 'f12',
            name: 'Turkey Breast',
            quantity: '150g',
            calories: 165,
            protein: 35,
            carbs: 0,
            fats: 2,
          },
          {
            id: 'f13',
            name: 'Quinoa',
            quantity: '100g',
            calories: 120,
            protein: 4,
            carbs: 21,
            fats: 2,
          },
          {
            id: 'f14',
            name: 'Green Salad',
            quantity: '150g',
            calories: 30,
            protein: 2,
            carbs: 6,
            fats: 0,
          },
        ],
      },
    ],
    totalCalories: 495,
    totalProtein: 62,
    totalCarbs: 47,
    totalFats: 6,
    createdBy: 'trainer1',
    assignedTo: ['t3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function NutritionProvider({ children }: { children: ReactNode }) {
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([]);
  const [scheduledWorkouts, setScheduledWorkouts] = useState<
    ScheduledWorkout[]
  >([]);

  // Load assigned plans
  const { data: assignedPlans } = useTraineeAssignedWorkoutPlans();

  // Get current user to fetch logs
  const authContext = useContext(AuthContext);
  const user = authContext?.auth?.user;

  // Fetch workout logs for the trainee
  const { data: workoutLogs } = useTraineeWorkoutLogs(user?.id || '', {
    limit: 100,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedPlans = localStorage.getItem(STORAGE_KEYS.NUTRITION_PLANS);
    const storedSchedule = localStorage.getItem(
      STORAGE_KEYS.SCHEDULED_WORKOUTS,
    );

    if (storedPlans) {
      setNutritionPlans(JSON.parse(storedPlans));
    } else {
      setNutritionPlans(sampleNutritionPlans);
      localStorage.setItem(
        STORAGE_KEYS.NUTRITION_PLANS,
        JSON.stringify(sampleNutritionPlans),
      );
    }

    if (storedSchedule) {
      setScheduledWorkouts(JSON.parse(storedSchedule));
    }
  }, []);

  // Generate dynamic schedule when assigned plans change
  useEffect(() => {
    const generateSchedule = async () => {
      if (!assignedPlans || assignedPlans.length === 0) {
        setScheduledWorkouts([]);
        return;
      }

      const newSchedule: ScheduledWorkout[] = []; // Start fresh or merge? For now let's regenerate.

      for (const assignment of assignedPlans) {
        if (!assignment.active) continue;

        const { data: days } = await findWorkoutDaysByPlan(assignment.planId);
        if (!days) continue;

        // Sort days by orderIndex (using dayIndex as proxy if orderIndex doesn't exist, but user said "depends on orderIndex")
        // entities.ts has dayIndex. The response might have orderIndex if updated?
        // Let's use dayIndex for now as per plan confirmation.
        const sortedDays = days.sort((a, b) => a.dayIndex - b.dayIndex);

        const startDate = parseISO(assignment.startDate);
        const planWeeks = assignment.plan.weeks || 4; // Default to 4 weeks if missing

        for (let week = 0; week < planWeeks; week++) {
          for (const day of sortedDays) {
            // Calculate date: Start of week of startDate + week offset + dayIndex offset
            // Assuming dayIndex 0 = Monday
            const planStartWeek = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday
            const workoutDate = addDays(planStartWeek, week * 7 + day.dayIndex);

            // Only add if after or equal to startDate
            if (workoutDate < startDate) continue;

            const dateStr = format(workoutDate, 'yyyy-MM-dd');

            // Check if already exists in current scheduledWorkouts (to preserve completion status)
            // But here we are regenerating. We should check the *stored* state or prev state.
            // Be careful with infinite loops.

            // Check if a log exists for this date
            const isCompleted =
              workoutLogs?.data?.some((log) => {
                const logDate = new Date(log.startedAt);
                return format(logDate, 'yyyy-MM-dd') === dateStr;
              }) || false;

            newSchedule.push({
              id: `sw_${assignment.planId}_${dateStr}`,
              planId: assignment.planId,
              planName: assignment.plan.name,
              dayName: day.name,
              dayId: day.id,
              traineeId: assignment.traineeId,
              scheduledDate: dateStr,
              scheduledTime: '10:00', // Default time
              completed: isCompleted,
            });
          }
        }
      }

      // Merge with existing state to keep completion status
      setScheduledWorkouts((prev) => {
        const merged = [...newSchedule];

        // Update merged with status from prev
        return merged.map((newWorkout) => {
          const existing = prev.find((p) => p.id === newWorkout.id);

          if (newWorkout.completed) return newWorkout;

          if (existing) {
            return {
              ...newWorkout,
              completed: existing.completed,
              notes: existing.notes,
            };
          }
          return newWorkout;
        });
      });
    };

    generateSchedule();
  }, [
    assignedPlans,
    workoutLogs,
    // Factor in whether current scheduled workouts have dayId to force refresh if they don't
    scheduledWorkouts.some((sw) => !sw.dayId),
  ]);

  // Save to localStorage on changes
  useEffect(() => {
    if (nutritionPlans.length > 0) {
      localStorage.setItem(
        STORAGE_KEYS.NUTRITION_PLANS,
        JSON.stringify(nutritionPlans),
      );
    }
  }, [nutritionPlans]);

  useEffect(() => {
    if (scheduledWorkouts.length > 0) {
      localStorage.setItem(
        STORAGE_KEYS.SCHEDULED_WORKOUTS,
        JSON.stringify(scheduledWorkouts),
      );
    }
  }, [scheduledWorkouts]);

  const calculateTotals = (meals: Meal[]) => {
    return meals.reduce(
      (totals, meal) => {
        meal.foods.forEach((food) => {
          totals.totalCalories += food.calories;
          totals.totalProtein += food.protein;
          totals.totalCarbs += food.carbs;
          totals.totalFats += food.fats;
        });
        return totals;
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 },
    );
  };

  const createNutritionPlan = (
    plan: Omit<
      NutritionPlan,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'totalCalories'
      | 'totalProtein'
      | 'totalCarbs'
      | 'totalFats'
    >,
  ) => {
    const totals = calculateTotals(plan.meals);
    const newPlan: NutritionPlan = {
      ...plan,
      ...totals,
      id: `np_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNutritionPlans((prev) => [...prev, newPlan]);
  };

  const updateNutritionPlan = (id: string, updates: Partial<NutritionPlan>) => {
    setNutritionPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === id) {
          const updatedMeals = updates.meals || plan.meals;
          const totals = calculateTotals(updatedMeals);
          return {
            ...plan,
            ...updates,
            ...totals,
            updatedAt: new Date().toISOString(),
          };
        }
        return plan;
      }),
    );
  };

  const deleteNutritionPlan = (id: string) => {
    setNutritionPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  const getNutritionPlanById = (id: string) => {
    return nutritionPlans.find((plan) => plan.id === id);
  };

  const assignNutritionPlanToTrainee = (planId: string, traineeId: string) => {
    setNutritionPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId && !plan.assignedTo.includes(traineeId)
          ? { ...plan, assignedTo: [...plan.assignedTo, traineeId] }
          : plan,
      ),
    );
  };

  const unassignNutritionPlanFromTrainee = (
    planId: string,
    traineeId: string,
  ) => {
    setNutritionPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              assignedTo: plan.assignedTo.filter((id) => id !== traineeId),
            }
          : plan,
      ),
    );
  };

  const scheduleWorkout = (workout: Omit<ScheduledWorkout, 'id'>) => {
    const newWorkout: ScheduledWorkout = {
      ...workout,
      id: `sw_${Date.now()}`,
    };
    setScheduledWorkouts((prev) => [...prev, newWorkout]);
  };

  const updateScheduledWorkout = (
    id: string,
    updates: Partial<ScheduledWorkout>,
  ) => {
    setScheduledWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id ? { ...workout, ...updates } : workout,
      ),
    );
  };

  const deleteScheduledWorkout = (id: string) => {
    setScheduledWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  const getScheduledWorkoutsForTrainee = (traineeId: string) => {
    return scheduledWorkouts.filter(
      (workout) => workout.traineeId === traineeId,
    );
  };

  const getScheduledWorkoutsForDate = (date: string) => {
    return scheduledWorkouts.filter(
      (workout) => workout.scheduledDate === date,
    );
  };

  return (
    <NutritionContext.Provider
      value={{
        nutritionPlans,
        createNutritionPlan,
        updateNutritionPlan,
        deleteNutritionPlan,
        getNutritionPlanById,
        assignNutritionPlanToTrainee,
        unassignNutritionPlanFromTrainee,
        scheduledWorkouts,
        scheduleWorkout,
        updateScheduledWorkout,
        deleteScheduledWorkout,
        getScheduledWorkoutsForTrainee,
        getScheduledWorkoutsForDate,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutrition() {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
}
