import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentsPattern } from 'src/common/patterns/equipments.pattern';

@Controller()
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @MessagePattern(EquipmentsPattern.CREATE_EQUIPMENT)
  create(@Payload() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @MessagePattern(EquipmentsPattern.FIND_ALL_EQUIPMENTS)
  findAll() {
    return this.equipmentsService.findAll();
  }

  @MessagePattern(EquipmentsPattern.FIND_ONE_EQUIPMENT)
  findOne(@Payload() { id }: Pick<UpdateEquipmentDto, 'id'>) {
    return this.equipmentsService.findOne(id);
  }

  @MessagePattern(EquipmentsPattern.FIND_BY_NAME_EQUIPMENT)
  findByName(@Payload() { name }: {name: string}) {
    return this.equipmentsService.findByName(name);
  }

  @MessagePattern(EquipmentsPattern.UPDATE_EQUIPMENT)
  update(@Payload() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentsService.update(updateEquipmentDto.id, updateEquipmentDto);
  }

  @MessagePattern(EquipmentsPattern.REMOVE_EQUIPMENT)
  remove(@Payload() { id }: Pick<UpdateEquipmentDto, 'id'>) {
    return this.equipmentsService.remove(id);
  }
}
