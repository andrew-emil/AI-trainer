import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';
import { CreateWorkoutDayDto } from './dto/create-workout-day.dto';
import { UpdateWorkoutDayDto } from './dto/update-workout-day.dto';
import { CreateWorkoutDayExerciseDto } from './dto/create-workout-day-exercise.dto';
import { UpdateWorkoutDayExerciseDto } from './dto/update-workout-day-exercise.dto';
import { WorkoutPlansService } from './workout-plans.service';

@Controller('workout-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TRAINER, UserRole.ADMIN)
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}

  // ---------- Plans ----------

  @Post()
  createPlan(@Req() req: CustomRequest, @Body() dto: CreateWorkoutPlanDto) {
    return this.workoutPlansService.createPlan(req.user.sub, dto);
  }

  @Get('trainer')
  findPlansByTrainer(@Req() req: CustomRequest) {
    return this.workoutPlansService.findPlansByTrainer(req.user.sub);
  }

  @Get()
  findAllPlans() {
    return this.workoutPlansService.findAllPlans();
  }

  @Roles(UserRole.TRAINEE)
  @Get(':id')
  findPlanById(@Param('id') id: string) {
    return this.workoutPlansService.findPlanById(id);
  }

  @Patch(':id')
  updatePlan(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() dto: UpdateWorkoutPlanDto,
  ) {
    return this.workoutPlansService.updatePlan(id, dto, req.user.sub);
  }

  @Delete(':id')
  deletePlan(@Param('id') id: string, @Req() req: CustomRequest) {
    return this.workoutPlansService.deletePlan(id, req.user.sub);
  }

  // ---------- Days ----------

  @Post(':planId/days')
  addDay(
    @Req() req: CustomRequest,
    @Param('planId') planId: string,
    @Body() dto: CreateWorkoutDayDto,
  ) {
    return this.workoutPlansService.addDay(planId, dto, req.user.sub);
  }

  @Roles(UserRole.TRAINEE)
  @Get(':planId/days')
  findDaysByPlan(@Param('planId') planId: string) {
    return this.workoutPlansService.findDaysByPlan(planId);
  }

  @Roles(UserRole.TRAINEE)
  @Get('days/:dayId')
  findDayById(@Param('dayId') dayId: string) {
    return this.workoutPlansService.findDayById(dayId);
  }

  @Patch('days/:dayId')
  updateDay(
    @Param('dayId') dayId: string,
    @Req() req: CustomRequest,
    @Body() dto: UpdateWorkoutDayDto,
  ) {
    return this.workoutPlansService.updateDay(dayId, dto, req.user.sub);
  }

  @Delete('days/:dayId')
  deleteDay(@Param('dayId') dayId: string, @Req() req: CustomRequest) {
    return this.workoutPlansService.deleteDay(dayId, req.user.sub);
  }

  // ---------- Day Exercises ----------

  @Post('days/:dayId/exercises')
  addExerciseToDay(
    @Param('dayId') dayId: string,
    @Body() dto: CreateWorkoutDayExerciseDto,
    @Req() req: CustomRequest,
  ) {
    return this.workoutPlansService.addExerciseToDay(dayId, dto, req.user.sub);
  }

  @Patch('exercises/:id')
  updateDayExercise(
    @Param('id') id: string,
    @Body() dto: UpdateWorkoutDayExerciseDto,
    @Req() req: CustomRequest,
  ) {
    return this.workoutPlansService.updateDayExercise(id, dto, req.user.sub);
  }

  @Delete('exercises/:id')
  deleteDayExercise(@Param('id') id: string, @Req() req: CustomRequest) {
    return this.workoutPlansService.deleteDayExercise(id, req.user.sub);
  }
}
