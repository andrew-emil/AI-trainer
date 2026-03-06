import { registerAs } from '@nestjs/config';
import Joi from 'joi'

export const rabbitSchema = Joi.object({
    RABBITMQ_URL: Joi.string().required(),
    COACH_DOMAIN_QUEUE: Joi.string().required(),
    INTERACTION_QUEUE: Joi.string().required(),
    GATEWAY_QUEUE: Joi.string().required(),
})

export default registerAs('rabbit', () => ({
    url: process.env.RABBITMQ_URL,
    coachDomainQueue: process.env.COACH_DOMAIN_QUEUE,
    interactionQueue: process.env.INTERACTION_QUEUE,
    gatewayDomainQueue: process.env.GATEWAY_QUEUE,
}));
