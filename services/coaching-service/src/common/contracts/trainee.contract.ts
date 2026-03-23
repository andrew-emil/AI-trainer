import { TraineeGoal } from "@prisma/client";
import { z } from "zod";
import { UserContract } from "./user.contract";

export const TraineeContract = z.record(z.string(), z.enum(TraineeGoal));

export type TraineeContractType = z.infer<typeof TraineeContract>;

export const TraineeWithUserContract = z.object({
    userId: z.uuid(),
    goal: z.enum(TraineeGoal),
    heightCm: z.number().optional(),
    createdAt: z.date(),
    isActive: z.boolean(),
    user: UserContract
})

export type TraineeWithUserContractType = z.infer<typeof TraineeWithUserContract>
