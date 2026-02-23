"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitSchema = void 0;
const config_1 = require("@nestjs/config");
const joi_1 = __importDefault(require("joi"));
exports.rabbitSchema = joi_1.default.object({
    RABBITMQ_URL: joi_1.default.string().required(),
    COACH_DOMAIN_QUEUE: joi_1.default.string().required(),
    INTERACTION_QUEUE: joi_1.default.string().required(),
    AUTH_QUEUE: joi_1.default.string().required(),
});
exports.default = (0, config_1.registerAs)('rabbit', () => ({
    url: process.env.RABBITMQ_URL,
    coachDomainQueue: process.env.COACH_DOMAIN_QUEUE,
    interactionQueue: process.env.INTERACTION_QUEUE,
    authQueue: process.env.AUTH_QUEUE,
}));
//# sourceMappingURL=rabbit.config.js.map