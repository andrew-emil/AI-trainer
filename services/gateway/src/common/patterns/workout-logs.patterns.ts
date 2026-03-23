export enum WorkoutLogPattern {
    // CRUD
    CREATE = 'workout_log.create',
    FIND_ONE = 'workout_log.find_one',
    FIND_ALL = 'workout_log.find_all',
    UPDATE = 'workout_log.update',
    REMOVE = 'workout_log.remove',

    // Analytics
    SUMMARY = 'workout_log.summary',
    PROGRESSIVE_OVERLOAD = 'workout_log.progressive_overload',
    LATEST_PROGRESSIVE_OVERLOAD = 'workout_log.latest_progressive_overload',
    LATEST_1RM = 'workout_log.latest_1rm',
}