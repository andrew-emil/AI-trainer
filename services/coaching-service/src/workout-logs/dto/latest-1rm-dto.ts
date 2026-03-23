import { IsOptional, IsUUID } from "class-validator";

export class Latest1RMPayload {
    @IsUUID()
    traineeId: string;

    @IsUUID()
    @IsOptional()
    exerciseId?: string;
}