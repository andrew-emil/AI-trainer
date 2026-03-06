import { IsNotEmpty, IsObject, IsOptional, IsUUID } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    @IsUUID()
    traineeId: string;

    @IsNotEmpty()
    @IsUUID()
    trainerId: string;

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}
