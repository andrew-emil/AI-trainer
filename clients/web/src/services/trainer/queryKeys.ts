export const trainerQueryKeys = {
    all: (isActive?: boolean) => ['trainers', { isActive }],
    detail: (id: string) => ['trainer', id],
    traineeRequests: () => ['trainer', 'trainee-requests'],
    assignedTrainees: () => ['trainer', 'trainees'],
    assignedWorkoutPlan: (traineeId: string, active?: boolean) => ['trainer', 'workout-plans', traineeId, { active }],
    traineesWorkoutPlans: () => ['trainer', 'trainees-workout-plans'],
    assignedNutritionPlan: (traineeId: string, active?: boolean) => ['trainer', 'nutrition-plans', traineeId, { active }],
    traineesNutritionPlans: () => ['trainer', 'trainees-nutrition-plans'],
    reviews: (trainerId: string) => ['trainer', 'reviews', trainerId],
}
