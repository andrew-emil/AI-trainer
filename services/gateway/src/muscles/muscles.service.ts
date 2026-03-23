import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { MusclePatterns } from 'src/common/patterns/muscles.patterns';

@Injectable()
export class MusclesService {
    constructor(
        @Inject(COACH_DOMAIN_SERVICE)
        private readonly coachDomainClient: ClientProxy,
    ) { }

    findAll() {
        return this.coachDomainClient.send(MusclePatterns.FIND_ALL, {});
    }

    findOne(id: string) {
        return this.coachDomainClient.send(MusclePatterns.FIND_ONE, { id });
    }

    findByName(name: string) {
        return this.coachDomainClient.send(MusclePatterns.FIND_BY_NAME, { name });
    }
}
