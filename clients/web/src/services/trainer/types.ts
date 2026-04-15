import { IUser, UserRole, Gender } from '../user/types';
import { Trainee, TraineeGoal, TraineeWorkoutPlan, TraineeNutritionPlan } from '../trainee/types';
import { ImageDto } from '../auth/types';

/* Enums */

export enum RequestStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  cancelled_by_the_trainee = 'cancelled_by_the_trainee',
}

export enum MembershipStatus {
  active = 'active',
  inactive = 'inactive',
}

/* Models */

export interface Trainer {
  userId: string;
  bio: string;
  experienceYears: number;
  ratingAvg: number;
  ratingCount: number;
  rankScore: number;
  isActive: boolean;
  createdAt: string;
}

export interface TrainerCertification {
  id: string;
  trainerId: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  issuedBy: string | null;
  issuedAt: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface TrainerTransformation {
  id: string;
  trainerId: string;
  name: string;
  imageUrl: string;
  imagePublicId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TrainerTrainee {
  id: string;
  trainerId: string;
  traineeId: string;
  membershipStatus: MembershipStatus;
  sessionsCount: number;
  assignedAt: string | null;
  createdAt: string;
}

export interface TrainerTraineeRequest {
  id: string;
  trainerId: string;
  traineeId: string;
  sessionsCount: number;
  status: RequestStatus;
  createdAt: string;
  respondedAt: string | null;
}

export interface WorkoutPlan {
  id: string;
  trainerId: string;
  name: string;
  goal: TraineeGoal;
  weeks: number;
  createdAt: string;
}

export interface NutritionPlan {
  id: string;
  trainerId: string;
  name: string;
  description?: string;
  note?: string;
  goal: TraineeGoal;
  weeks: number;
  assignedTo: string[];
  totals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: string;
}

export interface TrainerReview {
  id: string;
  trainerId: string;
  traineeId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface TrainerMetrics {
  id: string;
  trainerId: string;
  activeTraineesCount: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
}

/* ---------- DTOs ---------- */

export interface CreateTrainerDto {
  userId: string;
  bio: string;
  experienceYears: number;
  certifications?: ImageDto[];
  transformations?: ImageDto[];
}

export type UpdateTrainerDto = Partial<CreateTrainerDto>;

export interface CreateTraineeNutritionPlanDto {
  traineeId: string;
  nutritionPlanId: string;
  startDate: string;
  endDate?: string;
  active?: boolean;
}

export interface UpdateTraineeNutritionPlanDto {
  active?: boolean;
}

export interface CreateTraineeWorkoutPlanDto {
  planId: string;
  traineeId: string;
  startDate: string;
  endDate?: string;
  active?: boolean;
}

/* ---------- Responses ---------- */

export interface TrainerWithUser extends Trainer {
  user: IUser;
  certifications?: TrainerCertification[];
  transformations?: TrainerTransformation[];
}

export interface TraineeWithUser extends Trainee {
  user: IUser;
}

export interface TraineeRequestResponseDto {
  id: string;
  trainerId: string;
  traineeId: string;
  traineeName: string;
  sessionsCount: number;
  status: RequestStatus;
  createdAt: string;
  respondedAt?: string;
}

export interface ProcessTraineeRequestResponse {
  request: TrainerTraineeRequest;
  trainerTrainee?: TrainerTrainee; // Present if approved
}

export interface GetAssignedTraineesResponse extends TrainerTrainee {
  trainee: TraineeWithUser;
}

export interface GetAssignedWorkoutPlans extends TraineeWorkoutPlan {
  trainee: Trainee;
  plan: WorkoutPlan;
}

export interface GetAllTraineesWithWorkoutPlans {
  trainee: TraineeWithUser;
  assignedPlan: WorkoutPlan | null;
}

export interface GetAssignedNutritionPlans extends TraineeNutritionPlan {
  trainee: Trainee;
  nutritionPlan: NutritionPlan;
}

export interface GetAllTraineesWithNutritionPlans {
  trainee: TraineeWithUser;
  assignedPlan: NutritionPlan | null;
}

export interface GetReviewsForTrainer extends TrainerReview {
  trainee: TraineeWithUser;
}
