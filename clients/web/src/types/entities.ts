export type Json = unknown;

/* Enums */

export enum UserRole {
  trainer = 'trainer',
  trainee = 'trainee',
  admin = 'admin',
}

export enum TraineeGoal {
  cut = 'cut',
  bulk = 'bulk',
  maintenance = 'maintenance',
  strength = 'strength',
  body_recomb = 'body_recomb',
}

export enum Gender {
  male = 'male',
  female = 'female',
  unknown = 'unknown',
}

export enum TrainerRequestStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export enum MembershipStatus {
  active = 'active',
  inactive = 'inactive',
}

export enum RequestStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  cancelled_by_the_trainee = 'cancelled_by_the_trainee',
}

export enum ActivityType {
  WORKOUT_COMPLETED = 'WORKOUT_COMPLETED',
  NUTRITION_PLAN_ASSIGNED = 'NUTRITION_PLAN_ASSIGNED',
  WEIGHT_LOGGED = 'WEIGHT_LOGGED',
  TRAINER_APPROVED = 'TRAINER_APPROVED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  CHAT_MESSAGE_RECEIVED = 'CHAT_MESSAGE_RECEIVED',
  TRAINER_RANK_CHANGED = 'TRAINER_RANK_CHANGED',
  TRAINER_REQUESTED = 'TRAINER_REQUESTED',
  MEMBERSHIP_RENEWED = 'MEMBERSHIP_RENEWED',
}

export enum ConversationType {
  TRAINER_TRAINEE = 'TRAINER_TRAINEE',
  CHATBOT = 'CHATBOT',
}

export enum ParticipantType {
  USER = 'USER',
  BOT = 'BOT',
}

export enum MessageSenderType {
  USER = 'USER',
  BOT = 'BOT',
}

export enum NotificationType {
  PASSWORD_RESET = 'PASSWORD_RESET',
  TRAINER_APPROVAL = 'TRAINER_APPROVAL',
  TRAINER_REJECTION = 'TRAINER_REJECTION',
  NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE',
  TRAINER_RANK_CHANGED = 'TRAINER_RANK_CHANGED',
  NEW_TRAINER_REGISTERED = 'NEW_TRAINER_REGISTERED',
  NEW_TRAINEE_REQUESTED = 'NEW_TRAINEE_REQUESTED',
  TRAINEE_REQUEST_APPROVED = 'TRAINEE_REQUEST_APPROVED',
  TRAINEE_REQUEST_REJECTED = 'TRAINEE_REQUEST_REJECTED',
  MEMBERSHIP_EXPIRED = 'MEMBERSHIP_EXPIRED',
  WORKOUT_PLAN_ASSIGNED = 'WORKOUT_PLAN_ASSIGNED',
  WORKOUT_PLAN_UNASSIGNED = 'WORKOUT_PLAN_UNASSIGNED',
  NUTRITION_PLAN_ASSIGNED = 'NUTRITION_PLAN_ASSIGNED',
  NUTRITION_PLAN_UNASSIGNED = 'NUTRITION_PLAN_UNASSIGNED',
  TRAINER_UNASSIGNED = 'TRAINER_UNASSIGNED',
  TRAINEE_SWITCHED_TRAINER = 'TRAINEE_SWITCHED_TRAINER',
  BODY_WEIGHT_LOGGED = 'BODY_WEIGHT_LOGGED',
  TRAINER_PROFILE_UPDATE = 'TRAINER_PROFILE_UPDATE',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

/* Models */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  gender: Gender;
  avatar: string | null;
  avatarPublicId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Trainee {
  userId: string;
  goal: TraineeGoal;
  heightCm: number | null;
  isActive: boolean;
  createdAt: string;
}

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

export interface ResetPasswordToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
}

export interface TrainerRequest {
  id: string;
  userId: string;
  bio: string;
  experienceYears: number;
  status: TrainerRequestStatus;
  adminNote: string | null;
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

export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
  instructions: string[];
}

export interface Muscle {
  id: string;
  name: string;
}

export interface BodyPart {
  id: string;
  name: string;
}

export interface Equipment {
  id: string;
  name: string;
}

export interface WorkoutPlan {
  id: string;
  trainerId: string;
  name: string;
  goal: TraineeGoal;
  weeks: number;
  createdAt: string;
}

export interface WorkoutDay {
  id: string;
  planId: string;
  name: string;
  dayIndex: number;
}

export interface WorkoutDayExercise {
  id: string;
  workoutDayId: string;
  exerciseId: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  restSeconds: number | null;
  orderIndex: number;
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

export interface WorkoutLog {
  id: string;
  traineeId: string;
  exerciseId: string;
  dayId: string;
  sets: number;
  reps: number;
  restSeconds: number | null;
  weight: number;
  rir: number;
  duration: number;
  volume: number;
  loggedAt: string;
}

export interface WorkoutSession {
  id: string;
  traineeId: string;
  dayId: string;
  startedAt: string;
  finishedAt: string | null;
  totalDuration: number | null; // in seconds
  totalRestTime: number | null; // in seconds
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutExercise {
  id: string;
  sessionId: string;
  exerciseId: string;
  order: number;
  startedAt: string;
  finishedAt: string | null;
  totalRest: number | null; // in seconds
  createdAt: string;
}

export interface WorkoutSet {
  id: string;
  workoutExerciseId: string;
  setNumber: number;
  reps: number;
  weight: number;
  rir: number | null;
  duration: number | null; // in seconds
  restAfter: number | null; // in seconds
  createdAt: string;
}

export interface BodyWeightLog {
  id: string;
  traineeId: string;
  weight: number;
  smm: number | null;
  pbf: number | null;
  loggedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: ActivityType;
  title: string;
  description: string | null;
  meta: Json | null;
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

export interface Conversation {
  id: string;
  type: ConversationType;
  title: string | null;
  trainerTraineeId: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationParticipant {
  id: string;
  conversationId: string;
  participantType: ParticipantType;
  userId: string | null;
  lastReadAt: string | null;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderType: MessageSenderType;
  senderId: string | null;
  content: string | null;
  createdAt: string;
}

export interface Food {
  id: string;
  name: string;
  alternateNames: string[];
  description: string | null;
  type: string | null;
  tags: string[];
  serving: Json | null; // { name: string, factor: number }[]
  createdAt: string;
  macros?: FoodMacros;
  nutrients?: FoodNutrient[];
}

export interface FoodMacros {
  id: string;
  foodId: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodNutrient {
  id: string;
  foodId: string;
  key: string;
  value: number;
  unit: string;
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

export interface NutritionDay {
  id: string;
  planId: string;
  name: string;
  dayIndex: number;
}

export interface NutritionMeal {
  id: string;
  nutritionDayId: string;
  name: string;
  orderIndex: number;
  time: string | null;
}

export interface NutritionDayFood {
  id: string;
  mealId: string;
  foodId: string;
  quantity: number;
  unit: string;
  orderIndex: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  status: NotificationStatus;
  recipientId: string;
  title: string;
  body: string;
  data: Json | null;
  actionUrl: string | null;
  readAt: string | null;
  emailSentAt: string | null;
  emailError: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  type: NotificationType;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
