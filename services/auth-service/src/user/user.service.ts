import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { HashingService } from 'src/common/hashing/hashing.service';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashingService: HashingService,
        private readonly cloudinaryProvider: CloudinaryProvider,
    ) { }

    async create(dto: CreateUserDto) {
        const { password, ...rest } = dto;
        const hashedPassword = await this.hashingService.hashPassword(password);
        return this.prisma.user.create({
            data: {
                ...rest,
                passwordHash: hashedPassword,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                avatar: true,
                avatarPublicId: true,
            },
        });
    }

    findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                avatar: true,
                avatarPublicId: true,
            },
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                avatar: true,
                avatarPublicId: true,
            },
        });
        if (!user) throw new RpcException({
            status: 404,
            message: "User not found",
        });
        return user;
    }

    async update(id: string, dto: UpdateUserDto) {
        const existing = await this.findOne(id); // throws if not found

        // Password
        const passwordHash = dto.password
            ? await this.hashingService.hashPassword(dto.password)
            : undefined;

        const isAvatarUpdate =
            dto.avatar !== undefined || dto.avatarPublicId !== undefined;

        if (isAvatarUpdate) {
            const hasUrl = !!dto.avatar;
            const hasPid = !!dto.avatarPublicId;

            if ((hasUrl && !hasPid) || (!hasUrl && hasPid)) {
                throw new RpcException({
                    status: 400,
                    message: "avatar and avatarPublicId must be provided together.",
                });
            }
        }

        const oldAvatarPublicId = existing.avatarPublicId;

        const data: any = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            username: dto.username,
            email: dto.email,
            gender: dto.gender,
            passwordHash,
        };

        if (isAvatarUpdate) {
            data.avatar = dto.avatar ?? null;
            data.avatarPublicId = dto.avatarPublicId ?? null;
        }

        const updated = await this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                avatar: true,
                avatarPublicId: true,
            },
        });

        // Cleanup old avatar if replaced/cleared
        if (
            isAvatarUpdate &&
            oldAvatarPublicId &&
            oldAvatarPublicId !== dto.avatarPublicId
        ) {
            await this.cloudinaryProvider.deleteImage(oldAvatarPublicId);
        }

        return updated;
    }

    async delete(id: string) {
        const user = await this.findOne(id);
        const avatarId = user.avatarPublicId;

        if (avatarId) await this.cloudinaryProvider.deleteImage(avatarId);

        await this.prisma.user.delete({
            where: { id },
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
