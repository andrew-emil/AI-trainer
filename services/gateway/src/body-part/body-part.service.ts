import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { BodyPartPattern } from 'src/common/patterns/body-part.pattern';
import { CreateBodyPartDto } from './dto/create-body-part.dto';

@Injectable()
export class BodyPartService {
  constructor(
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly coachDomainClient: ClientProxy,
  ) { }

  create(createBodyPartDto: CreateBodyPartDto) {
    return firstValueFrom(
      this.coachDomainClient.send(BodyPartPattern.CREATE_BODY_PART, createBodyPartDto)
    )
  }

  findAll() {
    return firstValueFrom(
      this.coachDomainClient.send(BodyPartPattern.FIND_ALL_BODY_PARTS, {})
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.coachDomainClient.send(BodyPartPattern.FIND_ONE_BODY_PART, { id })
    );
  }

  findByName(name: string) {
    return firstValueFrom(
      this.coachDomainClient.send(BodyPartPattern.FIND_BY_NAME_BODY_PART, { name })
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.coachDomainClient.send(BodyPartPattern.REMOVE_BODY_PART, { id })
    );
  }
}
