import { UserResponse } from "src/common/contracts/user";

export type CreatedTrainer = {
    user: UserResponse
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