import { Request } from "express";
import { AuthPayloadDto } from "src/auth/dto/authPayload.dto";

export interface CustomRequest extends Request {
    user: AuthPayloadDto;
}