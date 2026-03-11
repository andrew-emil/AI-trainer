-- CreateEnum
CREATE TYPE "membershipStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected', 'cancelled_by_the_trainee');

-- CreateEnum
CREATE TYPE "TraineeGoal" AS ENUM ('cut', 'bulk', 'maintenance', 'strength', 'body_recomb');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('WORKOUT_COMPLETED', 'NUTRITION_PLAN_ASSIGNED', 'WEIGHT_LOGGED', 'TRAINER_REQUESTED', 'MEMBERSHIP_RENEWED');

-- CreateTable
CREATE TABLE "TrainerTrainee" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "membershipStatus" "membershipStatus" NOT NULL DEFAULT 'active',
    "sessionsCount" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainerTrainee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerTraineeRequest" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "sessionsCount" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "TrainerTraineeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "targetMuscles" TEXT[],
    "bodyParts" TEXT[],
    "equipments" TEXT[],
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyPart" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BodyPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goal" "TraineeGoal" NOT NULL,
    "weeks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutDay" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,

    CONSTRAINT "WorkoutDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutDayExercise" (
    "id" TEXT NOT NULL,
    "workoutDayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "repsMin" INTEGER NOT NULL,
    "repsMax" INTEGER NOT NULL,
    "restSeconds" INTEGER,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "WorkoutDayExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraineeWorkoutPlan" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TraineeWorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraineeNutritionPlan" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "nutritionPlanId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TraineeNutritionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "totalDuration" INTEGER,
    "totalRestTime" INTEGER,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "totalRest" INTEGER,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSet" (
    "id" TEXT NOT NULL,
    "workoutExerciseId" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "rir" DOUBLE PRECISION,
    "duration" INTEGER,
    "restAfter" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyWeightLog" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "smm" DOUBLE PRECISION,
    "pbf" DOUBLE PRECISION,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyWeightLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerReview" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainerReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerMetrics" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "activeTraineesCount" INTEGER NOT NULL DEFAULT 0,
    "successRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alternate_names" TEXT[],
    "description" TEXT,
    "type" TEXT,
    "tags" TEXT[],
    "serving" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "searchDocument" tsvector,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodMacros" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FoodMacros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodNutrient" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "FoodNutrient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionPlan" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goal" "TraineeGoal" NOT NULL,
    "weeks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NutritionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionDay" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,

    CONSTRAINT "NutritionDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionMeal" (
    "id" TEXT NOT NULL,
    "nutritionDayId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "time" TEXT,

    CONSTRAINT "NutritionMeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionDayFood" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "NutritionDayFood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainerTrainee_traineeId_key" ON "TrainerTrainee"("traineeId");

-- CreateIndex
CREATE INDEX "TrainerTrainee_trainerId_idx" ON "TrainerTrainee"("trainerId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerTrainee_trainerId_traineeId_key" ON "TrainerTrainee"("trainerId", "traineeId");

-- CreateIndex
CREATE INDEX "TrainerTraineeRequest_trainerId_idx" ON "TrainerTraineeRequest"("trainerId");

-- CreateIndex
CREATE INDEX "TrainerTraineeRequest_traineeId_idx" ON "TrainerTraineeRequest"("traineeId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE INDEX "Exercise_targetMuscles_idx" ON "Exercise"("targetMuscles");

-- CreateIndex
CREATE INDEX "Exercise_bodyParts_idx" ON "Exercise"("bodyParts");

-- CreateIndex
CREATE INDEX "Exercise_equipments_idx" ON "Exercise"("equipments");

-- CreateIndex
CREATE UNIQUE INDEX "Muscle_name_key" ON "Muscle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BodyPart_name_key" ON "BodyPart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- CreateIndex
CREATE INDEX "WorkoutPlan_trainerId_idx" ON "WorkoutPlan"("trainerId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutDay_planId_dayIndex_key" ON "WorkoutDay"("planId", "dayIndex");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutDayExercise_workoutDayId_orderIndex_key" ON "WorkoutDayExercise"("workoutDayId", "orderIndex");

-- CreateIndex
CREATE INDEX "TraineeWorkoutPlan_traineeId_idx" ON "TraineeWorkoutPlan"("traineeId");

-- CreateIndex
CREATE INDEX "TraineeWorkoutPlan_planId_idx" ON "TraineeWorkoutPlan"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "TraineeWorkoutPlan_traineeId_planId_key" ON "TraineeWorkoutPlan"("traineeId", "planId");

-- CreateIndex
CREATE INDEX "TraineeNutritionPlan_traineeId_idx" ON "TraineeNutritionPlan"("traineeId");

-- CreateIndex
CREATE INDEX "TraineeNutritionPlan_nutritionPlanId_idx" ON "TraineeNutritionPlan"("nutritionPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "TraineeNutritionPlan_traineeId_nutritionPlanId_key" ON "TraineeNutritionPlan"("traineeId", "nutritionPlanId");

-- CreateIndex
CREATE INDEX "WorkoutSession_traineeId_startedAt_idx" ON "WorkoutSession"("traineeId", "startedAt");

-- CreateIndex
CREATE INDEX "WorkoutExercise_sessionId_idx" ON "WorkoutExercise"("sessionId");

-- CreateIndex
CREATE INDEX "WorkoutSet_workoutExerciseId_idx" ON "WorkoutSet"("workoutExerciseId");

-- CreateIndex
CREATE INDEX "BodyWeightLog_traineeId_loggedAt_idx" ON "BodyWeightLog"("traineeId", "loggedAt");

-- CreateIndex
CREATE INDEX "ActivityLog_userId_createdAt_idx" ON "ActivityLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ActivityLog_type_idx" ON "ActivityLog"("type");

-- CreateIndex
CREATE INDEX "TrainerReview_trainerId_idx" ON "TrainerReview"("trainerId");

-- CreateIndex
CREATE INDEX "TrainerReview_traineeId_idx" ON "TrainerReview"("traineeId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerReview_trainerId_traineeId_key" ON "TrainerReview"("trainerId", "traineeId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerMetrics_trainerId_key" ON "TrainerMetrics"("trainerId");

-- CreateIndex
CREATE INDEX "Food_searchDocument_idx" ON "Food" USING GIN ("searchDocument");

-- CreateIndex
CREATE UNIQUE INDEX "FoodMacros_foodId_key" ON "FoodMacros"("foodId");

-- CreateIndex
CREATE INDEX "FoodNutrient_foodId_idx" ON "FoodNutrient"("foodId");

-- CreateIndex
CREATE INDEX "FoodNutrient_key_idx" ON "FoodNutrient"("key");

-- CreateIndex
CREATE UNIQUE INDEX "FoodNutrient_foodId_key_key" ON "FoodNutrient"("foodId", "key");

-- CreateIndex
CREATE INDEX "NutritionPlan_trainerId_idx" ON "NutritionPlan"("trainerId");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionDay_planId_dayIndex_key" ON "NutritionDay"("planId", "dayIndex");

-- CreateIndex
CREATE INDEX "NutritionMeal_nutritionDayId_idx" ON "NutritionMeal"("nutritionDayId");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionMeal_nutritionDayId_orderIndex_key" ON "NutritionMeal"("nutritionDayId", "orderIndex");

-- CreateIndex
CREATE INDEX "NutritionDayFood_mealId_idx" ON "NutritionDayFood"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionDayFood_mealId_orderIndex_key" ON "NutritionDayFood"("mealId", "orderIndex");

-- AddForeignKey
ALTER TABLE "WorkoutDay" ADD CONSTRAINT "WorkoutDay_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutDayExercise" ADD CONSTRAINT "WorkoutDayExercise_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "WorkoutDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutDayExercise" ADD CONSTRAINT "WorkoutDayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeWorkoutPlan" ADD CONSTRAINT "TraineeWorkoutPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeNutritionPlan" ADD CONSTRAINT "TraineeNutritionPlan_nutritionPlanId_fkey" FOREIGN KEY ("nutritionPlanId") REFERENCES "NutritionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "WorkoutDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMacros" ADD CONSTRAINT "FoodMacros_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodNutrient" ADD CONSTRAINT "FoodNutrient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionDay" ADD CONSTRAINT "NutritionDay_planId_fkey" FOREIGN KEY ("planId") REFERENCES "NutritionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionMeal" ADD CONSTRAINT "NutritionMeal_nutritionDayId_fkey" FOREIGN KEY ("nutritionDayId") REFERENCES "NutritionDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionDayFood" ADD CONSTRAINT "NutritionDayFood_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "NutritionMeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionDayFood" ADD CONSTRAINT "NutritionDayFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
