import { Injectable } from '@nestjs/common';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { ActivityType } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BodyWeightLogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: ActivityLogService
  ) { }

  async create(dto: CreateBodyWeightLogDto) {
    const log = await this.prisma.bodyWeightLog.create({ data: dto });

    //TODO: send notification to trainer
    await this.logsService.createActivityLog({
      userId: dto.traineeId,
      type: ActivityType.WEIGHT_LOGGED,
      title: "Weight Logged",
      description: `Logged body weight: ${dto.weight} kg`,
      metadata: {
        logId: log.id,
        weight: dto.weight,
        smm: dto.smm,
        pbf: dto.pbf,
      },
    });

    //TODO: update trainer success rate

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
