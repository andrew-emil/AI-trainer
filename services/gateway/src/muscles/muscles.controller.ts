import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import { MusclesService } from './muscles.service';

@Controller('muscles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TRAINER, UserRole.ADMIN)
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) { }

  @Roles(UserRole.TRAINEE)
  @Get()
  findAll() {
    return this.musclesService.findAll();
  }

  @Roles(UserRole.TRAINEE)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.musclesService.findOne(id);
  }

  @Get("search/:name")
  findByName(@Param("name") name: string) {
    return this.musclesService.findByName(name);
  }
}
