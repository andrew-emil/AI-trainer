import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { TraineeService } from './trainee.service';

@UseGuards(JwtAuthGuard)
@Controller('trainee')
export class TraineeController {
  constructor(private readonly traineeService: TraineeService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('all')
  findAll() {
    return this.traineeService.findAll();
  }

  @Get()
  findOne(@Req() req: CustomRequest) {
    return this.traineeService.findOne(req.user.sub);
  }

  @Patch()
  update(@Req() req: CustomRequest, @Body() updateTraineeDto: UpdateTraineeDto) {
    return this.traineeService.update(req.user.sub, updateTraineeDto);
  }

  @Delete()
  remove(@Req() req: CustomRequest) {
    return this.traineeService.remove(req.user.sub);
  }
}
