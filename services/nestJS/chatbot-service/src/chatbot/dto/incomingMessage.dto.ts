import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class IncomingMessageDto {
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    title?: string;
}
