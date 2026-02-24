import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CreateTrainerCertificationDto } from "./createTrainerCertification.dto";
import { CreateTransformationDto } from "./createTransformation.dto";

export class RegisterAsTrainerDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    bio: string;

    @IsNumber()
    experienceYears: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTrainerCertificationDto)
    certifications?: CreateTrainerCertificationDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTransformationDto)
    transformations?: CreateTransformationDto[];
}