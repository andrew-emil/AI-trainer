export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    avatar: string | null;
    avatarPublicId: string | null;
    role: UserRole;
}


export enum UserRole {
    trainer = 'trainer',
    trainee = 'trainee',
    admin = 'admin',
}

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    gender: Gender;
    avatar?: string;
    avatarPublicId?: string;
    role: UserRole;
}

export type UpdateUserDto = Partial<CreateUserDto>

export enum Gender {
    male = 'male',
    female = 'female',
    unknown = 'unknown',
}