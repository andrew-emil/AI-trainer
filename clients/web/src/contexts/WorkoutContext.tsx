import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  WorkoutPlan,
  WorkoutLog,
  Exercise,
  Trainee,
  CompletedExercise,
} from '@/types/workout-log';

interface WorkoutContextType {
  // Workout Plans
  workoutPlans: WorkoutPlan[];
  createPlan: (
    plan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>,
  ) => void;
  updatePlan: (id: string, plan: Partial<WorkoutPlan>) => void;
  deletePlan: (id: string) => void;
  getPlanById: (id: string) => WorkoutPlan | undefined;

  // Workout Logs
  workoutLogs: WorkoutLog[];
  logWorkout: (log: Omit<WorkoutLog, 'id' | 'completedAt'>) => void;
  getLogsForPlan: (planId: string) => WorkoutLog[];
  getLogsForTrainee: (traineeId: string) => WorkoutLog[];

  // Trainees (mock for now)
  trainees: Trainee[];
  assignPlanToTrainee: (planId: string, traineeId: string) => void;
  unassignPlanFromTrainee: (planId: string, traineeId: string) => void;

  // User context (mock)
  currentUser: {
    id: string;
    name: string;
    role: 'trainer' | 'trainee';
    avatar?: string;
    email?: string;
  };
  setCurrentUser: (user: {
    id: string;
    name: string;
    role: 'trainer' | 'trainee';
    avatar?: string;
    email?: string;
  }) => void;
  updateUserAvatar: (avatar: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PLANS: 'fr3on_workout_plans',
  LOGS: 'fr3on_workout_logs',
  TRAINEES: 'fr3on_trainees',
  USER: 'fr3on_current_user',
};

// Mock trainees
const initialTrainees: Trainee[] = [
  {
    id: 't1',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    assignedPlans: [],
  },
  {
    id: 't2',
    name: 'Sara Mohamed',
    email: 'sara@example.com',
    assignedPlans: [],
  },
  {
    id: 't3',
    name: 'Omar Khaled',
    email: 'omar@example.com',
    assignedPlans: [],
  },
  { id: 't4', name: 'Nour Ali', email: 'nour@example.com', assignedPlans: [] },
];

// Sample workout plans
const samplePlans: WorkoutPlan[] = [
  {
    id: 'plan1',
    name: 'Pyramid Power - Upper Body',
    description:
      'Build strength like the ancient builders with this comprehensive upper body routine',
    exercises: [
      {
        id: 'e1',
        name: 'Bench Press',
        sets: 4,
        reps: 10,
        weight: 60,
        restSeconds: 90,
      },
      {
        id: 'e2',
        name: 'Shoulder Press',
        sets: 3,
        reps: 12,
        weight: 30,
        restSeconds: 60,
      },
      { id: 'e3', name: 'Pull-ups', sets: 4, reps: 8, restSeconds: 90 },
      {
        id: 'e4',
        name: 'Bicep Curls',
        sets: 3,
        reps: 15,
        weight: 15,
        restSeconds: 45,
      },
      { id: 'e5', name: 'Tricep Dips', sets: 3, reps: 12, restSeconds: 60 },
    ],
    createdBy: 'trainer1',
    assignedTo: ['t1', 't2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plan2',
    name: "Pharaoh's Legs",
    description: 'Lower body workout fit for royalty - build powerful legs',
    exercises: [
      {
        id: 'e6',
        name: 'Squats',
        sets: 4,
        reps: 12,
        weight: 80,
        restSeconds: 90,
      },
      {
        id: 'e7',
        name: 'Leg Press',
        sets: 4,
        reps: 10,
        weight: 120,
        restSeconds: 90,
      },
      {
        id: 'e8',
        name: 'Romanian Deadlift',
        sets: 3,
        reps: 12,
        weight: 50,
        restSeconds: 60,
      },
      {
        id: 'e9',
        name: 'Calf Raises',
        sets: 4,
        reps: 15,
        weight: 40,
        restSeconds: 45,
      },
    ],
    createdBy: 'trainer1',
    assignedTo: ['t3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [trainees, setTrainees] = useState<Trainee[]>(initialTrainees);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    role: 'trainer' | 'trainee';
    avatar?: string;
    email?: string;
  }>({
    id: 'trainer1',
    name: 'Master Trainer',
    role: 'trainer',
    avatar: '',
    email: 'trainer@fr3on.com',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedPlans = localStorage.getItem(STORAGE_KEYS.PLANS);
    const storedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    const storedTrainees = localStorage.getItem(STORAGE_KEYS.TRAINEES);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedPlans) {
      setWorkoutPlans(JSON.parse(storedPlans));
    } else {
      setWorkoutPlans(samplePlans);
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(samplePlans));
    }

    if (storedLogs) {
      setWorkoutLogs(JSON.parse(storedLogs));
    }

    if (storedTrainees) {
      setTrainees(JSON.parse(storedTrainees));
    } else {
      localStorage.setItem(
        STORAGE_KEYS.TRAINEES,
        JSON.stringify(initialTrainees),
      );
    }

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(workoutPlans));
  }, [workoutPlans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRAINEES, JSON.stringify(trainees));
  }, [trainees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  const createPlan = (
    plan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    const newPlan: WorkoutPlan = {
      ...plan,
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setWorkoutPlans((prev) => [...prev, newPlan]);
  };

  const updatePlan = (id: string, updates: Partial<WorkoutPlan>) => {
    setWorkoutPlans((prev) =>
      prev.map((plan) =>
        plan.id === id
          ? { ...plan, ...updates, updatedAt: new Date().toISOString() }
          : plan,
      ),
    );
  };

  const deletePlan = (id: string) => {
    setWorkoutPlans((prev) => prev.filter((plan) => plan.id !== id));
    // Also remove from trainees' assigned plans
    setTrainees((prev) =>
      prev.map((trainee) => ({
        ...trainee,
        assignedPlans: trainee.assignedPlans.filter((planId) => planId !== id),
      })),
    );
  };

  const getPlanById = (id: string) => {
    return workoutPlans.find((plan) => plan.id === id);
  };

  const logWorkout = (log: Omit<WorkoutLog, 'id' | 'completedAt'>) => {
    const newLog: WorkoutLog = {
      ...log,
      id: `log_${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    setWorkoutLogs((prev) => [...prev, newLog]);
  };

  const getLogsForPlan = (planId: string) => {
    return workoutLogs.filter((log) => log.planId === planId);
  };

  const getLogsForTrainee = (traineeId: string) => {
    return workoutLogs.filter((log) => log.traineeId === traineeId);
  };

  const assignPlanToTrainee = (planId: string, traineeId: string) => {
    // Update plan
    setWorkoutPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId && !plan.assignedTo.includes(traineeId)
          ? { ...plan, assignedTo: [...plan.assignedTo, traineeId] }
          : plan,
      ),
    );
    // Update trainee
    setTrainees((prev) =>
      prev.map((trainee) =>
        trainee.id === traineeId && !trainee.assignedPlans.includes(planId)
          ? { ...trainee, assignedPlans: [...trainee.assignedPlans, planId] }
          : trainee,
      ),
    );
  };

  const unassignPlanFromTrainee = (planId: string, traineeId: string) => {
    // Update plan
    setWorkoutPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              assignedTo: plan.assignedTo.filter((id) => id !== traineeId),
            }
          : plan,
      ),
    );
    // Update trainee
    setTrainees((prev) =>
      prev.map((trainee) =>
        trainee.id === traineeId
          ? {
              ...trainee,
              assignedPlans: trainee.assignedPlans.filter(
                (id) => id !== planId,
              ),
            }
          : trainee,
      ),
    );
  };

  const updateUserAvatar = (avatar: string) => {
    setCurrentUser((prev) => ({ ...prev, avatar }));
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutPlans,
        createPlan,
        updatePlan,
        deletePlan,
        getPlanById,
        workoutLogs,
        logWorkout,
        getLogsForPlan,
        getLogsForTrainee,
        trainees,
        assignPlanToTrainee,
        unassignPlanFromTrainee,
        currentUser,
        setCurrentUser,
        updateUserAvatar,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
