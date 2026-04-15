import {
  NutritionPlan,
  TrainerReview,
  TrainerTrainee,
  TrainerWithUser,
  WorkoutPlan
} from '../trainer/types';
import { IUser } from '../user/types';

/* Enums */

export enum TraineeGoal {
  cut = 'cut',
  bulk = 'bulk',
  maintenance = 'maintenance',
  strength = 'strength',
  body_recomb = 'body_recomb',
}

/* Models */

export interface Trainee {
  userId: string;
  goal: TraineeGoal;
  heightCm: number | null;
  isActive: boolean;
  createdAt: string;
}

export interface TraineeWorkoutPlan {
  id: string;
  planId: string;
  traineeId: string;
  startDate: string;
  endDate: string | null;
  active: boolean;
}

export interface TraineeNutritionPlan {
  id: string;
  traineeId: string;
  nutritionPlanId: string;
  startDate: string;
  endDate: string | null;
  active: boolean;
}

export interface BodyWeightLog {
  id: string;
  traineeId: string;
  weight: number;
  smm: number | null;
  pbf: number | null;
  loggedAt: string;
}

/* ---------- DTOs ---------- */

export interface CreateTraineeDto {
  userId: string;
  goal: TraineeGoal;
  heightCm?: number;
}

export type UpdateTraineeDto = Partial<CreateTraineeDto>

export interface CreateTrainerReviewDto {
  trainerId: string;
  rating: number;
  comment?: string;
}

export type UpdateTrainerReviewDto = Partial<CreateTrainerReviewDto>

/* ---------- Responses ---------- */

export interface TraineeWithUser extends Trainee {
  user: IUser;
}

export interface GetReviewsForTrainee extends TrainerReview {
  trainer: TrainerWithUser;
}

export interface GetAssignedTrainersResponse extends TrainerTrainee {
  trainer: TrainerWithUser;
}

export interface GetAssignedWorkoutPlansResponse extends TraineeWorkoutPlan {
  plan: WorkoutPlan;
}

export interface GetAssignedNutritionPlansResponse extends TraineeNutritionPlan {
  nutritionPlan: NutritionPlan;
}
