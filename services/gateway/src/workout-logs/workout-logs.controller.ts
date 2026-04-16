import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutLogsService } from './workout-logs.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) { }

  @Roles(UserRole.TRAINEE, UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateWorkoutSessionDto, @Req() req: CustomRequest) {
    return this.workoutLogsService.create(dto, req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutLogsService.findOne(id);
  }

  @Get('trainee/:traineeId')
  findAllByTrainee(@Param('traineeId') traineeId: string) {
    return this.workoutLogsService.findAllByTrainee(traineeId);
  }

  @Roles(UserRole.TRAINEE, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutSessionDto, @Req() req: CustomRequest) {
    return this.workoutLogsService.update(id, dto, req.user.sub);
  }

  @Roles(UserRole.TRAINEE, UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutLogsService.remove(id);
  }

  // ===== Workout summury =====
  @Roles(UserRole.TRAINEE, UserRole.TRAINER)
  @Get("trainee/:traineeId/summary")
  getWorkoutSummary(
    @Param("traineeId") traineeId: string,
    @Query("by") by?: "dayId" | "exerciseId",
    @Query("dayId") dayId?: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
  ) {
    return this.workoutLogsService.getWorkoutSummary({
      traineeId,
      by: by ? [by] : undefined,
      dayId,
      startDate,
      endDate,
    });
  }

  // ===== Progressive Overload =====
  @Roles(UserRole.TRAINEE, UserRole.TRAINER)
  @Get("trainee/:traineeId/progressive-overload")
  getProgressiveOverload(
    @Param("traineeId") traineeId: string,
    @Query("exerciseId") exerciseId?: string,
    @Query("dayId") dayId?: string,
  ) {
    return this.workoutLogsService.getProgressiveOverload(traineeId, exerciseId, dayId);
  }

  @Roles(UserRole.TRAINEE, UserRole.TRAINER)
  @Get("trainee/:traineeId/latest-progressive-overload")
  getLatestProgressiveOverload(
    @Param("traineeId") traineeId: string,
    @Query("exerciseId") exerciseId?: string,
    @Query("dayId") dayId?: string,
  ) {
    return this.workoutLogsService.getLatestProgressiveOverload(
      traineeId,
      exerciseId,
      dayId,
    );
  }

  // ===== Latest 1RM =====
  @Roles(UserRole.TRAINEE, UserRole.TRAINER)
  @Get("trainee/:traineeId/latest-1rm")
  getLatest1RM(
    @Param("traineeId") traineeId: string,
    @Query("exerciseId") exerciseId?: string,
  ) {
    return this.workoutLogsService.getLatest1RMPerExercise(traineeId, exerciseId);
  }
}
