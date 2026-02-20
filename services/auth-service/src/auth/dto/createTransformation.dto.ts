import { IsNotEmpty, IsString, IsUrl, MaxLength, ValidateIf } from "class-validator";

export class CreateTransformationDto {
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
}