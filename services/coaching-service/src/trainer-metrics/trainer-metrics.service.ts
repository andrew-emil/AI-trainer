import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BodyWeightLog, membershipStatus, Prisma, TraineeGoal } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { TraineeContract } from 'src/common/contracts/trainee.contract';
import { Trainer, TrainerContract } from 'src/common/contracts/trainer.contract';
import { TraineePatterns } from 'src/common/patterns/trainee.pattern';
import { TrainerPattern } from 'src/common/patterns/trainer.patterns';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { rpcCall } from 'src/common/utils/rpc-call.helper';

@Injectable()
export class TrainerMetricsService {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
        private readonly prisma: PrismaService,
    ) { }

    async calculateRankScore(trainerId: string, tx?: Prisma.TransactionClient) {
        const prisma = tx || this.prisma;
        const trainer = await this.getTrainerById(trainerId);
        const trainerMetrics = await prisma.trainerMetrics.findUnique({
            where: {
                trainerId,
            },
        });

        if (!trainerMetrics)
            return;

        const ratingAvg = trainer.ratingAvg || 0;
        const activeTraineesCount = trainerMetrics.activeTraineesCount || 0;
        const successRate = trainerMetrics.successRate || 0;

        // Normalizing all components to a 0-5 scale
        const successScore = successRate * 5; // successRate is 0-1
        const traineesScore = Math.min(5, activeTraineesCount / 2); // Reaches 5 at 10 trainees
        const experienceScore = Math.min(5, trainer.experienceYears / 2); // Reaches 5 at 10 years

        const rankScore =
            ratingAvg * 0.4 +
            successScore * 0.3 +
            traineesScore * 0.2 +
            experienceScore * 0.1;

        return firstValueFrom(
            this.authClient.send(TrainerPattern.UPDATE, { userId: trainerId, rankScore })
        )
    }

    async updateTrainerSuccessRate(trainerId: string) {
        const assignedTrainees = await this.prisma.trainerTrainee.findMany({
            where: { trainerId, membershipStatus: membershipStatus.active },
        });
        if (assignedTrainees.length === 0) return;

        const traineeIds = assignedTrainees.map((t) => t.traineeId);

        const [traineeGoals, traineeBodyWeightLogs] = await Promise.all([
            rpcCall(
                this.authClient,
                TraineePatterns.FIND_TRAINEES_GOALS,
                { traineeIds },
                TraineeContract
            ),
            this.prisma.bodyWeightLog.findMany({
                where: { traineeId: { in: traineeIds } },
                orderBy: { loggedAt: "desc" },
                take: 20,
            }),
        ]);

        let totalTransitions = 0;
        let successfulTransitions = 0;

        for (const relation of assignedTrainees) {
            const goal = traineeGoals[relation.traineeId];
            if (!goal) continue;

            const assignmentDate = relation.assignedAt || relation.createdAt;

            const logs = traineeBodyWeightLogs
                .filter((log) => log.traineeId === relation.traineeId)
                .filter((log) => log.loggedAt >= assignmentDate);

            if (logs.length < 2) continue;

            for (let i = 0; i < logs.length - 1; i++) {
                const current = logs[i];     // Newer
                const previous = logs[i + 1]; // Older

                totalTransitions++;
                if (this.evaluateLogSuccess(goal, current, previous)) {
                    successfulTransitions++;
                }
            }
        }

        const successRate =
            totalTransitions > 0 ? successfulTransitions / totalTransitions : 0;

        // 2. Update metrics
        await this.prisma.trainerMetrics.upsert({
            where: { trainerId },
            create: {
                trainerId,
                successRate,
                activeTraineesCount: assignedTrainees.length,
            },
            update: {
                successRate,
                activeTraineesCount: assignedTrainees.length,
            },
        });

        // 3. Recalculate rank score
        await this.calculateRankScore(trainerId);
    }

    private evaluateLogSuccess(
        goal: TraineeGoal,
        current: BodyWeightLog,
        previous: BodyWeightLog,
    ): boolean {
        const pbfDiff = (current.pbf || 0) - (previous.pbf || 0);
        const smmDiff = (current.smm || 0) - (previous.smm || 0);
        const weightDiff = current.weight - previous.weight;

        switch (goal) {
            case TraineeGoal.body_recomb:
                // PBF down and SMM up
                return pbfDiff < 0 && smmDiff > 0;
            case TraineeGoal.bulk:
                // SMM up, weight up
                return smmDiff > 0 && weightDiff > 0;
            case TraineeGoal.cut:
                // Weight down, PBF down or stable
                return weightDiff < 0 && pbfDiff <= 0;
            case TraineeGoal.maintenance:
                // Weight stable (within 0.5kg)
                return Math.abs(weightDiff) <= 0.5;
            case TraineeGoal.strength:
                // SMM maintained or up
                return smmDiff >= 0;
            default:
                return false;
        }
    }

    async getTrainerById(id: string): Promise<Trainer> {
        return rpcCall<Trainer>(this.authClient, TrainerPattern.GET_BY_ID, { id }, TrainerContract);
    }
}