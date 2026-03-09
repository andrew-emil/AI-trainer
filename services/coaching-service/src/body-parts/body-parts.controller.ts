import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyPartsService } from './body-parts.service';
import { CreateBodyPartDto } from './dto/create-body-part.dto';
import { UpdateBodyPartDto } from './dto/update-body-part.dto';

@Controller()
export class BodyPartsController {
  constructor(private readonly bodyPartsService: BodyPartsService) {}

  @MessagePattern('createBodyPart')
  create(@Payload() createBodyPartDto: CreateBodyPartDto) {
    return this.bodyPartsService.create(createBodyPartDto);
  }

  @MessagePattern('findAllBodyParts')
  findAll() {
    return this.bodyPartsService.findAll();
  }

  @MessagePattern('findOneBodyPart')
  findOne(@Payload() id: number) {
    return this.bodyPartsService.findOne(id);
  }

  @MessagePattern('updateBodyPart')
  update(@Payload() updateBodyPartDto: UpdateBodyPartDto) {
    return this.bodyPartsService.update(updateBodyPartDto.id, updateBodyPartDto);
  }

  @MessagePattern('removeBodyPart')
  remove(@Payload() id: number) {
    return this.bodyPartsService.remove(id);
  }
}
