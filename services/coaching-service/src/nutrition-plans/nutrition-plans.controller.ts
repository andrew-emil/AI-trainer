import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NutritionPlansService } from './nutrition-plans.service';
import { CreateNutritionPlanDto } from './dto/create-nutrition-plan.dto';
import { UpdateNutritionPlanDto } from './dto/update-nutrition-plan.dto';

@Controller()
export class NutritionPlansController {
  constructor(private readonly nutritionPlansService: NutritionPlansService) {}

  @MessagePattern('createNutritionPlan')
  create(@Payload() createNutritionPlanDto: CreateNutritionPlanDto) {
    return this.nutritionPlansService.create(createNutritionPlanDto);
  }

  @MessagePattern('findAllNutritionPlans')
  findAll() {
    return this.nutritionPlansService.findAll();
  }

  @MessagePattern('findOneNutritionPlan')
  findOne(@Payload() id: number) {
    return this.nutritionPlansService.findOne(id);
  }

  @MessagePattern('updateNutritionPlan')
  update(@Payload() updateNutritionPlanDto: UpdateNutritionPlanDto) {
    return this.nutritionPlansService.update(updateNutritionPlanDto.id, updateNutritionPlanDto);
  }

  @MessagePattern('removeNutritionPlan')
  remove(@Payload() id: number) {
    return this.nutritionPlansService.remove(id);
  }
}
