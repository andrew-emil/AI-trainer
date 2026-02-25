import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';
import { TrainerConversionUtil } from 'src/common/utils/trainer-conversion.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { CreatedTrainer } from './dto/createdTrainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { UserService } from '../user.service';

@Injectable()
export class TrainerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloudinaryProvider: CloudinaryProvider,
        private readonly userService: UserService,
    ) { }

    /**
   * Converts years of experience (number) to a Date
   * Example: 4 years in 2026 -> Date('2022-01-01')
   */
    private convertYearsToDate(years: number): Date {
        const currentYear = new Date().getFullYear();
        const targetYear = currentYear - years;
        return new Date(targetYear, 0, 1); // January 1st of target year
    }

    async create(dto: CreateTrainerDto) {
        const { userId, bio, experienceYears, certifications, transformations } =
            dto;

        return await this.prisma.trainer.create({
            data: {
                userId,
                bio,
                experienceYears: this.convertYearsToDate(experienceYears),
                transformations: transformations
                    ? {
                        create: transformations.map((t) => ({
                            name: t.name,
                            imageUrl: t.imageUrl ?? null,
                            imagePublicId: t.imagePublicId ?? null,
                        })),
                    }
                    : undefined,

                certifications: certifications
                    ? {
                        create: certifications.map((c) => ({
                            name: c.name,
                            imageUrl: c.imageUrl ?? null,
                            imagePublicId: c.imagePublicId ?? null,
                            issuedBy: c.issuedBy ?? null,
                            issuedAt: c.issuedAt ?? null,
                        })),
                    }
                    : undefined,
            },
            include: { user: true },
        }) as CreatedTrainer;
    }

    async findAll() {
        return this.prisma.trainer.findMany();
    }

    async findOne(id: string) {
        const trainer = await this.prisma.trainer.findUnique({ where: { userId: id } });
        if (!trainer) throw new RpcException({
            status: 404,
            message: "Trainer not found",
        });
        return trainer;
    }

    async update(id: string, dto: UpdateTrainerDto) {
        await this.findOne(id);

        const {
            certifications,
            transformations,
            experienceYears,
            userId,
            ...updateData
        } = dto;

        // 1) Load old assets for cleanup
        const old = await this.prisma.trainer.findUnique({
            where: { userId: id },
            include: {
                certifications: { select: { imagePublicId: true } },
                transformations: { select: { imagePublicId: true } },
            },
        });
        if (!old) throw new RpcException({
            status: 404,
            message: "Trainer not found",
        });

        const oldCertIds = old.certifications
            .map((x) => x.imagePublicId)
            .filter(Boolean);
        const oldTransIds = old.transformations
            .map((x) => x.imagePublicId)
            .filter(Boolean) as string[];

        // 2) Compute new ids that will remain
        const newCertIds = (certifications ?? [])
            .map((x) => x.imagePublicId)
            .filter(Boolean);
        const newTransIds = (transformations ?? [])
            .map((x) => x.imagePublicId)
            .filter(Boolean);

        const certToDelete = oldCertIds.filter((pid) => !newCertIds.includes(pid));
        const transToDelete = oldTransIds.filter(
            (pid) => !newTransIds.includes(pid),
        );

        // Convert experienceYears from number to Date if provided
        const experienceYearsDate =
            experienceYears !== undefined
                ? this.convertYearsToDate(experienceYears)
                : undefined;

        // 3) Update DB
        const updated = await this.prisma.trainer.update({
            where: { userId: id },
            data: {
                ...updateData,
                ...(experienceYearsDate && { experienceYears: experienceYearsDate }),

                ...(certifications && {
                    certifications: {
                        deleteMany: {},
                        create: certifications.map((c) => ({
                            name: c.name,
                            imageUrl: c.imageUrl ?? null,
                            imagePublicId: c.imagePublicId ?? null,
                            issuedBy: c.issuedBy ?? null,
                            issuedAt: c.issuedAt ?? null,
                        })),
                    },
                }),

                ...(transformations && {
                    transformations: {
                        deleteMany: {},
                        create: transformations.map((t) => ({
                            name: t.name,
                            imageUrl: t.imageUrl ?? null,
                            imagePublicId: t.imagePublicId ?? null,
                        })),
                    },
                }),
            },
            include: { user: true },
        });

        // 4) Best-effort Cloudinary cleanup (after DB success)
        await Promise.all([
            ...certToDelete.map((pid) => this.cloudinaryProvider.deleteImage(pid)),
            ...transToDelete.map((pid) => this.cloudinaryProvider.deleteImage(pid)),
        ]);

        // 5) Notify Admins if critical info changed
        const experienceChanged =
            experienceYearsDate !== undefined &&
            experienceYearsDate.getTime() !== old.experienceYears.getTime();
        const certificationsChanged = certifications !== undefined;

        if (experienceChanged || certificationsChanged) {
            // TODO: implement notification service
            // await this.sendProfileUpdateNotificationToAdmins(
            //     updated.user.username,
            //     id,
            // );
        }

        // Convert experienceYears back to number for response
        return TrainerConversionUtil.transformTrainer(updated);
    }

    async delete(id: string) {
        const trainer = await this.prisma.trainer.findUnique({
            where: { userId: id },
            include: {
                certifications: { select: { imagePublicId: true } },
                transformations: { select: { imagePublicId: true } },
                user: { select: { avatarPublicId: true } }, // optional
            },
        });

        if (!trainer) throw new RpcException({
            status: 404,
            message: "Trainer not found",
        });

        const certIds = trainer.certifications
            .map((x) => x.imagePublicId)
            .filter(Boolean);
        const transIds = trainer.transformations
            .map((x) => x.imagePublicId)
            .filter(Boolean) as string[];

        // Optional: also remove avatar when deleting trainer
        const avatarId = trainer.user?.avatarPublicId ?? null;

        // Delete DB records (cascade will delete certifications/transformations rows)
        await this.prisma.trainer.delete({ where: { userId: id } });
        await this.userService.delete(trainer.userId);

        // Best-effort Cloudinary cleanup
        await Promise.all([
            ...certIds.map((pid) => this.cloudinaryProvider.deleteImage(pid)),
            ...transIds.map((pid) => this.cloudinaryProvider.deleteImage(pid)),
            ...(avatarId ? [this.cloudinaryProvider.deleteImage(avatarId)] : []),
        ]);

        return { ok: true };
    }
}
