import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import { BodyPartService } from './body-part.service';
import { CreateBodyPartDto } from './dto/create-body-part.dto';

@Controller('body-part')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BodyPartController {
  constructor(private readonly bodyPartService: BodyPartService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createBodyPartDto: CreateBodyPartDto) {
    return this.bodyPartService.create(createBodyPartDto);
  }

  @Roles(UserRole.TRAINER, UserRole.ADMIN)
  @Get()
  findAll() {
    return this.bodyPartService.findAll();
  }

  @Roles(UserRole.TRAINER, UserRole.ADMIN, UserRole.TRAINER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodyPartService.findOne(id);
  }

  @Roles(UserRole.TRAINER, UserRole.ADMIN)
  @Get("search/:name")
  findByName(@Param("name") name: string) {
    return this.bodyPartService.findByName(name);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodyPartService.remove(id);
  }
}
