import { registerAs } from '@nestjs/config';
import Joi from 'joi'

export const jwtSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required().default("1h"),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required().default("60d"),
})


export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
}));
