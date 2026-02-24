import type { Request, Response } from 'express';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { AuthService } from './auth.service';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterAsTraineeDto } from './dto/registerAsTrainee.dto';
import { RegisterAsTrainerDto } from './dto/registerAsTrainer.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        accessToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    registerAsTrainee(registerDto: RegisterAsTraineeDto, res: Response): Promise<{
        accessToken: string;
    }>;
    registerAsTrainer(registerDto: RegisterAsTrainerDto): Promise<any>;
    forgetPassword({ email }: ForgetPasswordDto): Promise<any>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<import("../common/contracts/auth").AuthResponse>;
    logout(req: CustomRequest, res: Response): Promise<any>;
}
