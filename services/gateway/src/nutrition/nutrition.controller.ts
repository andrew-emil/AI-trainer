import { Controller, Get, Param, Query } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/entities.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { SearchFoodDto } from './dto/search-food.dto';

@Controller('nutrition')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TRAINER, UserRole.ADMIN)
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) { }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.nutritionService.findAll(paginationDto.page, paginationDto.limit);
  }

  @Roles(UserRole.TRAINEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionService.findOne(id);
  }

  @Get('search/foods')
  searchFoods(@Query() searchFoodDto: SearchFoodDto) {
    return this.nutritionService.searchFoods(searchFoodDto.q, searchFoodDto.page, searchFoodDto.limit);
  }
}
