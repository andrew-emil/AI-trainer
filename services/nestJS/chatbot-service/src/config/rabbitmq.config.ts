import { registerAs } from "@nestjs/config";
import Joi from "joi";

export default registerAs("rabbitmq", () => ({
    uri: process.env.RABBITMQ_URL,
}))

export const rabbitmqSchema = Joi.object({
    RABBITMQ_URL: Joi.string().uri().required(),
})