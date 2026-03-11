import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ActivityLogsPatterns } from 'src/common/patterns/activity-log.pattern';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ActivityLogService {
  constructor(
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly client: ClientProxy,
  ) { }

  create(createActivityLogDto: CreateActivityLogDto) {
    return firstValueFrom(
      this.client.send(
        ActivityLogsPatterns.CREATE_LOG,
        createActivityLogDto,
      ),
    )
  }

  findAll(userId: string, page: number, limit: number) {
    return firstValueFrom(
      this.client.send(
        ActivityLogsPatterns.GET_ALL_LOGS,
        { userId, page, limit },
      ),
    )
  }

  findLastThree(userId: string) {
    return firstValueFrom(
      this.client.send(
        ActivityLogsPatterns.GET_LAST_THREE_LOGS,
        { userId },
      ),
    )
  }

  remove(id: string, userId: string) {
    return firstValueFrom(
      this.client.send(
        ActivityLogsPatterns.DELETE_LOG,
        { userId, id },
      ),
    )
  }
}
