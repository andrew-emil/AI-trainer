import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MusclePatterns } from 'src/common/patterns/muscles.patterns';
import { MusclesService } from './muscles.service';

@Controller()
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @MessagePattern(MusclePatterns.FIND_BY_NAME)
  findByName(@Payload() { name }: { name: string }) {
    return this.musclesService.findByName(name);
  }

  @MessagePattern(MusclePatterns.FIND_ALL)
  findAll() {
    return this.musclesService.findAll();
  }

  @MessagePattern(MusclePatterns.FIND_ONE)
  findOne(@Payload() { id }: { id: string }) {
    return this.musclesService.findOne(id);
  }
}
