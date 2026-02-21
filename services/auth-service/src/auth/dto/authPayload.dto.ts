import { UserRole } from "@prisma/client";

export type AuthPayload = {
    sub: string;
    email: string;
    role: UserRole;
};