import { ActivityLog } from '@prisma/client';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async createActivityLog(data: CreateActivityLogDto): Promise<ActivityLog> {
    const { metadata, ...rest } = data;

    return this.prisma.activityLog.create({
      data: {
        ...rest,
        meta: metadata ?? undefined,
      }
    })
  }

  async getAllActivityLogs(userId: string, page = 1, limit = 10) {
    page = page ?? 1;
    limit = limit ?? 10;

    const [logs, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.activityLog.count({
        where: {
          userId
        }
      })
    ])

    return {
      logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async deleteActivityLog(userId: string, id: string) {
    const activityLog = await this.prisma.activityLog.findUnique({ where: { id } });
    if (!activityLog)
      throw new NotFoundException('Activity log not found');

    if (activityLog.userId !== userId)
      throw new ForbiddenException('You are not allowed to delete this activity log');

    return this.prisma.activityLog.delete({ where: { id } });
  }

  async getLastThreeActivityLogs(userId: string) {
    return this.prisma.activityLog.findMany({
      where: {
        userId,
      },
      take: 3,
      orderBy: {
        createdAt: 'desc',
      }
    })
  }
}
