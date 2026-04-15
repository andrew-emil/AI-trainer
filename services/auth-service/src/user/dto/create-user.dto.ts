import { Gender, UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUrl, MaxLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
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
      message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }
  )
  password: string;

  @IsOptional()
  @ValidateIf(o => o.avatarPublicId != null)
  @IsUrl()
  avatar?: string;

  @ValidateIf(o => o.avatar != null)
  @IsString()
  @MaxLength(255)
  avatarPublicId?: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEnum({
    trainer: UserRole.trainer,
    trainee: UserRole.trainee,
  })
  role: UserRole;
}
