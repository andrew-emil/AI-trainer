import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ActivityType } from 'src/common/enums/activityType.enum';
import { ActivityPatterns, NotificationPatterns } from 'src/common/enums/traineePatterns.enum';
import { TrainerConversionUtil } from 'src/common/utils/trainer-conversion.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { RabbitProducerService } from 'src/rabbit-producer/rabbit-producer.service';

@Injectable()
export class RequestsProvider {
    constructor(
        private readonly prisma: PrismaService,
        private readonly rabbitProducerService: RabbitProducerService,
    ) { }

    async createTrainerRequest(traineeId: string, trainerId: string, sessionsCount: number) {
        // 1️⃣ check if trainer exists
        const trainer = await this.prisma.trainer.findUnique({
            where: { userId: trainerId },
            include: { user: true },
        });
        if (!trainer) {
            throw new NotFoundException("Trainer not found");
        }
        // 2️⃣ check active membership
        const existingMembership = await this.prisma.trainerTrainee.findFirst({
            where: {
                trainerId,
                traineeId,
                sessionsCount,
            },
        });

        if (existingMembership) {
            if (existingMembership.sessionsCount > 0) {
                throw new BadRequestException(
                    "You are already assigned to this trainer",
                );
            }
        }

        // 3️⃣ check pending request with the same trainer
        const pendingRequest = await this.prisma.trainerTraineeRequest.findFirst({
            where: {
                trainerId,
                traineeId,
                status: "pending",
            },
        });

        if (pendingRequest) {
            throw new BadRequestException(
                "You already have a pending request with this trainer",
            );
        }

        // 4️⃣ cancel any existing pending requests for other trainers
        await this.prisma.trainerTraineeRequest.updateMany({
            where: {
                traineeId,
                status: "pending",
            },
            data: {
                status: "cancelled_by_the_trainee" as any,
            },
        });

        // 5️⃣ create request
        const newRequest = await this.prisma.trainerTraineeRequest.create({
            data: {
                trainerId,
                traineeId,
                sessionsCount,
                status: "pending",
            },
            include: {
                trainee: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        this.rabbitProducerService.emitPatternToInteractionDomain(NotificationPatterns.SEND, {
            userId: trainerId,
            notification: {
                title: "Trainer Requested",
                description: `Requested trainer ${trainer.user?.username || "Unknown"}`,
                metadata: {
                    requestId: newRequest.id,
                    trainerId,
                    trainerUsername: trainer.user?.username,
                    trainerName: trainer.user?.username, // Add both for fallback
                    sessionsCount,
                },
            },
        });

        this.rabbitProducerService.emitPatternToInteractionDomain(ActivityPatterns.CREATE, {
            userId: traineeId,
            type: ActivityType.TRAINER_REQUESTED,
            title: "Trainer Requested",
            description: `Requested trainer ${trainer.user?.username || "Unknown"}`,
            metadata: {
                requestId: newRequest.id,
                trainerId,
                trainerUsername: trainer.user?.username,
                trainerName: trainer.user?.username, // Add both for fallback
                sessionsCount,
            },
        });

        return TrainerConversionUtil.transformTrainer(newRequest);
    }

    async getAssignedTrainers(traineeId: string) {
        const relation = await this.prisma.trainerTrainee.findUnique({
            where: { traineeId },
            include: { trainer: { include: { user: true } } },
        });
        return TrainerConversionUtil.transformTrainerTrainee(relation);
    }

    async getAssignedWorkoutPlans(traineeId: string) {
        const trainerTrainee = await this.prisma.trainerTrainee.findUnique({
            where: { traineeId },
        });

        if (!trainerTrainee || trainerTrainee.membershipStatus === "inactive") {
            throw new ForbiddenException(
                "Your membership is inactive. Please renew to access your plans.",
            );
        }

        //TODO: implement workout plans
        // return await this.prisma.traineeWorkoutPlan.findMany({
        //     where: {
        //         traineeId,
        //         plan: { trainerId: trainerTrainee.trainerId },
        //     },
        //     include: { plan: true },
        // });
    }
}
