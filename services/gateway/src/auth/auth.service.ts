import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthPatterns } from 'src/common/enums/authPatterns.enum';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        const { accessToken, refreshToken } = await firstValueFrom(
            this.authClient.send(AuthPatterns.login, loginDto)
        )

        return { accessToken, refreshToken }
    }

    async refresh(refreshToken: string) {
        const result = await firstValueFrom(
            this.authClient.send(AuthPatterns.refresh, refreshToken)
        )

        return result
    }
}
