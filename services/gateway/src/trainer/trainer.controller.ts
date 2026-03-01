import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RegisterAsTrainerDto } from 'src/auth/dto/registerAsTrainer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerService } from './trainer.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) { }

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  // @Public()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.trainerService.findOne(+id);
  // }

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: RegisterAsTrainerDto) {
    return this.trainerService.create(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.TRAINER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(id, updateTrainerDto);
  }

  @Roles(UserRole.ADMIN, UserRole.TRAINER)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.trainerService.remove(id);
  }
}
