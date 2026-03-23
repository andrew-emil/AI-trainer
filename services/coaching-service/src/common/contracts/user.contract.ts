import { z } from "zod";
import { Gender } from "../enum/gender.enum";
import { UserRole } from "../enum/user-role.enum";

export const UserContract = z.object({
    id: z.uuid(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.email(),
    passwordHash: z.string(),
    role: z.enum(UserRole),
    gender: z.enum(Gender),
    avatar: z.string().optional(),
    avatarPublicId: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type User = z.infer<typeof UserContract>