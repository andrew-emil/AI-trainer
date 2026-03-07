import { IsNotEmpty, IsObject, IsOptional, IsUUID } from "class-validator";

export class CreateConversationDto {
    @IsNotEmpty()
    @IsUUID()
    trainerId: string

    @IsNotEmpty()
    @IsUUID()
    traineeId: string

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}