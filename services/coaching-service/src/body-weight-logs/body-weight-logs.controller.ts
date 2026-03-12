import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyWeightLogsPattern } from 'src/common/patterns/body-weight-logs.pattern';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { PayloadDto } from './dto/payload.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';
import { AnalysisProvider } from './providers/analysis.provider';

@Controller()
export class BodyWeightLogsController {
  constructor(
    private readonly bodyWeightLogsService: BodyWeightLogsService,
    private readonly analysisProvider: AnalysisProvider
  ) { }

  @MessagePattern(BodyWeightLogsPattern.CREATE)
  create(@Payload() createBodyWeightLogDto: CreateBodyWeightLogDto) {
    return this.bodyWeightLogsService.create(createBodyWeightLogDto);
  }

  @MessagePattern(BodyWeightLogsPattern.FIND_BY_TRAINEE)
  findByTrainee(@Payload() { traineeId }: Pick<PayloadDto, 'traineeId'>) {
    return this.bodyWeightLogsService.findByTrainee(traineeId);
  }

  @MessagePattern(BodyWeightLogsPattern.FIND_ONE)
  findOne(@Payload() { id }: Pick<PayloadDto, 'id'>) {
    return this.bodyWeightLogsService.findOne(id);
  }

  @MessagePattern(BodyWeightLogsPattern.UPDATE)
  update(@Payload() dto: UpdateBodyWeightLogDto) {
    return this.bodyWeightLogsService.update(dto);
  }

  @MessagePattern(BodyWeightLogsPattern.REMOVE)
  remove(@Payload() { id, traineeId }: PayloadDto) {
    return this.bodyWeightLogsService.remove(id, traineeId);
  }

  @MessagePattern(BodyWeightLogsPattern.ANALYZE_WEIGHT_CHANGES)
  analyzeWeightChanges(@Payload() { traineeId }: Pick<PayloadDto, 'traineeId'>) {
    return this.analysisProvider.analyzeWeightChanges(traineeId);
  }

  @MessagePattern(BodyWeightLogsPattern.GET_WEIGHT_TREND)
  getWeightTrend(@Payload() { traineeId }: Pick<PayloadDto, 'traineeId'>) {
    return this.analysisProvider.getWeightTrend(traineeId);
  }
}
