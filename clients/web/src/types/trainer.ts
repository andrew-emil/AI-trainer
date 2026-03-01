import {
  NutritionPlan,
  RequestStatus,
  Trainee,
  TraineeNutritionPlan,
  TraineeWorkoutPlan,
  Trainer,
  TrainerCertification,
  TrainerReview,
  TrainerTrainee,
  TrainerTraineeRequest,
  TrainerTransformation,
  User,
  WorkoutPlan,
} from './entities';
import { CreateTrainerCertificationDto, CreateTransformationDto } from './auth';

/* ---------- DTOs ---------- */

export interface CreateTrainerDto {
  userId: string;
  bio: string;
  experienceYears: number;
  certifications?: CreateTrainerCertificationDto[];
  transformations?: CreateTransformationDto[];
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
  user: User;
  certifications?: TrainerCertification[];
  transformations?: TrainerTransformation[];
}

export interface TraineeWithUser extends Trainee {
  user: User;
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
