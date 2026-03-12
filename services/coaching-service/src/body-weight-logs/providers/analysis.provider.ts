import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AnalysisProvider {
    constructor(private readonly prisma: PrismaService) { }

    async analyzeWeightChanges(traineeId: string) {
        const logs = await this.prisma.bodyWeightLog.findMany({
            where: { traineeId },
            orderBy: { loggedAt: "asc" },
        });

        if (logs.length < 2)
            return { message: "Not enough data for analysis", logs };

        const firstLog = logs[0];
        const lastLog = logs[logs.length - 1];

        const weightChange = lastLog.weight - firstLog.weight;
        const weightChangePercentage = (
            (weightChange / firstLog.weight) *
            100
        ).toFixed(2);

        const smmChange =
            lastLog.smm !== undefined &&
                lastLog.smm !== null &&
                firstLog.smm !== undefined &&
                firstLog.smm !== null
                ? lastLog.smm - firstLog.smm
                : null;

        const pbfChange =
            lastLog.pbf !== undefined &&
                lastLog.pbf !== null &&
                firstLog.pbf !== undefined &&
                firstLog.pbf !== null
                ? lastLog.pbf - firstLog.pbf
                : null;

        return {
            startWeight: firstLog.weight,
            endWeight: lastLog.weight,
            weightChange,
            weightChangePercentage,
            smmChange,
            pbfChange,
            logsCount: logs.length,
        };
    }

    async getWeightTrend(traineeId: string) {
        const logs = await this.prisma.bodyWeightLog.findMany({
            where: { traineeId },
            orderBy: { loggedAt: "asc" },
        });

        if (!logs.length) return { message: "No data available for trend" };

        const trend = logs.map((log) => ({
            date: log.loggedAt,
            weight: log.weight,
            smm: log.smm ?? null,
            pbf: log.pbf ?? null,
        }));

        const summary = await this.analyzeWeightChanges(traineeId);

        return {
            trend,
            summary,
        };
    }
}
