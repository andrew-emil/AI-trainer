import { IsString, IsEnum, IsOptional, IsUUID, IsNotEmpty } from "class-validator";
import { ActivityType } from "src/common/enums/entities.enum";

export class CreateActivityLogDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsEnum(ActivityType)
    type: ActivityType;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    metadata?: Record<string, unknown>;
}