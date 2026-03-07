import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { BaseMailDto } from "./baseMail.dto";

export class PasswordResetTemplateDto extends BaseMailDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsUrl()
    @IsNotEmpty()
    resetLink: string;

    @IsString()
    @IsNotEmpty()
    expirationTime: string;
}