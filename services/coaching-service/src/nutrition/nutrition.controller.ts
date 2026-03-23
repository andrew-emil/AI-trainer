import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NutritionService } from './nutrition.service';
import { NutritionPatterns } from 'src/common/patterns/nutrition.patterns';

@Controller()
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) { }

  @MessagePattern(NutritionPatterns.FIND_ALL)
  findAll(@Payload() data: { page: number; limit: number }) {
    return this.nutritionService.findAll(data.page, data.limit);
  }

  @MessagePattern(NutritionPatterns.FIND_ONE)
  findOne(@Payload() { id }: { id: string }) {
    return this.nutritionService.findOne(id);
  }

  @MessagePattern(NutritionPatterns.SEARCH_FOODS)
  searchFoods(@Payload() data: { q: string; page: number; limit: number }) {
    return this.nutritionService.searchFoods(data.q, data.page, data.limit);
  }
}
