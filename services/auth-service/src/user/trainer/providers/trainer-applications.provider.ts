import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TrainerApplicationStatus } from '@prisma/client';
import { TrainerConversionUtil } from 'src/common/utils/trainer-conversion.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainerApplicationsProvider {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getTrainerRequests(
        status?: TrainerApplicationStatus,
    ) {
        const requests = await this.prisma.trainerApplication.findMany({
            where: status ? { status } : undefined,
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                        trainer: {
                            select: {
                                bio: true,
                                experienceYears: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return requests.map((r) =>
            TrainerConversionUtil.transformTrainerRequest(r),
        ) as any;
    }

    async getTrainerRequest(requestId: string) {
        const request = await this.prisma.trainerApplication.findUnique({
            where: { id: requestId },
            include: {
                certifications: true,
                transformations: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                        trainer: {
                            select: {
                                bio: true,
                                experienceYears: true,
                            },
                        },
                    },
                },
            },
        });
        return TrainerConversionUtil.transformTrainerRequest(request);
    }

    async approveTrainerRequest(requestId: string) {
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.trainerApplication.findUnique({
                where: { id: requestId },
                include: {
                    certifications: true,
                    transformations: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        },
                    },
                },
            });

            if (!request) throw new RpcException({
                status: 404,
                message: "Trainer request not found"
            });

            if (request.status !== TrainerApplicationStatus.pending)
                throw new RpcException({
                    status: 400,
                    message: "Request already processed"
                });

            // 1️⃣ Activate Trainer
            const updatedTrainer = await tx.trainer.update({
                where: { userId: request.userId },
                data: { isActive: true },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        }
                    }
                }
            });

            //TODO: calculate rank score via sending to coaching service
            // this.trainerService.calculateRankScore(request.userId, tx)

            // 3️⃣ Update request status
            await tx.trainerApplication.update({
                where: { id: requestId },
                data: {
                    status: TrainerApplicationStatus.approved,
                },
            });

            return updatedTrainer
        });
    }

    async rejectTrainerRequest(requestId: string, adminNote?: string) {
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.trainerApplication.findUnique({
                where: { id: requestId },
                include: { user: true },
            });

            if (!request) throw new RpcException({
                status: 404,
                message: "Trainer request not found"
            });

            if (request.status !== "pending")
                throw new RpcException({
                    status: 400,
                    message: "Request already processed"
                });

            return await tx.trainerApplication.update({
                where: { id: requestId },
                data: {
                    status: TrainerApplicationStatus.rejected,
                    adminNote,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        }
                    },
                }
            });
        })

    }

    deleteTrainerApplication(id: string) {
        return this.prisma.trainerApplication.delete({
            where: {
                id
            }
        });
    }
}
