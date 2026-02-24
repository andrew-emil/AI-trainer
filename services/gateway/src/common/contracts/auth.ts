import Joi from "joi";

export const AuthResponseSchema = Joi.object({
    accessToken: Joi.string().required(),
    refreshToken: Joi.string().required(),
})

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}