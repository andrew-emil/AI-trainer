import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAsTraineeDto } from 'src/auth/dto/registerAsTrainee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTraineeDto } from './dto/updateTrainee.dto';
import { UserService } from '../user.service';

@Injectable()
export class TraineeService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

    async createTrainee(userId: string, traineeData: RegisterAsTraineeDto) {
        const trainee = await this.prisma.trainee.create({
            data: {
                userId,
                ...traineeData,
            },
            include: {
                user: true,
            },
        });
        return trainee;
    }

    findAll() {
        return this.prisma.trainee.findMany({ include: { user: true } });
    }

    async findOne(id: string) {
        const trainee = await this.prisma.trainee.findUnique({
            where: { userId: id },
            include: { user: true },
        });
        if (!trainee) throw new NotFoundException("Trainee not found");
        return trainee;
    }

    async update(id: string, dto: UpdateTraineeDto) {
        await this.findOne(id);
        return this.prisma.trainee.update({
            where: { userId: id },
            data: dto,
            include: { user: true },
        });
    }

    async delete(id: string) {
        await this.findOne(id);
        await this.userService.delete(id);
        return this.prisma.trainee.delete({ where: { userId: id } });
    }
}
