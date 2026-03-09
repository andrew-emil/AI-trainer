import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MusclesService } from './muscles.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';

@Controller()
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @MessagePattern('createMuscle')
  create(@Payload() createMuscleDto: CreateMuscleDto) {
    return this.musclesService.create(createMuscleDto);
  }

  @MessagePattern('findAllMuscles')
  findAll() {
    return this.musclesService.findAll();
  }

  @MessagePattern('findOneMuscle')
  findOne(@Payload() id: number) {
    return this.musclesService.findOne(id);
  }

  @MessagePattern('updateMuscle')
  update(@Payload() updateMuscleDto: UpdateMuscleDto) {
    return this.musclesService.update(updateMuscleDto.id, updateMuscleDto);
  }

  @MessagePattern('removeMuscle')
  remove(@Payload() id: number) {
    return this.musclesService.remove(id);
  }
}
