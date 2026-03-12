import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { EquipmentsPattern } from 'src/common/patterns/equipments.pattern';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly client: ClientProxy,
  ) { }

  create(createEquipmentDto: CreateEquipmentDto) {
    return firstValueFrom(
      this.client.send(
        EquipmentsPattern.CREATE_EQUIPMENT,
        createEquipmentDto
      )
    );
  }

  findAll() {
    return firstValueFrom(
      this.client.send(
        EquipmentsPattern.FIND_ALL_EQUIPMENTS,
        {}
      )
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.client.send(
        EquipmentsPattern.FIND_ONE_EQUIPMENT,
        { id }
      )
    );
  }

  findByName(name: string) {
    return firstValueFrom(
      this.client.send(
        EquipmentsPattern.FIND_BY_NAME_EQUIPMENT,
        { name }
      )
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.client.send(
        EquipmentsPattern.REMOVE_EQUIPMENT,
        { id }
      )
    );
  }
}
