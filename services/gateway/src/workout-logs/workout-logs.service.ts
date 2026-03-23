import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { WorkoutLogPattern } from 'src/common/patterns/workout-logs.patterns';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { SummaryPayload } from './dto/summary.dto';

@Injectable()
export class WorkoutLogsService {
    constructor(
        @Inject(COACH_DOMAIN_SERVICE)
        private readonly client: ClientProxy,
    ) { }

    async create(dto: CreateWorkoutSessionDto, traineeId: string) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.CREATE, { dto, traineeId })
        )
    }

    async findOne(id: string) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.FIND_ONE, { id })
        )
    }

    async findAllByTrainee(traineeId: string, limit = 10, cursor?: string) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.FIND_ALL, { traineeId, limit, cursor })
        )
    }

    async update(id: string, dto: UpdateWorkoutSessionDto, traineeId: string) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.UPDATE, { id, dto, traineeId })
        )
    }

    async remove(id: string) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.REMOVE, { id })
        )
    }

    async getWorkoutSummary(dto: SummaryPayload) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.SUMMARY, { dto })
        )
    }

    async getProgressiveOverload(
        traineeId: string,
        exerciseId?: string,
        dayId?: string,
    ) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.PROGRESSIVE_OVERLOAD, { traineeId, exerciseId, dayId })
        )
    }

    async getLatestProgressiveOverload(
        traineeId: string,
        exerciseId?: string,
        dayId?: string,
    ) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.LATEST_PROGRESSIVE_OVERLOAD, { traineeId, exerciseId, dayId })
        )
    }

    async getLatest1RMPerExercise(traineeId: string, exerciseId?: string) {
        return firstValueFrom(
            this.client.send(WorkoutLogPattern.LATEST_1RM, { traineeId, exerciseId })
        )
    }
}
