import { IsEmail, IsNotEmpty } from "class-validator";

export class BaseMailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}