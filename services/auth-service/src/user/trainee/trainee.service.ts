import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RegisterAsTraineeDto } from 'src/auth/dto/registerAsTrainee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTraineeDto } from './dto/updateTrainee.dto';
import { TraineeGoal } from '@prisma/client';

@Injectable()
export class TraineeService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    createTrainee(userId: string, traineeData: RegisterAsTraineeDto) {
        return this.prisma.trainee.create({
            data: {
                userId,
                ...traineeData,
            },
            include: {
                user: true,
            },
        });
    }

    findAll() {
        return this.prisma.trainee.findMany({ include: { user: true } });
    }

    async findOne(id: string) {
        const trainee = await this.prisma.trainee.findUnique({
            where: { userId: id },
            include: { user: true },
        });
        if (!trainee) throw new RpcException({
            status: 404,
            message: "Trainee not found",
        });
        return trainee;
    }

    async update(id: string, dto: UpdateTraineeDto) {
        await this.findOne(id);
        return this.prisma.trainee.update({
            where: { userId: id },
            data: { ...dto },
            include: { user: true },
        });
    }

    async delete(id: string) {
        await this.findOne(id);
        return this.prisma.trainee.delete({ where: { userId: id } });
    }

    async findTraineesGoals(traineeIds: string[]) {
        const traineesGoals = await this.prisma.trainee.findMany({
            where: {
                userId: {
                    in: traineeIds,
                },
            },
            select: {
                goal: true,
                userId: true,
            }
        });
        const goals: Record<string, TraineeGoal> = {};
        traineesGoals.forEach((trainee) => {
            goals[trainee.userId] = trainee.goal;
        });

        return goals;
    }
}
