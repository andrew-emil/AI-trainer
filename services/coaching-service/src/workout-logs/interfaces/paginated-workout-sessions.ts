export interface PaginatedWorkoutSessions {
  data: {
    id: string;
    startedAt: Date;
    finishedAt?: Date | null;
    workoutDay: { name: string };
  }[];
  nextCursor?: string;
}
