import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, ValidateIf } from "class-validator";

export class CreateTrainerCertificationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @ValidateIf(o => o.imagePublicId != null)
    @IsUrl()
    imageUrl: string;

    @ValidateIf(o => o.imageUrl != null)
    @IsString()
    @MaxLength(255)
    imagePublicId: string;

    @IsOptional()
    @IsString()
    issuedBy?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    issuedAt?: string;
}