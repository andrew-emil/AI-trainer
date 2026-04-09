import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationType } from 'src/common/enum/notification-type';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { getTrainee, getTraineeWithUser } from 'src/common/utils/get-user.helper';
import { CreateTraineeNutritionPlanDto } from './dto/create-trainee-nutrition-plan.dto';
import { UpdateTraineeNutritionPlanDto } from './dto/update-trainee-nutrition-plan.dto';

@Injectable()
export class NutritionPlanAssignmentService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(AUTH_SERVICE)
        private readonly authService: ClientProxy,
        @Inject(INTERACTION_SERVICE)
        private readonly interactionService: ClientProxy,
    ) { }

    // Assign Nutrition Plan to Trainee
    async assignNutritionPlan(dto: CreateTraineeNutritionPlanDto) {
        const plan = await this.prisma.nutritionPlan.findUnique({
            where: { id: dto.nutritionPlanId },
        });
        if (!plan) throw new RpcException({ code: 404, message: "Nutrition plan not found" });

        await getTrainee(this.authService, dto.traineeId);

        // تحقق العلاقة بين المدرب والمتدرب
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
            await this.prisma.traineeNutritionPlan.updateMany({
                where: { traineeId: dto.traineeId, active: true },
                data: { active: false },
            });
        }

        // تحقق إن الخطة لم تُعين مسبقاً للمتدرب
        const exists = await this.prisma.traineeNutritionPlan.findUnique({
            where: {
                traineeId_nutritionPlanId: {
                    traineeId: dto.traineeId,
                    nutritionPlanId: dto.nutritionPlanId,
                },
            },
        });
        if (exists)
            throw new RpcException({
                code: 400,
                message: "Trainee already assigned to this nutrition plan",
            });

        const traineeNutritionPlan = await this.prisma.traineeNutritionPlan.create({
            data: {
                traineeId: dto.traineeId,
                nutritionPlanId: dto.nutritionPlanId,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                active: dto.active ?? true,
            },
        });

        // Notify Trainee about assigned nutrition plan
        const payload: CreateNotificationDto = {
            userId: dto.traineeId,
            type: NotificationType.NUTRITION_PLAN_ASSIGNED,
            message: `Your trainer assigned you a new nutrition plan: ${plan.name}`,
            metadata: { planId: dto.nutritionPlanId },
        };
        this.interactionService.emit(NotificationPattern.CREATE, payload);

        return traineeNutritionPlan;
    }

    async updateNutritionPlanAssignment(
        traineeId: string,
        dto: UpdateTraineeNutritionPlanDto
    ) {
        const { nutritionPlanId } = dto;
        const assignment = await this.prisma.traineeNutritionPlan.findUnique({
            where: { traineeId_nutritionPlanId: { traineeId, nutritionPlanId } },
        });
        if (!assignment)
            throw new RpcException({ code: 404, message: "Trainee-NutritionPlan assignment not found" });
        return this.prisma.traineeNutritionPlan.update({
            where: { traineeId_nutritionPlanId: { traineeId, nutritionPlanId } },
            data: {
                startDate: dto.startDate
                    ? new Date(dto.startDate)
                    : assignment.startDate,
                endDate: dto.endDate ? new Date(dto.endDate) : assignment.endDate,
            },
        });
    }

    // Change active status of a Nutrition Plan for a Trainee
    async setNutritionPlanActiveStatus(
        traineeId: string,
        nutritionPlanId: string,
        active: boolean,
    ) {
        const assignment = await this.prisma.traineeNutritionPlan.findUnique({
            where: { traineeId_nutritionPlanId: { traineeId, nutritionPlanId } },
        });
        if (!assignment)
            throw new RpcException({ code: 404, message: "Trainee-NutritionPlan assignment not found" });

        if (active) {
            await this.prisma.traineeNutritionPlan.updateMany({
                where: { traineeId, active: true },
                data: { active: false },
            });
        }

        return this.prisma.traineeNutritionPlan.update({
            where: { traineeId_nutritionPlanId: { traineeId, nutritionPlanId } },
            data: { active },
        });
    }

    // Get assigned Nutrition Plan for a Trainee
    async getAssignedNutritionPlanForTrainee(
        traineeId: string,
        status?: boolean,
    ) {
        return this.prisma.traineeNutritionPlan.findFirst({
            where: {
                traineeId,
                ...(status !== undefined ? { active: status } : {}),
            },
            include: { nutritionPlan: true },
        });
    }

    async getAllTraineesAndTheirAssignedNutritionPlans(trainerId: string) {
        const trainerTrainees = await this.prisma.trainerTrainee.findMany({
            where: { trainerId, membershipStatus: "active" },
        });

        const result = await Promise.all(
            trainerTrainees.map(async (relation) => {
                const assignedPlan = await this.getAssignedNutritionPlanForTrainee(
                    relation.traineeId,
                );

                const traineeUser = await getTraineeWithUser(this.authService, relation.traineeId);

                return {
                    trainee: traineeUser,
                    assignedPlan: assignedPlan?.nutritionPlan ?? null,
                };
            }),
        );

        return result;
    }

    // Unassign Nutrition Plan from Trainee
    async unassignNutritionPlan(traineeId: string, nutritionPlanId: string) {
        const assignment = await this.prisma.traineeNutritionPlan.findUnique({
            where: { traineeId_nutritionPlanId: { traineeId, nutritionPlanId } },
        });
        if (!assignment)
            throw new RpcException({ code: 404, message: "Trainee-NutritionPlan assignment not found" });

        const deletedNutritionPlan = await this.prisma.traineeNutritionPlan.delete({
            where: { traineeId_nutritionPlanId: { traineeId, nutritionPlanId } },
        });

        // Notify Trainee about unassigned nutrition plan
        const payload: CreateNotificationDto = {
            userId: traineeId,
            type: NotificationType.NUTRITION_PLAN_UNASSIGNED,
            message: `Your nutrition plan has been unassigned by your trainer.`,
            metadata: { planId: nutritionPlanId },
        };
        this.interactionService.emit(NotificationPattern.CREATE, payload);

        return deletedNutritionPlan;
    }
}
