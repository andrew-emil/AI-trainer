import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { BaseMailDto } from "./baseMail.dto";

export class TrainerAccountApproveDto extends BaseMailDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsUrl()
    @IsNotEmpty()
    loginLink: string;
}