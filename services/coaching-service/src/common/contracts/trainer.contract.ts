import { z } from "zod"
import { UserContract } from "./user.contract"

export const TrainerContract = z.object({
    userId: z.uuid(),
    bio: z.string(),
    experienceYears: z.number(),
    ratingAvg: z.number(),
    ratingCount: z.number(),
    rankScore: z.number(),
    isActive: z.boolean(),
    createdAt: z.date(),
})

export type Trainer = z.infer<typeof TrainerContract>

export const TrainerWithUserContract = TrainerContract.extend({
    user: UserContract
})

export type TrainerWithUserContractType = z.infer<typeof TrainerWithUserContract>