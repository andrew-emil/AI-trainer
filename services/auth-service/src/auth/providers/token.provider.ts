import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { User } from '@prisma/client';
import { AuthPayload } from '../dto/authPayload.dto';
import crypto from 'crypto';

@Injectable()
export class TokenProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwt: ConfigType<typeof jwtConfig>,
    ) { }

    public async generateJwt(user: User) {
        const accessToken = await this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
                role: user.role,
            }, {
                secret: this.jwt.secret!,
                expiresIn: `${this.jwt.expirationTime}` as any,
            });

        return { accessToken }
    }

    public async verifyJwt(token: string): Promise<AuthPayload> {
        return await this.jwtService.verifyAsync<AuthPayload>(token, {
            secret: this.jwt.secret!,
        })
    }

    generateRandomToken(len = 64) {
        return crypto.randomBytes(len).toString("hex");
    }
}
