import { User } from "@prisma/client";


export type CreatedTrainer = {
  user: User
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
