export enum TraineePatterns {
    CREATE = 'trainee.create',
    FIND_ONE = 'trainee.findOne',
    FIND_ALL = 'trainee.findAll',
    UPDATE = 'trainee.update',
    DELETE = 'trainee.delete',
    GET_ASSIGNED_TRAINERS = 'trainee.getAssignedTrainers',
    GET_ASSIGNED_WORKOUT_PLANS = 'trainee.getAssignedWorkoutPlans',
    GET_ASSIGNED_NUTRITION_PLANS = 'trainee.getAssignedNutritionPlans',
    CREATE_TRAINER_REQUEST = 'trainee.createTrainerRequest',
}

export enum NotificationPatterns {
    SEND = 'notification.send',
    USER_CREATED = 'notification.userCreated',
}

export enum ActivityPatterns {
    CREATE = 'activity.create',
}