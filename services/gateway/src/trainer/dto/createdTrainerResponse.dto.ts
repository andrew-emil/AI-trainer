import { IUserResponse } from "src/common/contracts/user";

export type CreatedTrainer = {
    user: IUserResponse
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