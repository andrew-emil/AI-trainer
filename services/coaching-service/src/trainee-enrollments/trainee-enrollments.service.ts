import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ActivityType } from '@prisma/client';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationType } from 'src/common/enum/notification-type';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { getTrainer, getUser } from 'src/common/utils/get-user.helper';
import { TrainerConversionUtil } from 'src/common/utils/trainer-conversion.util';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class TraineeEnrollmentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly activityLogService: ActivityLogService,
        @Inject(AUTH_SERVICE)
        private readonly authService: ClientProxy,
        @Inject(INTERACTION_SERVICE)
        private readonly interactionService: ClientProxy,
    ) { }

    async createTrainerRequest(
        dto: CreateEnrollmentDto,
    ) {
        const { traineeId, trainerId, sessionsCount } = dto;
        // 1️⃣ check if trainer exists
        const trainer = await getTrainer(this.authService, trainerId);
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
                throw new RpcException({
                    status: 400,
                    message: "You are already assigned to this trainer",
                });
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
            throw new RpcException({
                status: 400,
                message: "You already have a pending request with this trainer",
            });
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
        });

        const user = await getUser(this.authService, traineeId);

        const notificationPayload: CreateNotificationDto = {
            userId: trainerId,
            type: NotificationType.NEW_TRAINEE_REQUESTED,
            message: `Trainee ${user.username} requested a new membership`,
            actionUrl: `/dashboard/requests`,
            metadata: {
                requestId: newRequest.id,
                trainerId,
                trainerUsername: user.username,
                trainerName: user.username,
                sessionsCount,
            },
        }

        this.interactionService.emit(
            NotificationPattern.CREATE,
            notificationPayload,
        );

        // Log activity for trainer request
        await this.activityLogService.createActivityLog({
            userId: traineeId,
            type: ActivityType.TRAINER_REQUESTED,
            title: "Trainer Requested",
            description: `Requested trainer ${user?.username || "Unknown"}`,
            metadata: {
                requestId: newRequest.id,
                trainerId,
                trainerUsername: user?.username,
                trainerName: user?.username, // Add both for fallback
                sessionsCount,
            },
        });

        return TrainerConversionUtil.transformTrainer(newRequest);
    }

    async getAssignedTrainers(traineeId: string) {
        const relation = await this.prisma.trainerTrainee.findUnique({
            where: { traineeId },
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

        return await this.prisma.traineeWorkoutPlan.findMany({
            where: {
                traineeId,
                plan: { trainerId: trainerTrainee.trainerId },
            },
            include: { plan: true },
        });
    }

    async getAssignedNutritionPlans(traineeId: string) {
        const trainerTrainee = await this.prisma.trainerTrainee.findUnique({
            where: { traineeId },
        });

        if (!trainerTrainee || trainerTrainee.membershipStatus === "inactive") {
            throw new ForbiddenException(
                "Your membership is inactive. Please renew to access your plans.",
            );
        }

        return await this.prisma.traineeNutritionPlan.findMany({
            where: {
                traineeId,
                nutritionPlan: { trainerId: trainerTrainee.trainerId },
            },
            include: { nutritionPlan: true },
        });
    }
}
