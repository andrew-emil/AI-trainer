import { UserRole } from "../enums/entities.enum";

export type UserSnapshot = {
    userId: string;
    username: string;
    avatarUrl?: string | null;
    role?: UserRole | null;
}