import { Injectable } from '@nestjs/common';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';

@Injectable()
export class BodyWeightLogsService {
  create(createBodyWeightLogDto: CreateBodyWeightLogDto) {
    return 'This action adds a new bodyWeightLog';
  }

  findAll() {
    return `This action returns all bodyWeightLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyWeightLog`;
  }

  update(id: number, updateBodyWeightLogDto: UpdateBodyWeightLogDto) {
    return `This action updates a #${id} bodyWeightLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} bodyWeightLog`;
  }
}
