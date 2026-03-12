import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { BodyWeightLogsPattern } from 'src/common/patterns/body-weight-logs.pattern';

@Injectable()
export class AnalysisProvider {
    constructor(
        @Inject(COACH_DOMAIN_SERVICE)
        private readonly coachDomainService: ClientProxy,
    ) { }

    async analyzeBodyWeightLog(traineeId: string) {
        return firstValueFrom(
            this.coachDomainService.send(
                BodyWeightLogsPattern.ANALYZE_WEIGHT_CHANGES,
                { traineeId }
            )
        )
    }

    async getWeightTrend(traineeId: string) {
        return firstValueFrom(
            this.coachDomainService.send(
                BodyWeightLogsPattern.GET_WEIGHT_TREND,
                { traineeId }
            )
        )
    }
}
