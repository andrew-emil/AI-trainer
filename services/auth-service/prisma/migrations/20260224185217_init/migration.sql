-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('trainer', 'trainee', 'admin');

-- CreateEnum
CREATE TYPE "TraineeGoal" AS ENUM ('cut', 'bulk', 'maintenance', 'strength', 'body_recomb');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'unknown');

-- CreateEnum
CREATE TYPE "TrainerApplicationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "membershipStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected', 'cancelled_by_the_trainee');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'unknown',
    "avatar" TEXT,
    "avatarPublicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainee" (
    "userId" TEXT NOT NULL,
    "goal" "TraineeGoal" NOT NULL,
    "heightCm" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "userId" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "experienceYears" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "rankScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "TrainerCertification" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT,
    "trainerRequestId" TEXT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "issuedBy" TEXT,
    "issuedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainerCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerTransformation" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT,
    "trainerRequestId" TEXT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerTransformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "TrainerApplicationStatus" NOT NULL DEFAULT 'pending',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_idx" ON "RefreshSession"("userId");

-- CreateIndex
CREATE INDEX "RefreshSession_expiresAt_idx" ON "RefreshSession"("expiresAt");

-- CreateIndex
CREATE INDEX "RefreshSession_refreshHash_idx" ON "RefreshSession"("refreshHash");

-- CreateIndex
CREATE INDEX "TrainerCertification_trainerId_idx" ON "TrainerCertification"("trainerId");

-- CreateIndex
CREATE INDEX "TrainerCertification_trainerRequestId_idx" ON "TrainerCertification"("trainerRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerCertification_trainerId_name_imageUrl_key" ON "TrainerCertification"("trainerId", "name", "imageUrl");

-- CreateIndex
CREATE INDEX "TrainerTransformation_trainerId_idx" ON "TrainerTransformation"("trainerId");

-- CreateIndex
CREATE INDEX "TrainerTransformation_trainerRequestId_idx" ON "TrainerTransformation"("trainerRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerTransformation_trainerId_name_imageUrl_key" ON "TrainerTransformation"("trainerId", "name", "imageUrl");

-- CreateIndex
CREATE INDEX "ResetPasswordToken_userId_idx" ON "ResetPasswordToken"("userId");

-- CreateIndex
CREATE INDEX "ResetPasswordToken_expiresAt_idx" ON "ResetPasswordToken"("expiresAt");

-- CreateIndex
CREATE INDEX "ResetPasswordToken_tokenHash_idx" ON "ResetPasswordToken"("tokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerApplication_userId_key" ON "TrainerApplication"("userId");

-- CreateIndex
CREATE INDEX "TrainerApplication_status_idx" ON "TrainerApplication"("status");

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerCertification" ADD CONSTRAINT "TrainerCertification_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerCertification" ADD CONSTRAINT "TrainerCertification_trainerRequestId_fkey" FOREIGN KEY ("trainerRequestId") REFERENCES "TrainerApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerTransformation" ADD CONSTRAINT "TrainerTransformation_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerTransformation" ADD CONSTRAINT "TrainerTransformation_trainerRequestId_fkey" FOREIGN KEY ("trainerRequestId") REFERENCES "TrainerApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerApplication" ADD CONSTRAINT "TrainerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
