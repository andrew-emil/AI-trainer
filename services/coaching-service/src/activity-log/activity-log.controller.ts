import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActivityLogService } from './activity-log.service';
import { GetAllLogsDto } from './dto/get-all-logs.dto';
import { ActivityLogsPatterns } from 'src/common/patterns/activity-log.pattern';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Controller()
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) { }

  @MessagePattern(ActivityLogsPatterns.CREATE_LOG)
  createActivityLog(@Payload() payload: CreateActivityLogDto) {
    return this.activityLogService.createActivityLog(payload);
  }

  @MessagePattern(ActivityLogsPatterns.GET_ALL_LOGS)
  getAllActivityLogs(@Payload() payload: GetAllLogsDto) {
    return this.activityLogService.getAllActivityLogs(payload.userId, payload.page, payload.limit);
  }

  @MessagePattern(ActivityLogsPatterns.GET_LAST_THREE_LOGS)
  getLastThreeActivityLogs(@Payload() { userId }: { userId: string }) {
    return this.activityLogService.getLastThreeActivityLogs(userId);
  }

  @MessagePattern(ActivityLogsPatterns.DELETE_LOG)
  deleteActivityLog(@Payload() { userId, id }: { userId: string, id: string }) {
    return this.activityLogService.deleteActivityLog(userId, id);
  }
}
