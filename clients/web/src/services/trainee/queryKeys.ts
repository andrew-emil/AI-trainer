export const traineeQueryKeys = {
    all: () => ['trainees'],
    detail: (id: string) => ['trainee', id],
    reviews: () => ['trainee', 'reviews'],
    assignedTrainers: () => ['trainee', 'assigned-trainer'],
    assignedWorkoutPlans: () => ['trainee', 'assigned-workout-plans'],
    assignedNutritionPlans: () => ['trainee', 'assigned-nutrition-plans'],
}
