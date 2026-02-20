import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { User } from 'src/prisma/generated';
import { AuthPayload } from '../dto/authPayload.dto';

@Injectable()
export class TokenProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwt: ConfigType<typeof jwtConfig>,
    ) { }

    public async generateJwt(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
                role: user.role,
            }, {
                secret: this.jwt.secret!,
                expiresIn: `${this.jwt.expirationTime}` as any,
            }),
            this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
                role: user.role,
            }, {
                secret: this.jwt.refreshTokenSecret!,
                expiresIn: `${this.jwt.refreshTokenExpirationTime}` as any,
            })
        ])

        return { accessToken, refreshToken }
    }

    public async verifyJwt(token: string): Promise<AuthPayload> {
        return await this.jwtService.verifyAsync<AuthPayload>(token, {
            secret: this.jwt.secret!,
        })
    }
}
