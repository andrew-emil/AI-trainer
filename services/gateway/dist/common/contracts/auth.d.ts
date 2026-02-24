import Joi from "joi";
export declare const AuthResponseSchema: Joi.ObjectSchema<any>;
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}
