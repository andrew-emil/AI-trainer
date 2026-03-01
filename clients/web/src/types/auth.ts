import { Gender, TraineeGoal } from './entities';
import { CreateUserDto } from './user';

/* ---------- DTOs ---------- */

export interface CreateTrainerCertificationDto {
  name: string;
  imageUrl?: string;
  imagePublicId?: string;
  issuedBy?: string;
  issuedAt?: string;
}

export interface CreateTransformationDto {
  name: string;
  imageUrl?: string;
  imagePublicId?: string;
}

export interface ForgetPasswordDto {
  email: string;
}

export interface RegisterAsTraineeDto extends CreateUserDto {
  goal: TraineeGoal;
  heightCm?: number;
}

export interface RegisterAsTrainerDto extends CreateUserDto {
  bio: string;
  experienceYears: number;
  certifications?: CreateTrainerCertificationDto[];
  transformations?: CreateTransformationDto[];
}

export interface SignTokenDto {
  token: string;
}

/* ---------- Responses ---------- */

export interface AuthResponse {
  token: string;
}

export interface RegisterTrainerResponse {
  message: string;
}

export enum AuthStatus {
  UNAUTHENTICATED,
  AUTHENTICATED,
}