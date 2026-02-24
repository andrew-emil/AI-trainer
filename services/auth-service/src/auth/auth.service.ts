import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { User, UserRole } from '@prisma/client';
import ms from 'ms';
import { EmailPatterns } from 'src/common/enums/emailPatterns.enum';
import { NotificationPatterns } from 'src/common/enums/traineePatterns.enum';
import { HashingService } from 'src/common/hashing/hashing.service';
import jwtConfiguration from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RabbitProducerService } from 'src/rabbit-producer/rabbit-producer.service';
import { TraineeService } from 'src/user/trainee/trainee.service';
import { TrainerService } from 'src/user/trainer/trainer.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAsTraineeDto } from './dto/registerAsTrainee.dto';
import { RegisterAsTrainerDto } from './dto/registerAsTrainer.dto';
import { TokenProvider } from './providers/token.provider';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenProvider: TokenProvider,
        private readonly prisma: PrismaService,
        private readonly hashingService: HashingService,
        private readonly trainerService: TrainerService,
        private readonly traineeService: TraineeService,
        private readonly rabbitProducerService: RabbitProducerService,
        @Inject(jwtConfiguration.KEY)
        private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new RpcException({
                status: 401,
                message: "Invalid email or password",
            });

        const isPasswordValid = await this.hashingService.comparePassword(
            password,
            user.passwordHash,
        );
        if (!isPasswordValid)
            throw new RpcException({
                status: 401,
                message: "Invalid email or password",
            });

        return user;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (user.role == "trainer") {
            const trainer = await this.trainerService.findOne(user.id);
            if (!trainer) throw new RpcException({
                status: 404,
                message: "Trainer not found",
            });
            if (!trainer.isActive)
                throw new RpcException({
                    status: 401,
                    message: "Trainer is not active",
                });
        }

        if (user.role == "trainee") {
            const trainee = await this.traineeService.findOne(user.id);
            if (!trainee) throw new RpcException({
                status: 404,
                message: "Trainer not found",
            });
            if (!trainee.isActive)
                throw new RpcException({
                    status: 401,
                    message: "Trainer is not active",
                });
        }

        const { accessToken } = await this.tokenProvider.generateJwt(user);
        const refreshToken = this.tokenProvider.generateRandomToken();
        await this.createRefreshSession(user.id, refreshToken);
        return { accessToken, refreshToken };
    }

    async forgetPassword(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) return {
            message: "Reset link sent successfully",
        };

        const resetToken = this.tokenProvider.generateRandomToken(32);
        const resetTokenHash = this.hashingService.hashToken(resetToken);
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        try {
            await this.prisma.resetPasswordToken.create({
                data: {
                    userId: user.id,
                    tokenHash: resetTokenHash,
                    expiresAt: resetTokenExpiry,
                },
            });

            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(resetToken)}`;
            this.rabbitProducerService.emitPatternToInteractionDomain(EmailPatterns.sendEmail, {
                to: email,
                resetLink,
                userName: user.username,
                expirationTime: "1 hour",
            });
        } catch (error) {
            console.log(error)
        } finally {
            return {
                message: "Reset link sent successfully",
            };
        }
    }

    async resetPassword(password: string, token: string) {
        const now = new Date();

        const tokenHash = this.hashingService.hashToken(token);

        const resetRow = await this.prisma.resetPasswordToken.findFirst({
            where: {
                tokenHash,
                usedAt: null,
                expiresAt: { gt: now },
            },
            include: { user: true },
        });

        if (!resetRow) {
            throw new RpcException({
                status: 401,
                message: "Invalid or expired reset token",
            });
        }

        const newPasswordHash = await this.hashingService.hashPassword(password);

        await this.prisma.$transaction(async (tx) => {
            // mark token used (race-safe)
            const markUsed = await tx.resetPasswordToken.updateMany({
                where: {
                    id: resetRow.id,
                    usedAt: null,
                    expiresAt: { gt: now },
                },
                data: { usedAt: now },
            });

            if (markUsed.count !== 1) {
                throw new RpcException({
                    status: 401,
                    message: "Reset token already used or expired",
                });
            }

            // update password
            await tx.user.update({
                where: { id: resetRow.userId },
                data: { passwordHash: newPasswordHash },
            });

            // delete other active tokens for same user
            await tx.resetPasswordToken.deleteMany({
                where: {
                    userId: resetRow.userId,
                    usedAt: null,
                },
            });
        });

        const { accessToken } = await this.tokenProvider.generateJwt(resetRow.user as User);
        const refreshToken = this.tokenProvider.generateRandomToken();
        await this.createRefreshSession(resetRow.userId, refreshToken);

        return { accessToken, refreshToken };
    }

    async registerAsTrainee(data: RegisterAsTraineeDto) {
        const { goal, heightCm, ...userDto } = data;

        const user = await this.userService.create({
            ...userDto,
            role: UserRole.trainee,
        });

        try {
            const trainee = await this.prisma.trainee.create({
                data: {
                    userId: user.id,
                    goal,
                    heightCm,
                },
            });

            if (!trainee) {
                await this.userService.delete(user.id);
                throw new RpcException({
                    status: 500,
                    message: "Trainee not created",
                });
            }
        } catch (err) {
            console.log(err);
            await this.userService.delete(user.id);
        }

        this.rabbitProducerService.emitPatternToInteractionDomain(NotificationPatterns.USER_CREATED, {
            userId: user.id,
            userRole: UserRole.trainee,
        });

        const { accessToken } = await this.tokenProvider.generateJwt(user as User);
        const refreshToken = this.tokenProvider.generateRandomToken();
        await this.createRefreshSession(user.id, refreshToken);
        return { accessToken, refreshToken };
    }

    async registerAsTrainer(data: RegisterAsTrainerDto) {
        const {
            bio,
            experienceYears,
            certifications,
            transformations,
            ...userDto
        } = data;

        await this.prisma.$transaction(async (tx) => {
            const user = await this.userService.create({
                ...userDto,
                role: UserRole.trainer,
            });

            // Convert experienceYears from number to Date
            const currentYear = new Date().getFullYear();
            const targetYear = currentYear - experienceYears;
            const experienceYearsDate = new Date(targetYear, 0, 1);

            await tx.trainer.create({
                data: {
                    userId: user.id,
                    bio,
                    experienceYears: experienceYearsDate,
                    isActive: false,
                },
            });

            const trainerRequest = await tx.trainerApplication.create({
                data: {
                    userId: user.id,
                },
            });

            if (certifications && certifications.length > 0) {
                await tx.trainerCertification.createMany({
                    data: certifications.map((cert) => ({
                        trainerId: user.id, // Link directly to trainer
                        trainerRequestId: trainerRequest.id,
                        name: cert.name,
                        imageUrl: cert.imageUrl,
                        imagePublicId: cert.imagePublicId,
                        issuedBy: cert.issuedBy ?? null,
                        issuedAt: cert.issuedAt ? new Date(cert.issuedAt) : null,
                    })) as any,
                });
            }

            if (transformations && transformations.length > 0) {
                await tx.trainerTransformation.createMany({
                    data: transformations.map((trans) => ({
                        trainerId: user.id, // Link directly to trainer
                        trainerRequestId: trainerRequest.id,
                        name: trans.name,
                        imageUrl: trans.imageUrl,
                        imagePublicId: trans.imagePublicId ?? null,
                    })) as any,
                });
            }
        });

        return {
            message: "Trainer registered successfully, wait for admin approval",
        };
    }

    async refresh(refreshToken: string) {
        const refreshHash = this.hashingService.hashToken(refreshToken);
        const now = new Date();

        const session = await this.prisma.refreshSession.findFirst({
            where: { refreshHash },
            include: { user: true },
        });

        if (!session || session.expiresAt <= now) {
            throw new RpcException({
                status: 401,
                message: "Invalid or expired refresh token",
            });
        }

        const user = session.user;
        const newRefreshToken = this.tokenProvider.generateRandomToken();
        const newExpiry = new Date(Date.now() + ms(this.jwtConfig.refreshTokenExpirationTime as unknown as any));

        await this.prisma.refreshSession.update({
            where: { id: session.id },
            data: {
                refreshHash: this.hashingService.hashToken(newRefreshToken),
                expiresAt: newExpiry,
            },
        });

        const { accessToken } = await this.tokenProvider.generateJwt(user as User);
        return { accessToken, refreshToken: newRefreshToken };
    }

    async logout(userId: string) {
        await this.prisma.refreshSession.deleteMany({
            where: { userId },
        });
        return { message: "Logged out successfully" };
    }

    private async createRefreshSession(
        userId: string,
        refreshToken: string,
    ) {
        const refreshHash = this.hashingService.hashToken(refreshToken);

        const expiration = this.jwtConfig.refreshTokenExpirationTime;
        if (!expiration) {
            throw new RpcException({
                status: 500,
                message: 'Refresh token expiration is not configured',
            });
        }

        const ttl = ms(expiration as unknown as any);

        if (typeof ttl !== 'number') {
            throw new RpcException({
                status: 500,
                message: 'Invalid refresh token expiration format (e.g. "60d", "7d", "12h")',
            });
        }

        const expiresAt = new Date(Date.now() + ttl);

        return this.prisma.refreshSession.create({
            data: {
                userId,
                refreshHash,
                expiresAt,
            },
        });
    }
}
