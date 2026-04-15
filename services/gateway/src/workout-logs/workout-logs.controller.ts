import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WorkoutLogsService } from './workout-logs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';

@UseGuards(JwtAuthGuard)
@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) { }

  @Post()
  create(@Body() dto: CreateWorkoutSessionDto, @Req() req: CustomRequest) {
    return this.workoutLogsService.create(dto, req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutLogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutSessionDto, @Req() req: CustomRequest) {
    return this.workoutLogsService.update(id, dto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutLogsService.remove(id);
  }
}
