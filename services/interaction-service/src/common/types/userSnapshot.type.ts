export type UUID = string;

export interface IUserSnapshot {
    userId: UUID;
    displayName?: string | null;
    avatarUrl?: string | null;
    role?: 'trainer' | 'trainee' | 'admin' | null;
}