import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class IncomingMessageDto {
    @IsUUID()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    title?: string;
}
