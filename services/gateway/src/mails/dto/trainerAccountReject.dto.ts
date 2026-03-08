import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { BaseMailDto } from "./baseMail.dto";

export class TrainerAccountRejectDto extends BaseMailDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    rejectionReason?: string | null;

    @IsUrl()
    @IsNotEmpty()
    reapplyLink: string;
}