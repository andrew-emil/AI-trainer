import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Throttle, seconds } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/common/constants/cookieOption';
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
    async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken, user } = await this.authService.login(loginDto);
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = this.authService.isMobile(userAgent);
        if (isMobile) {
            return { accessToken, refreshToken, user };
        }
        res.cookie(this.accessTokenName, accessToken, accessTokenCookieOptions);
        res.cookie(this.refreshTokenName, refreshToken, refreshTokenCookieOptions);
        return { message: 'Login successful', user };
    }

    @Throttle({ auth: { limit: 5, ttl: seconds(60) } }) // 5 attempts/min
    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        const { accessToken, refreshToken: newRefreshToken, user } =
            await this.authService.refresh(refreshToken);

        const userAgent = req.headers['user-agent'] || '';
        const isMobile = this.authService.isMobile(userAgent);
        if (isMobile) {
            return { accessToken, refreshToken, user };
        }
        res.cookie(this.accessTokenName, accessToken, accessTokenCookieOptions);
        res.cookie(this.refreshTokenName, newRefreshToken, refreshTokenCookieOptions);

        return { message: 'Refresh successful', user };
    }

    @Throttle({ auth: { limit: 3, ttl: seconds(60) } }) // 3 registrations/min
    @Post('register-as-trainee')
    async registerAsTrainee(@Body() registerDto: RegisterAsTraineeDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken, user } = await this.authService.registerAsTrainee(registerDto);
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = this.authService.isMobile(userAgent);
        if (isMobile) {
            return { accessToken, refreshToken, user };
        }
        res.cookie(this.accessTokenName, accessToken, accessTokenCookieOptions);
        res.cookie(this.refreshTokenName, refreshToken, refreshTokenCookieOptions);

        return { message: 'Registration successful', user };
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
        res.clearCookie(this.accessTokenName, accessTokenCookieOptions);
        res.clearCookie(this.refreshTokenName, refreshTokenCookieOptions);
        return this.authService.logout(req.user.sub);
    }
}
