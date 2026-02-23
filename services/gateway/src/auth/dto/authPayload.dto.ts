import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AuthPayloadDto {
    @IsUUID()
    @IsNotEmpty()
    sub: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}