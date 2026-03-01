import { Gender, UserRole, User } from './entities';

/* ---------- DTOs ---------- */

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

/* ---------- Responses ---------- */

export type SafeUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'role' | 'avatar' | 'avatarPublicId'>
