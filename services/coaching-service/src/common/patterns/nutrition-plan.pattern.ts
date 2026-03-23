export enum NutritionPlanPatterns {
    CREATE_PLAN = "nutrition-plans.create",
    FIND_ALL_PLANS = "nutrition-plans.find-all",
    FIND_BY_ID = "nutrition-plans.find-by-id",
    FIND_BY_TRAINER = "nutrition-plans.find-by-trainer",
    UPDATE_PLAN = "nutrition-plans.update",
    DELETE_PLAN = "nutrition-plans.delete",

    CREATE_DAY = "nutrition-plans.days.create",
    FIND_DAYS_BY_PLAN = "nutrition-plans.days.find-by-plan",
    UPDATE_DAY = "nutrition-plans.days.update",
    DELETE_DAY = "nutrition-plans.days.delete",

    CREATE_MEAL = "nutrition-plans.meals.create",
    FIND_MEALS_BY_DAY = "nutrition-plans.meals.find-by-day",
    UPDATE_MEAL = "nutrition-plans.meals.update",
    DELETE_MEAL = "nutrition-plans.meals.delete",

    CREATE_FOOD = "nutrition-plans.meals.foods.create",
    UPDATE_FOOD = "nutrition-plans.meals.foods.update",
    DELETE_FOOD = "nutrition-plans.meals.foods.delete",
}