import { registerAs } from "@nestjs/config";
import Joi from "joi";

export default registerAs("database", () => ({
    host: process.env.DBHOST,
    name: process.env.DBNAME
}))

export const databaseConfigSchema = Joi.object({
    DBHOST: Joi.string().required(),
    DBNAME: Joi.string().required()
})