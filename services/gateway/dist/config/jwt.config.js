"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSchema = void 0;
const config_1 = require("@nestjs/config");
const joi_1 = __importDefault(require("joi"));
exports.jwtSchema = joi_1.default.object({
    JWT_SECRET: joi_1.default.string().required(),
    JWT_EXPIRATION_TIME: joi_1.default.string().required().default("1h"),
});
exports.default = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
}));
//# sourceMappingURL=jwt.config.js.map