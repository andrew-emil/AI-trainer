import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentsService } from './equipments.service';

@Controller('equipments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TRAINER)
  findAll() {
    return this.equipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(id);
  }

  @Get("search/:name")
  @Roles(UserRole.ADMIN, UserRole.TRAINER)
  findByName(@Param("name") name: string) {
    return this.equipmentsService.findByName(name);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(id);
  }
}
