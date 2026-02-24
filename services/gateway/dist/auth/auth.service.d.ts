import { ClientProxy } from '@nestjs/microservices';
import { AuthResponse } from 'src/common/contracts/auth';
import { LoginDto } from './dto/login.dto';
import { RegisterAsTraineeDto } from './dto/registerAsTrainee.dto';
import { RegisterAsTrainerDto } from './dto/registerAsTrainer.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    login(loginDto: LoginDto): Promise<AuthResponse>;
    refresh(refreshToken: string): Promise<AuthResponse>;
    registerAsTrainee(registerDto: RegisterAsTraineeDto): Promise<AuthResponse>;
    registerAsTrainer(registerDto: RegisterAsTrainerDto): Promise<any>;
    forgetPassword(email: string): Promise<any>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<AuthResponse>;
    logout(userId: string): Promise<any>;
}
