import { UserRole } from "@prisma/client";
export interface SignTokenDto {
    id: string;
    email: string;
    role: UserRole;
}
