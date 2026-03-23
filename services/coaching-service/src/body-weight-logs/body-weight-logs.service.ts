import { Inject, Injectable } from '@nestjs/common';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { ActivityType } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TrainerMetricsService } from 'src/trainer-metrics/trainer-metrics.service';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationType } from 'src/common/enum/notification-type';

@Injectable()
export class BodyWeightLogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: ActivityLogService,
    private readonly trainerMetricsService: TrainerMetricsService,
    @Inject(INTERACTION_SERVICE)
    private readonly interactionService: ClientProxy,
  ) { }

  async create(dto: CreateBodyWeightLogDto) {
    const [log, trainer] = await Promise.all([
      this.prisma.bodyWeightLog.create({ data: dto }),
      this.prisma.trainerTrainee.findUnique({
        where: { traineeId: dto.traineeId },
      }),
    ]);
    if (!trainer) throw new RpcException({
      status: 404,
      message: "Trainer not found"
    });

    await Promise.all([
      this.logsService.createActivityLog({
        userId: trainer.trainerId,
        type: ActivityType.WEIGHT_LOGGED,
        title: "Weight Logged",
        description: `Logged body weight: ${dto.weight} kg`,
        metadata: {
          logId: log.id,
          weight: dto.weight,
          smm: dto.smm,
          pbf: dto.pbf,
        },
      }),
      this.trainerMetricsService.updateTrainerSuccessRate(trainer.trainerId),
    ]);

    const notificationPayload: CreateNotificationDto = {
      userId: trainer.trainerId,
      type: NotificationType.BODY_WEIGHT_LOGGED,
      message: `Logged body weight: ${dto.weight} kg`,
      metadata: {
        logId: log.id,
        weight: dto.weight,
        smm: dto.smm,
        pbf: dto.pbf,
      },
    }

    this.interactionService.emit(NotificationPattern.CREATE, notificationPayload)

    return log
  }

  async findByTrainee(traineeId: string) {
    return this.prisma.bodyWeightLog.findMany({ where: { traineeId } });
  }

  async findOne(id: string) {
    const log = await this.prisma.bodyWeightLog.findUnique({ where: { id } });
    if (!log) throw new RpcException({
      status: 404,
      message: "Body weight log not found"
    });
    return log;
  }

  async update(dto: UpdateBodyWeightLogDto) {
    await this.findOne(dto.id);
    return this.prisma.bodyWeightLog.update({
      where: { id: dto.id, traineeId: dto.traineeId },
      data: dto,
    });
  }

  async remove(id: string, traineeId: string) {
    await this.findOne(id);
    return this.prisma.bodyWeightLog.delete({ where: { id, traineeId } });
  }
}
