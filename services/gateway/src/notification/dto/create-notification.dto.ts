import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import { NotificationType } from "src/common/enums/entities.enum";

export class CreateNotificationDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsOptional()
    actionUrl?: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;
}
