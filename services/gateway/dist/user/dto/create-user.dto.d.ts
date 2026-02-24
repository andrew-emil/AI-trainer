import { Gender, UserRole } from 'src/common/enums/entities.enum';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    avatar?: string;
    avatarPublicId?: string;
    gender: Gender;
    role: UserRole;
}
