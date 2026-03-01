import { TrainerRequest, User } from './entities';

/* ---------- DTOs ---------- */

export interface RejectTrainerRequestBody {
  adminNote: string;
}

/* ---------- Responses ---------- */

export interface AdminUserSummary extends Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'avatar' | 'username'
> {
  trainer?: {
    bio: string;
    experienceYears: number;
  };
}

export interface TrainerRequestWithUser extends TrainerRequest {
  user: AdminUserSummary;
}

export interface TrainerRequestEntity extends TrainerRequest {}

export interface TrainerRequestDetails extends TrainerRequestWithUser {
  certifications?: {
    id: string;
    name: string;
    imageUrl: string;
    issuedBy: string | null;
    issuedAt: string | null;
  }[];
  transformations?: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}
