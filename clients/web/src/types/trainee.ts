import {
  NutritionPlan,
  Trainee,
  TraineeGoal,
  TraineeNutritionPlan,
  TraineeWorkoutPlan,
  TrainerReview,
  TrainerTrainee,
  User,
  WorkoutPlan
} from './entities';
import { TrainerWithUser } from './trainer';

export interface CreateTraineeDto {
  userId: string;
  goal: TraineeGoal;
  heightCm?: number;
}

export interface UpdateTraineeDto extends Partial<CreateTraineeDto> {}

export interface CreateTrainerReviewDto {
  trainerId: string;
  rating: number;
  comment?: string;
}

export interface UpdateTrainerReviewDto extends Partial<CreateTrainerReviewDto> {}

/* ---------- Responses ---------- */

export interface TraineeWithUser extends Trainee {
  user: User;
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
