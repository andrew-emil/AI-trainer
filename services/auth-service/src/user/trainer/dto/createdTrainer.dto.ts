import { Gender, UserRole } from "@prisma/client";

export type CreatedTrainer = {
  user: {
    createdAt: Date;
    id: string;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    gender: Gender;
    avatar?: string;
    avatarPublicId?: string;
  };
} & {
  userId: string;
  bio: string;
  experienceYears: Date;
  ratingAvg: number;
  ratingCount: number;
  rankScore: number;
  isActive: boolean;
  createdAt: Date;
};
