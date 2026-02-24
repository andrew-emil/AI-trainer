import  Joi  from 'joi';
import { UserRole } from "../enums/entities.enum";

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string | null;
    avatarPublicId?: string | null;
}

export const UserResponseSchema = Joi.object<UserResponse>({
    id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
    avatar: Joi.string().allow(null).optional(),
    avatarPublicId: Joi.string().allow(null).optional(),
});