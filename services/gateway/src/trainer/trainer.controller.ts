import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RegisterAsTrainerDto } from 'src/auth/dto/registerAsTrainer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerService } from './trainer.service';
import { Public } from 'src/auth/decorators/public.decorator';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { CreateTraineeWorkoutPlanDto } from './dto/create-trainee-workout-plan.dto';
import { UpdateTraineeWorkoutPlanDto } from './dto/update-trainee-workout-plan.dto';
import { CreateTraineeNutritionPlanDto } from './dto/create-trainee-nutrition-plan.dto';
import { UpdateTraineeNutritionPlanDto } from './dto/update-trainee-nutrition-plan.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) { }

  @Public()
  @Get()
  findAll(@Query("isActive") isActive?: string) {
    return this.trainerService.findAll(isActive !== undefined ? isActive === "true" : undefined);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainerService.findOne(id);
  }

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

  // ------------------- Trainee Assignment -----------------------
  @Get("/trainee-requests")
  getTraineeRequests(@Req() req: CustomRequest) {
    return this.trainerService.getTraineeRequests(req.user.sub);
  }

  @Post("/trainees/:reqId")
  processTraineeRequest(
    @Param("reqId") reqId: string,
    @Body("approve") approve: boolean,
  ) {
    return this.trainerService.processTraineeRequest(reqId, approve);
  }

  @Get("/trainees")
  getAssignedTrainees(@Req() req: CustomRequest) {
    return this.trainerService.getAssignedTrainees(req.user.sub);
  }

  @Delete("/trainees/:traineeId")
  unassignTrainee(@Req() req: CustomRequest, @Param("traineeId") traineeId: string) {
    return this.trainerService.unassignTrainee(
      req.user.sub,
      traineeId,
    );
  }

  // ------------------- Workout Plan Assignment -----------------------
  @Post("workout-plans")
  assignWorkoutPlan(@Body() dto: CreateTraineeWorkoutPlanDto) {
    return this.trainerService.assignWorkoutPlan(dto);
  }

  @Patch("workout-plans/:traineeId/:planId")
  updateWorkoutPlanAssignment(
    @Param("traineeId") traineeId: string,
    @Param("planId") planId: string,
    @Body() dto: UpdateTraineeWorkoutPlanDto,
  ) {
    return this.trainerService.updateWorkoutPlanAssignment(
      traineeId,
      planId,
      dto,
    );
  }

  @Patch("workout-plans/:traineeId/:planId/active")
  setWorkoutPlanActiveStatus(
    @Param("traineeId") traineeId: string,
    @Param("planId") planId: string,
    @Body("active") active: boolean,
  ) {
    return this.trainerService.setWorkoutPlanActiveStatus(
      traineeId,
      planId,
      active,
    );
  }

  @Get("workout-plans/:traineeId")
  getAssignedWorkoutPlan(
    @Param("traineeId") traineeId: string,
    @Query("active") active?: boolean,
  ) {
    return this.trainerService.getAssignedWorkoutPlanForTrainee(
      traineeId,
      active,
    );
  }

  @Get("/trainees-workout-plans")
  getAllTraineesWithWorkoutPlans(@Req() req: CustomRequest) {
    return this.trainerService.getAllTraineesAndTheirAssignedPlans(
      req.user.sub,
    );
  }

  @Delete("workout-plans/:traineeId/:planId")
  unassignWorkoutPlan(
    @Param("traineeId") traineeId: string,
    @Param("planId") planId: string,
  ) {
    return this.trainerService.unassignWorkoutPlan(traineeId, planId);
  }

  // ------------------- Nutrition Plan Assignment -----------------------
  @Post("nutrition-plans")
  assignNutritionPlan(@Body() dto: CreateTraineeNutritionPlanDto) {
    return this.trainerService.assignNutritionPlan(dto);
  }

  @Patch("nutrition-plans/:traineeId/:nutritionPlanId")
  updateNutritionPlanAssignment(
    @Param("traineeId") traineeId: string,
    @Param("nutritionPlanId") nutritionPlanId: string,
    @Body() dto: UpdateTraineeNutritionPlanDto,
  ) {
    return this.trainerService.updateNutritionPlanAssignment(
      traineeId,
      nutritionPlanId,
      dto,
    );
  }

  @Patch("nutrition-plans/:traineeId/:nutritionPlanId/active")
  setNutritionPlanActiveStatus(
    @Param("traineeId") traineeId: string,
    @Param("nutritionPlanId") nutritionPlanId: string,
    @Body("active") active: boolean,
  ) {
    return this.trainerService.setNutritionPlanActiveStatus(
      traineeId,
      nutritionPlanId,
      active,
    );
  }

  @Get("nutrition-plans/:traineeId")
  getAssignedNutritionPlan(
    @Param("traineeId") traineeId: string,
    @Query("active") active?: boolean,
  ) {
    return this.trainerService.getAssignedNutritionPlanForTrainee(
      traineeId,
      active,
    );
  }

  @Get("/trainees-nutrition-plans")
  getAllTraineesWithNutritionPlans(@Req() req: CustomRequest) {
    return this.trainerService.getAllTraineesAndTheirAssignedNutritionPlans(
      req.user.sub,
    );
  }

  @Delete("nutrition-plans/:traineeId/:nutritionPlanId")
  unassignNutritionPlan(
    @Param("traineeId") traineeId: string,
    @Param("nutritionPlanId") nutritionPlanId: string,
  ) {
    return this.trainerService.unassignNutritionPlan(
      traineeId,
      nutritionPlanId,
    );
  }

  // ---------------------- Trainer Metrics ----------------------
  @Patch(":id/calculate-rank")
  calculateRank(@Param("id") trainerId: string) {
    return this.trainerService.calculateTrainerRank(trainerId);
  }

  @Public()
  @Get("reviews/:id")
  getReviewsForTrainer(@Param("id") id: string) {
    return this.trainerService.getReviewsForTrainer(id);
  }
}
