import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ActivityType } from '@prisma/client';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationType } from 'src/common/enum/notification-type';
import { ChatPattern } from 'src/common/patterns/chat.pattern';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { getUser } from 'src/common/utils/get-user.helper';
import { TrainerMetricsService } from 'src/trainer-metrics/trainer-metrics.service';
import { TraineeRequestResponseDto } from './dto/trainee-request-response.dto';

@Injectable()
export class TrainerTraineesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLogService: ActivityLogService,
    private readonly trainerMetricsService: TrainerMetricsService,
    @Inject(INTERACTION_SERVICE)
    private readonly interactionService: ClientProxy,
    @Inject(AUTH_SERVICE)
    private readonly authService: ClientProxy,
  ) { }

  async getTraineeRequests(
    trainerId: string,
  ): Promise<TraineeRequestResponseDto[]> {
    const requests = await this.prisma.trainerTraineeRequest.findMany({
      where: { trainerId },
      orderBy: { createdAt: "desc" },
    });

    const user = await getUser(this.authService, trainerId)

    return requests.map(
      (request) =>
        new TraineeRequestResponseDto({
          id: request.id,
          trainerId: request.trainerId,
          traineeId: request.traineeId,
          traineeName:
            user.firstName +
            " " +
            user.lastName,
          sessionsCount: request.sessionsCount,
          status: request.status,
          createdAt: request.createdAt,
          respondedAt: request.respondedAt ?? undefined,
        }),
    );
  }

  async processTraineeRequest(reqId: string, approve: boolean) {
    return this.prisma.$transaction(async (tx) => {
      const request = await tx.trainerTraineeRequest.findFirst({
        where: { id: reqId, status: "pending" },
      });
      if (!request) {
        throw new RpcException({
          status: 404,
          message: "Pending request not found"
        });
      }

      const updatedRequest = await tx.trainerTraineeRequest.update({
        where: { id: request.id },
        data: {
          status: approve ? "approved" : "rejected",
          respondedAt: new Date(),
        },
      });

      if (!approve) {
        await this.sendRequestResponseNotification(
          request.traineeId,
          request.trainerId,
          false,
        );
        return { request: updatedRequest };
      }

      // Handle TrainerTrainee: Update if exists, Create if not
      const existingTrainee = await tx.trainerTrainee.findUnique({
        where: { traineeId: request.traineeId },
      });

      let trainerTrainee;

      if (existingTrainee) {
        const isSameTrainer = existingTrainee.trainerId === request.trainerId;

        if (isSameTrainer) {
          // Renewal: Update sessions and set active
          const wasInactive = existingTrainee.membershipStatus === "inactive";
          trainerTrainee = await tx.trainerTrainee.update({
            where: { id: existingTrainee.id },
            data: {
              sessionsCount: request.sessionsCount,
              membershipStatus: "active",
              assignedAt: new Date(),
            },
          });

          // If they were inactive, increment active count
          if (wasInactive) {
            await tx.trainerMetrics.upsert({
              where: { trainerId: request.trainerId },
              create: {
                trainerId: request.trainerId,
                activeTraineesCount: 1,
                successRate: 0,
              },
              update: { activeTraineesCount: { increment: 1 } },
            });
            await this.trainerMetricsService.calculateRankScore(request.trainerId, tx as any);

            // Fetch trainer's username for activity log metadata
            const trainerUser = await getUser(this.authService, request.trainerId);

            // Log activity for membership renewal
            await this.activityLogService.createActivityLog({
              userId: request.traineeId,
              type: ActivityType.MEMBERSHIP_RENEWED,
              title: "Membership Renewed",
              description: `Renewed membership with trainer`,
              metadata: {
                trainerId: request.trainerId,
                trainerUsername: trainerUser?.username,
                trainerName: trainerUser?.username, // Add both for fallback
                sessionsCount: request.sessionsCount,
              },
            });
          }
        } else {
          // Switch Trainer
          const wasActive = existingTrainee.membershipStatus === "active";

          // 1. Decrement old trainer if active
          if (wasActive) {
            const oldMetrics = await tx.trainerMetrics.findUnique({
              where: { trainerId: existingTrainee.trainerId },
            });
            if (oldMetrics) {
              await tx.trainerMetrics.update({
                where: { trainerId: existingTrainee.trainerId },
                data: {
                  activeTraineesCount: Math.max(
                    0,
                    oldMetrics.activeTraineesCount - 1,
                  ),
                },
              });
              await this.trainerMetricsService.calculateRankScore(existingTrainee.trainerId, tx as any);
            }
          }

          // Notify old trainer
          const oldTrainerId = existingTrainee.trainerId;
          const traineeUser = await getUser(this.authService, request.traineeId);

          if (oldTrainerId) {
            const payload: CreateNotificationDto = {
              userId: oldTrainerId,
              type: NotificationType.TRAINER_UNASSIGNED,
              message: `Trainee ${traineeUser?.username || "Unknown"} has switched to another trainer.`,
              metadata: { traineeId: request.traineeId },
            };
            this.interactionService.emit(NotificationPattern.CREATE, payload);
          }

          // Unassign all plans when switching trainers
          await Promise.all([
            tx.traineeWorkoutPlan.deleteMany({
              where: { traineeId: request.traineeId },
            }),
            tx.traineeNutritionPlan.deleteMany({
              where: { traineeId: request.traineeId },
            }),
          ]);

          // 2. Update record to new trainer
          trainerTrainee = await tx.trainerTrainee.update({
            where: { id: existingTrainee.id },
            data: {
              trainerId: request.trainerId,
              sessionsCount: request.sessionsCount,
              membershipStatus: "active",
              assignedAt: new Date(),
            },
          });

          // 3. Increment new trainer
          await tx.trainerMetrics.upsert({
            where: { trainerId: request.trainerId },
            create: {
              trainerId: request.trainerId,
              activeTraineesCount: 1,
              successRate: 0,
            },
            update: { activeTraineesCount: { increment: 1 } },
          });
          await this.trainerMetricsService.calculateRankScore(request.trainerId, tx as any);
        }
      } else {
        // Create new
        trainerTrainee = await tx.trainerTrainee.create({
          data: {
            trainerId: request.trainerId,
            traineeId: request.traineeId,
            sessionsCount: request.sessionsCount,
            membershipStatus: "active",
            assignedAt: new Date(),
          },
        });

        // Increment metrics
        await tx.trainerMetrics.upsert({
          where: { trainerId: request.trainerId },
          create: {
            trainerId: request.trainerId,
            activeTraineesCount: 1,
            successRate: 0,
          },
          update: { activeTraineesCount: { increment: 1 } },
        });
        await this.trainerMetricsService.calculateRankScore(request.trainerId, tx as any);
      }

      this.interactionService.send(
        ChatPattern.CREATE_CONVERSATION,
        {
          trainerId: request.trainerId,
          traineeId: request.traineeId,
        }
      )

      await this.sendRequestResponseNotification(
        request.traineeId,
        request.trainerId,
        true,
      );

      return { request: updatedRequest, trainerTrainee };
    });
  }

  async getAssignedTrainees(trainerId: string) {
    const relations = await this.prisma.trainerTrainee.findMany({
      where: { trainerId },
    });

    const users = await Promise.all(relations.map(async (relation) => {
      const user = await getUser(this.authService, relation.traineeId);
      return { ...relation, user };
    }));

    return users;
  }

  async unassignTrainee(trainerId: string, traineeId: string) {
    await new Promise((resolve) => process.nextTick(resolve));
    return this.prisma.$transaction(async (tx) => {
      const relation = await tx.trainerTrainee.findFirst({
        where: { trainerId, traineeId, membershipStatus: "active" },
      });
      if (!relation) {
        throw new RpcException({
          status: 404,
          message: "Trainer-Trainee relation not found"
        });
      }

      // Remove assigned workout and nutrition plans directly instead of using undefined methods
      await tx.traineeWorkoutPlan.deleteMany({
        where: { traineeId },
      });
      await tx.traineeNutritionPlan.deleteMany({
        where: { traineeId },
      });

      // Update metrics
      const metrics = await tx.trainerMetrics.findUnique({
        where: { trainerId },
      });
      if (metrics) {
        await tx.trainerMetrics.update({
          where: { trainerId },
          data: {
            activeTraineesCount: Math.max(0, metrics.activeTraineesCount - 1),
          },
        });
      }

      await this.trainerMetricsService.calculateRankScore(trainerId, tx as any);

      // Notify Trainee about unassignment
      const notificationPayload: CreateNotificationDto = {
        userId: traineeId,
        type: NotificationType.TRAINER_UNASSIGNED as any,
        message: `You have been unassigned by your trainer.`,
        metadata: { trainerId },
      };
      this.interactionService.emit(NotificationPattern.CREATE, notificationPayload);

      return tx.trainerTrainee.delete({ where: { id: relation.id } });
    });
  }

  private async sendRequestResponseNotification(traineeId: string, trainerId: string, approved: boolean) {
    const payload: CreateNotificationDto = {
      userId: traineeId,
      type: approved ? NotificationType.TRAINEE_REQUEST_APPROVED as any : NotificationType.TRAINEE_REQUEST_REJECTED as any,
      message: approved ? 'Your trainer request has been approved' : 'Your trainer request has been rejected',
      metadata: { trainerId, approved },
    };
    this.interactionService.emit(NotificationPattern.CREATE, payload);
  }

}
