import Joi from "joi";

export interface ITrainerApplicationApprovedResponse {
    user: {
        id: string;
        username: string;
        email: string;
    };
    userId: string;
    bio: string;
    experienceYears: Date;
    ratingAvg: number;
    ratingCount: number;
    rankScore: number;
    isActive: boolean;
    createdAt: Date;
}

export const TrainerApplicationResponseSchema =
    Joi.object<ITrainerApplicationApprovedResponse>({
        user: Joi.object({
            id: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
        }).required(),
        userId: Joi.string().required(),
        bio: Joi.string().required(),
        experienceYears: Joi.date().required(),
        ratingAvg: Joi.number().required(),
        ratingCount: Joi.number().integer().min(0).required(),
        rankScore: Joi.number().required(),
        isActive: Joi.boolean().required(),
        createdAt: Joi.date().required(),
    });

export interface ITrainerApplicationRejectResponse {
    user: {
        id: string;
        username: string;
        email: string;
    };
    userId: string;
    createdAt: Date;
    id: string;
    status: string;
    adminNote: string | null;
    updatedAt: Date;
}

export const TrainerApplicationRejectResponseSchema =
    Joi.object<ITrainerApplicationRejectResponse>({
        user: Joi.object({
            id: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
        }).required(),
        userId: Joi.string().required(),
        id: Joi.string().required(),
        status: Joi.string().required(),
        adminNote: Joi.string().optional(),
        updatedAt: Joi.date().required(),
        createdAt: Joi.date().required(),
    });