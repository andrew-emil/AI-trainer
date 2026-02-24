import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { AuthPatterns } from 'src/common/enums/authPatterns.enum';
import { LoginDto } from './dto/login.dto';
import { AuthResponse, AuthResponseSchema } from 'src/common/contracts/auth';
import { rpcCall } from 'src/common/utils/rpc-call.util';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
    ) { }

    login(loginDto: LoginDto) {
        return rpcCall<AuthResponse>(
            this.authClient,
            AuthPatterns.login,
            loginDto,
            AuthResponseSchema,
        )
    }

    refresh(refreshToken: string) {
        return rpcCall<AuthResponse>(
            this.authClient,
            AuthPatterns.refresh,
            refreshToken,
            AuthResponseSchema,
        )
    }
}
