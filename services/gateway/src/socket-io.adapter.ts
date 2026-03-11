import { INestApplicationContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { NextFunction } from "express";
import 'reflect-metadata';
import { Server, ServerOptions, Socket } from 'socket.io';
import { AuthPayloadDto } from "./auth/dto/authPayload.dto";
import { UserRole } from "./common/enums/entities.enum";

export type SocketWithAuth = Socket & { data: { user?: AuthPayloadDto } };

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private readonly app: INestApplicationContext,
        private configService: ConfigService,
    ) {
        super(app);
    }
    createIOServer(port: number, options?: ServerOptions) {
        const frontendUrl = this.configService.get<string>('FRONTEND_URL')!;

        const cors = {
            origin: [
                frontendUrl,
            ],
        };

        const optionsWithCORS = {
            ...options,
            cors,
        };

        const jwtService = this.app.get(JwtService);
        const server: Server = super.createIOServer(port, optionsWithCORS);

        const verifyJwtMiddleware =
            (jwtService: JwtService) =>
                (socket: SocketWithAuth, next: NextFunction) => {
                    const token: string | null =
                        socket.handshake?.auth?.token ||
                        socket.handshake?.query?.token ||
                        this.extractBearerToken(socket.handshake?.headers?.authorization);

                    if (!token) {
                        next(new Error('FORBIDDEN'));
                        return;
                    }

                    try {
                        const payload = jwtService.verify<AuthPayloadDto>(token);
                        socket.data.user = payload;
                        next();
                    } catch {
                        next(new Error('FORBIDDEN'));
                    }
                };

        server.of('/notifications').use(verifyJwtMiddleware(jwtService));
        server.of('/chat').use(verifyJwtMiddleware(jwtService));

        return server;
    }

    private extractBearerToken(authHeader?: string): string | null {
        if (!authHeader) return null;
        const [type, token] = authHeader.split(' ');
        return type?.toLowerCase() === 'bearer' ? token : null;
    }
}