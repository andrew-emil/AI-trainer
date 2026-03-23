import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { TraineeWithUserContract } from 'src/common/contracts/trainee.contract';
import { TrainerWithUserContract } from 'src/common/contracts/trainer.contract';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { NotificationType } from 'src/common/enum/notification-type';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { TraineePatterns } from 'src/common/patterns/trainee.pattern';
import { TrainerPattern } from 'src/common/patterns/trainer.patterns';
import { rpcCall } from 'src/common/utils/rpc-call.helper';
import { TrainerMetricsService } from 'src/trainer-metrics/trainer-metrics.service';

@Injectable()
export class WorkoutLogsHelper {
    constructor(
        private readonly trainerMetricsService: TrainerMetricsService,
        @Inject(INTERACTION_SERVICE)
        private readonly interactionService: ClientProxy,
        @Inject(AUTH_SERVICE)
        private readonly authService: ClientProxy,
    ) { }

    async handleSessionDecrement(tx: any, traineeId: string) {
        const record = await tx.trainerTrainee.findUnique({ where: { traineeId } });
        if (!record || record.sessionsCount <= 0) return;

        const newCount = record.sessionsCount - 1;

        await tx.trainerTrainee.update({
            where: { traineeId },
            data: {
                sessionsCount: newCount,
                ...(newCount === 0 && { membershipStatus: "inactive" }),
            },
        });

        if (newCount > 0) return;

        const metrics = await tx.trainerMetrics.findUnique({
            where: { trainerId: record.trainerId },
        });

        if (metrics) {
            await tx.trainerMetrics.update({
                where: { trainerId: record.trainerId },
                data: { activeTraineesCount: Math.max(0, metrics.activeTraineesCount - 1) },
            });
        }

        await this.trainerMetricsService.calculateRankScore(record.trainerId, tx);
        await this.sendExpirationNotifications(record.traineeId, record.trainerId);
    }

    buildWhereClause(
        traineeId: string,
        filters: { exerciseId?: string; dayId?: string },
    ): { sql: string; params: any[] } {
        const params: any[] = [traineeId];
        const conditions: string[] = [`s."traineeId" = $1`];
        let idx = 2;

        if (filters.exerciseId) {
            conditions.push(`we."exerciseId" = $${idx++}`);
            params.push(filters.exerciseId);
        }
        if (filters.dayId) {
            conditions.push(`s."dayId" = $${idx++}`);
            params.push(filters.dayId);
        }

        return { sql: conditions.join(" AND "), params };
    }

    mapProgressiveOverloadRow(r: any) {
        const toNum = (v: any) => (v !== null ? Number(v) : null);

        return {
            exerciseId: r.exerciseId,
            loggedAt: r.logged_at,
            volume: Number(r.volume),
            weight: Number(r.weight),
            reps: Number(r.reps),
            rir: toNum(r.rir),
            previousVolume: toNum(r.previous_volume),
            previousWeight: toNum(r.previous_weight),
            previousReps: toNum(r.previous_reps),
            previousRir: toNum(r.previous_rir),
            progressiveOverload:
                r.previous_volume !== null
                    ? {
                        volumeDiff: Number(r.volume) - Number(r.previous_volume),
                        weightDiff: Number(r.weight) - Number(r.previous_weight),
                        repsDiff: Number(r.reps) - Number(r.previous_reps),
                        rirDiff:
                            r.rir !== null && r.previous_rir !== null
                                ? Number(r.rir) - Number(r.previous_rir)
                                : null,
                    }
                    : null,
        };
    }

    private async sendExpirationNotifications(traineeId: string, trainerId: string) {
        const [trainee, trainer] = await Promise.all([
            rpcCall(
                this.authService,
                TraineePatterns.FIND_ONE,
                { id: traineeId },
                TraineeWithUserContract
            ),
            rpcCall(
                this.authService,
                TrainerPattern.GET_BY_ID,
                { id: trainerId },
                TrainerWithUserContract
            )
        ]);

        const payloads: CreateNotificationDto[] = [
            {
                userId: traineeId,
                type: NotificationType.MEMBERSHIP_EXPIRED,
                message: `Your membership with Trainer ${trainer.user.username} has expired. Please renew to continue your training.`,
            },
            {
                userId: trainerId,
                type: NotificationType.MEMBERSHIP_EXPIRED,
                message: `Trainee ${trainee.user.username}'s membership has expired (sessions finished).`,
            },
        ];

        payloads.map((p) => this.interactionService.send(NotificationPattern.CREATE, p))
    }
}
