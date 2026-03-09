import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';

@Controller()
export class BodyWeightLogsController {
  constructor(private readonly bodyWeightLogsService: BodyWeightLogsService) {}

  @MessagePattern('createBodyWeightLog')
  create(@Payload() createBodyWeightLogDto: CreateBodyWeightLogDto) {
    return this.bodyWeightLogsService.create(createBodyWeightLogDto);
  }

  @MessagePattern('findAllBodyWeightLogs')
  findAll() {
    return this.bodyWeightLogsService.findAll();
  }

  @MessagePattern('findOneBodyWeightLog')
  findOne(@Payload() id: number) {
    return this.bodyWeightLogsService.findOne(id);
  }

  @MessagePattern('updateBodyWeightLog')
  update(@Payload() updateBodyWeightLogDto: UpdateBodyWeightLogDto) {
    return this.bodyWeightLogsService.update(updateBodyWeightLogDto.id, updateBodyWeightLogDto);
  }

  @MessagePattern('removeBodyWeightLog')
  remove(@Payload() id: number) {
    return this.bodyWeightLogsService.remove(id);
  }
}
