import { TraineeGoal } from "@/services/trainee";
import { CreateUserDto, IUser } from "@/services/user";

export interface AuthResponse {
    message: string;
    user: IUser
}

export interface LoginDto {
    email: string
    password: string
}

export interface RegisterAsTraineeDto extends CreateUserDto {
    goal: TraineeGoal;
    heightCm?: number;
}

export interface RegisterAsTrainerDto extends CreateUserDto {
    bio: string
    experienceYears: number
    certifications?: ImageDto[]
    transformations?: ImageDto[]
}

export interface ImageDto {
    name: string;
    imageUrl?: string;
    imagePublicId?: string;
}
