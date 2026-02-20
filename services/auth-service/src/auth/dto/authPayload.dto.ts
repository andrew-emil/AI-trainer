import { UserRole } from "src/prisma/generated";

export type AuthPayload = {
    sub: string;
    email: string;
    role: UserRole;
};