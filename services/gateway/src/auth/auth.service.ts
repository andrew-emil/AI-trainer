import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { AuthResponse, AuthResponseSchema } from 'src/common/contracts/auth';
import { AuthPatterns } from 'src/common/patterns/authPatterns.enum';
import { rpcCall } from 'src/common/utils/rpc-call.util';
import { LoginDto } from './dto/login.dto';
import { RegisterAsTraineeDto } from './dto/registerAsTrainee.dto';
import { RegisterAsTrainerDto } from './dto/registerAsTrainer.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

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

    registerAsTrainee(registerDto: RegisterAsTraineeDto) {
        return rpcCall<AuthResponse>(
            this.authClient,
            AuthPatterns.registerAsTrainee,
            registerDto,
            AuthResponseSchema,
        )
    }

    registerAsTrainer(registerDto: RegisterAsTrainerDto) {
        return firstValueFrom(
            this.authClient.send(AuthPatterns.registerAsTrainer, registerDto)
        )
    }

    forgetPassword(email: string) {
        return firstValueFrom(
            this.authClient.send(AuthPatterns.forgetPassword, { email })
        )
    }

    resetPassword(resetPasswordDto: ResetPasswordDto) {
        return rpcCall<AuthResponse>(
            this.authClient,
            AuthPatterns.resetPassword,
            resetPasswordDto,
            AuthResponseSchema,
        )
    }

    logout(userId: string) {
        return firstValueFrom(
            this.authClient.send(AuthPatterns.logout, { userId })
        )
    }
}
