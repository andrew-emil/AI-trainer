import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller()
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @MessagePattern('createEquipment')
  create(@Payload() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @MessagePattern('findAllEquipments')
  findAll() {
    return this.equipmentsService.findAll();
  }

  @MessagePattern('findOneEquipment')
  findOne(@Payload() id: number) {
    return this.equipmentsService.findOne(id);
  }

  @MessagePattern('updateEquipment')
  update(@Payload() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentsService.update(updateEquipmentDto.id, updateEquipmentDto);
  }

  @MessagePattern('removeEquipment')
  remove(@Payload() id: number) {
    return this.equipmentsService.remove(id);
  }
}
