import { registerAs } from "@nestjs/config";
import Joi from "joi";

export default registerAs("chatbot", () => ({
    apiKey: process.env.API_KEY,
}))

export const chatbotConfigSchema = Joi.object({
    API_KEY: Joi.string().required(),
})