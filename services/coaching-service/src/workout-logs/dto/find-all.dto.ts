import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class FindAllPayload {
    @IsUUID()
    traineeId: string;

    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsUUID()
    @IsOptional()
    cursor?: string;
}