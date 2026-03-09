import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Controller()
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @MessagePattern('createActivityLog')
  create(@Payload() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.create(createActivityLogDto);
  }

  @MessagePattern('findAllActivityLog')
  findAll() {
    return this.activityLogService.findAll();
  }

  @MessagePattern('findOneActivityLog')
  findOne(@Payload() id: number) {
    return this.activityLogService.findOne(id);
  }

  @MessagePattern('updateActivityLog')
  update(@Payload() updateActivityLogDto: UpdateActivityLogDto) {
    return this.activityLogService.update(updateActivityLogDto.id, updateActivityLogDto);
  }

  @MessagePattern('removeActivityLog')
  remove(@Payload() id: number) {
    return this.activityLogService.remove(id);
  }
}
