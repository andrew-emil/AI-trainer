import {
  Exercise,
  WorkoutDay,
  WorkoutDayExercise,
  WorkoutPlan,
} from './entities';

/* ---------- DTOs ---------- */

export interface CreateWorkoutPlanDto {
  trainerId: string;
  name: string;
  goal: string;
  weeks: number;
}

export interface UpdateWorkoutPlanDto extends Partial<CreateWorkoutPlanDto> {}

export interface CreateWorkoutDayDto {
  name: string;
  dayIndex: number; // 0=Mon, 1=Tue...
}

export interface UpdateWorkoutDayDto extends Partial<CreateWorkoutDayDto> {}

export interface CreateWorkoutDayExerciseDto {
  exerciseId: string;
  orderIndex: number;
  sets?: number;
  repsMin?: number;
  repsMax?: number;
  rir?: number;
  restSeconds?: number;
  notes?: string;
}

export interface UpdateWorkoutDayExerciseDto extends Partial<CreateWorkoutDayExerciseDto> {}

/* ---------- Responses ---------- */

export interface WorkoutDayExerciseResponseDto extends WorkoutDayExercise {
  exercise: Exercise;
}

export interface WorkoutDayResponseDto extends WorkoutDay {
  exercises: WorkoutDayExerciseResponseDto[];
}

export interface WorkoutPlanWithDetails extends WorkoutPlan {
  days: WorkoutDayResponseDto[];
}
