import { registerAs } from "@nestjs/config";
import Joi from "joi";

export default registerAs("chatbot", () => ({
    apiKey: process.env.GOOGLE_API_KEY,
}))

export const chatbotConfigSchema = Joi.object({
    GOOGLE_API_KEY: Joi.string().required(),
})