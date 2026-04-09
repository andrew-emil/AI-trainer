import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Throttle, seconds } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { cookieOptions } from 'src/common/constants/cookieOption';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { AuthService } from './auth.service';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterAsTraineeDto } from './dto/registerAsTrainee.dto';
import { RegisterAsTrainerDto } from './dto/registerAsTrainer.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    private readonly refreshTokenName = "refreshToken";
    private readonly accessTokenName = "accessToken";

    constructor(private readonly authService: AuthService) { }

    @Throttle({ auth: { limit: 5, ttl: seconds(60) } }) // 5 attempts/min
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await this.authService.login(loginDto);
        res.cookie(this.accessTokenName, accessToken, cookieOptions);
        res.cookie(this.refreshTokenName, refreshToken, cookieOptions);
        return { success: true };
    }

    @Throttle({ auth: { limit: 5, ttl: seconds(60) } }) // 5 attempts/min
    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        const { accessToken, refreshToken: newRefreshToken } =
            await this.authService.refresh(refreshToken);

        res.cookie(this.accessTokenName, accessToken, cookieOptions);
        if (newRefreshToken) {
            res.cookie(this.refreshTokenName, newRefreshToken, cookieOptions);
        }

        return { success: true };
    }

    @Throttle({ auth: { limit: 3, ttl: seconds(60) } }) // 3 registrations/min
    @Post('register-as-trainee')
    async registerAsTrainee(@Body() registerDto: RegisterAsTraineeDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await this.authService.registerAsTrainee(registerDto);
        res.cookie(this.accessTokenName, accessToken, cookieOptions);
        res.cookie(this.refreshTokenName, refreshToken, cookieOptions);
        return { success: true };
    }

    @Throttle({ auth: { limit: 3, ttl: seconds(60) } }) // 3 registrations/min
    @Post('register-as-trainer')
    async registerAsTrainer(@Body() registerDto: RegisterAsTrainerDto) {
        return this.authService.registerAsTrainer(registerDto);
    }

    @Throttle({ auth: { limit: 1, ttl: seconds(60) } }) // 1 registrations/min
    @Post('forget-password')
    @HttpCode(HttpStatus.OK)
    forgetPassword(@Body() { email }: ForgetPasswordDto) {
        return this.authService.forgetPassword(email);
    }

    @Throttle({ auth: { limit: 1, ttl: seconds(60) } }) // 1 registrations/min
    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: CustomRequest, @Res({ passthrough: true }) res: Response) {
        res.clearCookie(this.accessTokenName, cookieOptions);
        res.clearCookie(this.refreshTokenName, cookieOptions);
        return this.authService.logout(req.user.sub);
    }
}
