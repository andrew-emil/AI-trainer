import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import type { IUserSnapshot } from "src/common/types/userSnapshot.type";

export class SendMessageDto {
    @IsNotEmpty()
    @IsMongoId()
    conversationId: string;

    @IsNotEmpty()
    @IsUUID()
    receiverId: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsObject()
    sender: IUserSnapshot;

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}