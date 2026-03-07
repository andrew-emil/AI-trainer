export type UUID = string;

export interface IUserSnapshot {
    userId: UUID;
    username: string;
    avatarUrl?: string | null;
    role?: 'trainer' | 'trainee' | 'admin' | null;
}