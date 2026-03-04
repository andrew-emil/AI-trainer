import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { BaseMailDto } from "./baseMail.dto";

export class TrainerAccountRejectDto extends BaseMailDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    rejectionReason: string;

    @IsUrl()
    @IsNotEmpty()
    reapplyLink: string;
}