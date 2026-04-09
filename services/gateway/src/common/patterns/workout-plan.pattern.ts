export enum WorkoutPlanPatterns {
  // ---------- Plans ----------
  CREATE_PLAN = 'workout-plans.create',
  FIND_ALL_PLANS = 'workout-plans.find-all',
  FIND_BY_ID = 'workout-plans.find-by-id',
  FIND_BY_TRAINER = 'workout-plans.find-by-trainer',
  UPDATE_PLAN = 'workout-plans.update',
  DELETE_PLAN = 'workout-plans.delete',

  // ---------- Days ----------
  ADD_DAY = 'workout-plans.days.add',
  FIND_DAYS_BY_PLAN = 'workout-plans.days.find-by-plan',
  FIND_DAY_BY_ID = 'workout-plans.days.find-by-id',
  UPDATE_DAY = 'workout-plans.days.update',
  DELETE_DAY = 'workout-plans.days.delete',

  // ---------- Day Exercises ----------
  ADD_EXERCISE_TO_DAY = 'workout-plans.days.exercises.add',
  UPDATE_DAY_EXERCISE = 'workout-plans.days.exercises.update',
  DELETE_DAY_EXERCISE = 'workout-plans.days.exercises.delete',
}
