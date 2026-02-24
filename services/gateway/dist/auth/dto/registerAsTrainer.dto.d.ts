import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CreateTrainerCertificationDto } from "./createTrainerCertification.dto";
import { CreateTransformationDto } from "./createTransformation.dto";
export declare class RegisterAsTrainerDto extends CreateUserDto {
    bio: string;
    experienceYears: number;
    certifications?: CreateTrainerCertificationDto[];
    transformations?: CreateTransformationDto[];
}
