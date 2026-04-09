import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationType } from 'src/common/enum/notification-type';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { getTrainee, getTraineeWithUser } from 'src/common/utils/get-user.helper';
import { CreateTraineeWorkoutPlanDto } from './dto/create-trainee-workout-plan.dto';
import { UpdateTraineeWorkoutPlanDto } from './dto/update-trainee-workout-plan.dto';

@Injectable()
export class WorkoutAssignmentService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(AUTH_SERVICE)
        private readonly authService: ClientProxy,
        @Inject(INTERACTION_SERVICE)
        private readonly interactionService: ClientProxy,
    ) { }

    async assignWorkoutPlan(dto: CreateTraineeWorkoutPlanDto) {
        const plan = await this.prisma.workoutPlan.findUnique({
            where: { id: dto.planId },
        });
        if (!plan) throw new RpcException({ code: 404, message: "Workout plan not found" });

        await getTrainee(this.authService, dto.traineeId);

        const trainerTrainee = await this.prisma.trainerTrainee.findUnique({
            where: { trainerId: plan.trainerId, traineeId: dto.traineeId },
        });
        if (!trainerTrainee) {
            throw new RpcException({
                code: 400,
                message: "This trainee is not assigned to the trainer of this plan",
            });
        }

        // إذا active=true، غير أي خطط سابقة للمتدرب إلى inactive
        if (dto.active ?? true) {
            await this.prisma.traineeWorkoutPlan.updateMany({
                where: { traineeId: dto.traineeId, active: true },
                data: { active: false },
            });
        }

        // تحقق إن الخطة لم تُعين مسبقاً للمتدرب
        const exists = await this.prisma.traineeWorkoutPlan.findUnique({
            where: {
                traineeId_planId: { traineeId: dto.traineeId, planId: dto.planId },
            },
        });
        if (exists)
            throw new RpcException({ code: 400, message: "Trainee already assigned to this plan" });

        const traineeWorkoutPlan = await this.prisma.traineeWorkoutPlan.create({
            data: {
                planId: dto.planId,
                traineeId: dto.traineeId,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                active: dto.active ?? true,
            },
        });

        // Notify Trainee about assigned workout plan
        const payload: CreateNotificationDto = {
            userId: dto.traineeId,
            type: NotificationType.WORKOUT_PLAN_ASSIGNED,
            message: `Your trainer assigned you a new workout plan: ${plan.name}`,
            metadata: { planId: dto.planId },
        };
        this.interactionService.emit(NotificationPattern.CREATE, payload);

        return traineeWorkoutPlan;
    }

    async updateWorkoutPlanAssignment(traineeId: string, dto: UpdateTraineeWorkoutPlanDto) {
        const { id: planId } = dto;
        const assignment = await this.prisma.traineeWorkoutPlan.findUnique({
            where: { traineeId_planId: { traineeId, planId } },
        });
        if (!assignment)
            throw new RpcException({ code: 404, message: "Trainee-WorkoutPlan assignment not found" });
        return this.prisma.traineeWorkoutPlan.update({
            where: { traineeId_planId: { traineeId, planId } },
            data: {
                startDate: dto.startDate
                    ? new Date(dto.startDate)
                    : assignment.startDate,
                endDate: dto.endDate ? new Date(dto.endDate) : assignment.endDate,
            },
        });
    }

    async setWorkoutPlanActiveStatus(traineeId: string, planId: string, active: boolean) {
        const assignment = await this.prisma.traineeWorkoutPlan.findUnique({
            where: { traineeId_planId: { traineeId, planId } },
        });
        if (!assignment)
            throw new RpcException({ code: 404, message: "Trainee-WorkoutPlan assignment not found" });
        if (active) {
            await this.prisma.traineeWorkoutPlan.updateMany({
                where: { traineeId, active: true },
                data: { active: false },
            });
        }
        return this.prisma.traineeWorkoutPlan.update({
            where: { traineeId_planId: { traineeId, planId } },
            data: { active },
        });
    }

    async getAssignedWorkoutPlanForTrainee(traineeId: string, status?: boolean, tx?: Prisma.TransactionClient) {
        const prisma = tx || this.prisma;
        return prisma.traineeWorkoutPlan.findFirst({
            where: {
                traineeId,
                ...(status !== undefined ? { active: status } : {}),
            },
            include: { plan: true },
        });
    }

    async getAllTraineesAndTheirAssignedPlans(trainerId: string) {
        // جلب جميع المتدربين المرتبطين بالمدرب
        const trainerTrainees = await this.prisma.trainerTrainee.findMany({
            where: { trainerId, membershipStatus: "active" },
        });

        // استخدام Promise.all لتسريع جلب الخطط لكل متدرب
        const result = await Promise.all(
            trainerTrainees.map(async (relation) => {
                // جلب خطة المتدرب الحالية (active=true)
                const assignedPlan = await this.getAssignedWorkoutPlanForTrainee(
                    relation.traineeId,
                );

                const traineeUser = await getTraineeWithUser(this.authService, relation.traineeId)

                return {
                    trainee: traineeUser,
                    assignedPlan: assignedPlan?.plan ?? null,
                };
            }),
        );

        return result;
    }

    async unassignWorkoutPlan(traineeId: string, planId: string, tx?: Prisma.TransactionClient) {
        const prisma = tx || this.prisma;
        const assignment = await prisma.traineeWorkoutPlan.findUnique({
            where: { traineeId_planId: { traineeId, planId } },
        });
        if (!assignment)
            throw new RpcException({ code: 404, message: "Trainee-WorkoutPlan assignment not found" });
        const deletedPlan = await prisma.traineeWorkoutPlan.delete({
            where: { traineeId_planId: { traineeId, planId } },
        });

        // Notify Trainee about unassigned workout plan
        const payload: CreateNotificationDto = {
            userId: traineeId,
            type: NotificationType.WORKOUT_PLAN_UNASSIGNED,
            message: `Your workout plan has been unassigned by your trainer.`,
            metadata: { planId },
        };
        this.interactionService.emit(NotificationPattern.CREATE, payload);

        return deletedPlan;
    }
}
