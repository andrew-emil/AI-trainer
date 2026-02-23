import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import type { Response, Request } from 'express';
import { cookieOptions } from 'src/common/constants/cookieOption';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await this.authService.login(loginDto);
        res.cookie('refreshToken', refreshToken, cookieOptions);
        return { accessToken };
    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        const { accessToken, refreshToken: newRefreshToken } =
            await this.authService.refresh(refreshToken);
        if (newRefreshToken) {
            res.cookie('refreshToken', newRefreshToken, cookieOptions);
        }

        return { accessToken };
    }
}
