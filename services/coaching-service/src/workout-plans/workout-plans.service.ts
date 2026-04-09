import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';
import { CreateWorkoutDayDto } from './dto/create-workout-day.dto';
import { UpdateWorkoutDayDto } from './dto/update-workout-day.dto';
import { CreateWorkoutDayExerciseDto } from './dto/create-workout-day-exercise.dto';
import { UpdateWorkoutDayExerciseDto } from './dto/update-workout-day-exercise.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class WorkoutPlansService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  // ---------- Plans ----------
  async createPlan(dto: CreateWorkoutPlanDto) {
    return await this.prisma.workoutPlan.create({ data: dto });
  }

  async findAllPlans() {
    return await this.prisma.workoutPlan.findMany({
      include: {
        days: {
          orderBy: { dayIndex: "asc" },
          include: {
            exercises: {
              orderBy: { orderIndex: "asc" },
              include: { exercise: true },
            },
          },
        },
      },
    });
  }

  async findPlanById(id: string) {
    return await this.prisma.workoutPlan.findUnique({
      where: { id },
      include: {
        days: {
          orderBy: { dayIndex: "asc" },
          include: {
            exercises: {
              orderBy: { orderIndex: "asc" },
              include: { exercise: true },
            },
          },
        },
      },
    });
  }

  async updatePlan(id: string, dto: Omit<UpdateWorkoutPlanDto, 'id'>, trainerId: string) {
    return await this.prisma.workoutPlan.update({
      where: { id, trainerId },
      data: dto,
    });
  }

  async deletePlan(id: string, trainerId: string) {
    const exists = await this.prisma.workoutPlan.findUnique({ where: { id } });
    if (!exists) throw new RpcException({ status: 404, message: 'Workout plan not found' });

    return await this.prisma.workoutPlan.delete({ where: { id, trainerId } });
  }

  async findPlansByTrainer(trainerId: string) {
    return await this.prisma.workoutPlan.findMany({
      where: { trainerId },
    });
  }

  // ---------- Days ----------
  async addDay(planId: string, dto: CreateWorkoutDayDto, trainerId: string) {
    const plan = await this.prisma.workoutPlan.findUnique({
      where: { id: planId, trainerId },
    });
    if (!plan)
      throw new RpcException({ status: 404, message: 'Workout plan not found or access denied' });
    return await this.prisma.workoutDay.create({
      data: {
        planId: plan.id,
        ...dto,
      },
    });
  }

  async findDaysByPlan(planId: string) {
    return await this.prisma.workoutDay.findMany({
      where: { planId },
      orderBy: { dayIndex: "asc" },
      include: {
        exercises: {
          orderBy: { orderIndex: "asc" },
          include: { exercise: true },
        },
      },
    });
  }

  async findDayById(dayId: string) {
    return await this.prisma.workoutDay.findUnique({
      where: { id: dayId },
    });
  }

  async updateDay(dayId: string, dto: Omit<UpdateWorkoutDayDto, 'dayId'>, trainerId: string) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: {
        days: { some: { id: dayId } },
        trainerId,
      },
    });
    if (!plan) throw new RpcException({ status: 403, message: 'Access denied' });
    return await this.prisma.workoutDay.update({
      where: { id: dayId, planId: plan.id },
      data: dto,
    });
  }

  async deleteDay(dayId: string, trainerId: string) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: {
        days: { some: { id: dayId } },
        trainerId,
      },
    });
    if (!plan) throw new RpcException({ status: 403, message: 'Access denied' });
    return await this.prisma.workoutDay.delete({
      where: { id: dayId, planId: plan.id },
    });
  }

  // ---------- Day Exercises ----------
  async addExerciseToDay(
    dayId: string,
    dto: CreateWorkoutDayExerciseDto,
    trainerId: string,
  ) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: {
        days: { some: { id: dayId } },
        trainerId,
      },
    });
    if (!plan) throw new RpcException({ status: 403, message: 'Access denied' });
    return this.prisma.workoutDayExercise.create({
      data: {
        workoutDayId: dayId,
        ...dto,
      },
    });
  }

  async updateDayExercise(
    id: string,
    dto: Omit<UpdateWorkoutDayExerciseDto, 'id'>,
    trainerId: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const plan = await tx.workoutPlan.findFirst({
        where: {
          days: { some: { exercises: { some: { id } } } },
          trainerId,
        },
      });
      if (!plan) throw new RpcException({ status: 403, message: 'Access denied' });
      // dumbbell
      const workoutDayExercise = await tx.workoutDayExercise.findFirst({
        where: {
          id,
        },
      });

      if (!workoutDayExercise) throw new RpcException({ status: 404, message: 'Workout day exercise not found' });
      let replacedWorkoutDayExercise;
      if (
        dto.orderIndex !== undefined &&
        dto.orderIndex != workoutDayExercise.orderIndex
      ) {
        // smith
        replacedWorkoutDayExercise = await tx.workoutDayExercise.findFirst({
          where: {
            orderIndex: dto.orderIndex,
            workoutDayId: workoutDayExercise.workoutDayId,
          },
        });
        if (replacedWorkoutDayExercise) {
          // update smith with -1
          await tx.workoutDayExercise.update({
            where: { id: replacedWorkoutDayExercise.id },
            data: { orderIndex: -1 },
          });
        }
      }
      // update dumbbell with smith orderIndex
      const updatedWorkoutDayExercise = await tx.workoutDayExercise.update({
        where: { id },
        data: dto,
      });
      // update smith with dumbbell orderIndex
      if (replacedWorkoutDayExercise) {
        await tx.workoutDayExercise.update({
          where: { id: replacedWorkoutDayExercise.id },
          data: { orderIndex: workoutDayExercise.orderIndex },
        });
      }
      return updatedWorkoutDayExercise;
    });
  }

  async deleteDayExercise(id: string, trainerId: string) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: {
        days: { some: { exercises: { some: { id } } } },
        trainerId,
      },
    });
    if (!plan) throw new RpcException({ status: 403, message: 'Access denied' });
    return this.prisma.workoutDayExercise.delete({
      where: { id },
    });
  }
}
