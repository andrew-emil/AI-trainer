import { Inject, Injectable } from '@nestjs/common';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';
import { ClientProxy } from '@nestjs/microservices';
import { COACH_DOMAIN_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { firstValueFrom } from 'rxjs';
import { BodyWeightLogsPattern } from 'src/common/patterns/body-weight-logs.pattern';

@Injectable()
export class BodyWeightLogsService {
  constructor(
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly coachDomainService: ClientProxy,
    @Inject(INTERACTION_SERVICE)
    private readonly interactionService: ClientProxy,
  ) { }

  create(createBodyWeightLogDto: CreateBodyWeightLogDto) {
    return firstValueFrom(
      this.coachDomainService.send(BodyWeightLogsPattern.CREATE, createBodyWeightLogDto)
    )
  }

  findByTrainee(traineeId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        BodyWeightLogsPattern.FIND_BY_TRAINEE,
        { traineeId }
      )
    )
  }

  findOne(id: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        BodyWeightLogsPattern.FIND_ONE,
        { id }
      )
    )
  }

  update(id: string, traineeId: string, updateBodyWeightLogDto: UpdateBodyWeightLogDto) {
    return firstValueFrom(
      this.coachDomainService.send(
        BodyWeightLogsPattern.UPDATE,
        { id, traineeId, ...updateBodyWeightLogDto }
      )
    )
  }

  remove(id: string, traineeId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        BodyWeightLogsPattern.REMOVE,
        { id, traineeId }
      )
    )
  }
}
