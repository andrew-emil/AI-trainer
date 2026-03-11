import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyPartPattern } from 'src/common/patterns/body-part.pattern';
import { BodyPartsService } from './body-parts.service';
import { CreateBodyPartDto } from './dto/create-body-part.dto';

@Controller()
export class BodyPartsController {
  constructor(private readonly bodyPartsService: BodyPartsService) { }

  @MessagePattern(BodyPartPattern.CREATE_BODY_PART)
  create(@Payload() createBodyPartDto: CreateBodyPartDto) {
    return this.bodyPartsService.create(createBodyPartDto);
  }

  @MessagePattern(BodyPartPattern.FIND_ALL_BODY_PARTS)
  findAll() {
    return this.bodyPartsService.findAll();
  }

  @MessagePattern(BodyPartPattern.FIND_ONE_BODY_PART)
  findOne(@Payload() { id }: { id: string }) {
    return this.bodyPartsService.findOne(id);
  }

  @MessagePattern(BodyPartPattern.FIND_BY_NAME_BODY_PART)
  findByName(@Payload() { name }: { name: string }) {
    console.log(name)
    return this.bodyPartsService.findByName(name);
  }

  @MessagePattern(BodyPartPattern.REMOVE_BODY_PART)
  remove(@Payload() { id }: { id: string }) {
    return this.bodyPartsService.remove(id);
  }
}
