"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AuthResponseSchema = joi_1.default.object({
    accessToken: joi_1.default.string().required(),
    refreshToken: joi_1.default.string().required(),
});
//# sourceMappingURL=auth.js.map