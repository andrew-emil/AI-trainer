import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message: "Invalid email or password",
        }
    )
    password: string;
}