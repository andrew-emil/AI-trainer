import { WorkoutLog as EntityWorkoutLog } from './entities';

export interface CompletedExercise {
  exerciseId: string;
  exerciseName: string;
  sets: {
    setNumber: number;
    reps: number;
    weight: number;
    completed: boolean;
  }[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }[];
}

export interface WorkoutLog {
  id: string;
  planId: string;
  planName: string;
  traineeId: string;
  completedExercises: CompletedExercise[];
  duration: number;
  notes?: string;
  loggedAt: string;
}

/* ---------- DTOs ---------- */

export interface CreateWorkoutSetDto {
  setNumber: number;
  reps: number;
  weight: number;
  rir?: number;
  duration?: number;
  restAfter?: number;
}

export interface CreateWorkoutExerciseDto {
  exerciseId: string;
  order: number;
  startedAt: string;
  finishedAt?: string;
  totalRest?: number;
  sets: CreateWorkoutSetDto[];
}

export interface CreateWorkoutSessionDto {
  dayId: string;
  startedAt: string;
  finishedAt?: string;
  totalDuration?: number;
  totalRestTime?: number;
  exercises: CreateWorkoutExerciseDto[];
}

export interface CreateWorkoutLogDto {
  exerciseId: string;
  dayId: string;
  sets: number;
  reps: number;
  restSeconds?: number;
  weight: number;
  rir: number;
  duration: number;
  loggedAt?: string;
}

export interface UpdateWorkoutLogDto extends Partial<CreateWorkoutLogDto> {}

/* ---------- Responses ---------- */

export interface WorkoutLogWithNames extends Pick<
  EntityWorkoutLog,
  'id' | 'loggedAt'
> {
  exercise: { name: string };
  workoutDay: { name: string | null };
}

export interface WorkoutSessionWithNames {
  id: string;
  startedAt: string;
  finishedAt: string | null;
  totalDuration: number | null;
  workoutDay: { name: string | null };
}

export interface PaginatedWorkoutSessions {
  data: WorkoutSessionWithNames[];
  nextCursor?: string;
}

export interface PaginatedWorkoutLogs {
  data: WorkoutLogWithNames[];
  nextCursor?: string;
}

export interface GroupedWorkoutResult {
  dayId?: string;
  dayName?: string;
  exerciseId?: string;
  exerciseName?: string;
  totalVolume: number;
  totalWeight: number;
  totalSets: number;
  totalReps: number;
}

export interface ProgressiveOverloadDiff {
  volumeDiff: number;
  weightDiff: number;
  repsDiff: number;
  rirDiff: number;
}

export interface ProgressiveOverloadResult {
  exerciseId: string;
  loggedAt: string;
  volume: number;
  weight: number;
  reps: number;
  rir?: number; // Optional in some queries
  previousVolume: number | null;
  previousWeight: number | null;
  previousReps: number | null;
  previousRir?: number | null;
  progressiveOverload: ProgressiveOverloadDiff | null;
}

export interface Latest1RMResult {
  exerciseId: string;
  loggedAt: string;
  weight: number;
  reps: number;
  oneRepMax: number;
}

export interface WeightRecommendation {
  recommendationType:
    | 'maintain'
    | 'increaseReps'
    | 'increaseWeight'
    | 'deload'
    | 'noPreviousLog';
  suggestedReps: number;
  suggestedWeight: number | null;
  goal: string;
  reason?: string;
  bodyWeightTrend?: any;
  bodyCompTrend?: any;
  stalledGrindingStreak?: number;
  basedOn?: {
    weight: number;
    reps: number;
    rir: number;
  }[];
}
