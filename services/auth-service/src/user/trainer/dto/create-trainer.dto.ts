import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateTrainerCertificationDto } from 'src/auth/dto/createTrainerCertification.dto';
import { CreateTransformationDto } from 'src/auth/dto/createTransformation.dto';

export class CreateTrainerDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

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
