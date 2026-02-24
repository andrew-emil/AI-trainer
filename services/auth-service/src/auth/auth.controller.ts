import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthPatterns } from 'src/common/enums/authPatterns.enum';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAsTraineeDto } from './dto/registerAsTrainee.dto';
import { RegisterAsTrainerDto } from './dto/registerAsTrainer.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern(AuthPatterns.login)
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern(AuthPatterns.registerAsTrainee)
  registerAsTrainee(@Payload() registerAsTraineeDto: RegisterAsTraineeDto) {
    console.log(typeof registerAsTraineeDto, registerAsTraineeDto);
    return this.authService.registerAsTrainee(registerAsTraineeDto);
  }

  @MessagePattern(AuthPatterns.registerAsTrainer)
  registerAsTrainer(@Payload() registerAsTrainerDto: RegisterAsTrainerDto) {
    return this.authService.registerAsTrainer(registerAsTrainerDto);
  }

  @EventPattern(AuthPatterns.forgetPassword)
  forgetPassword(@Payload() email: string) {
    return this.authService.forgetPassword(email);
  }

  @MessagePattern(AuthPatterns.resetPassword)
  resetPassword(@Payload() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.password, resetPasswordDto.token);
  }

  @MessagePattern(AuthPatterns.refresh)
  refresh(@Payload() refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @MessagePattern(AuthPatterns.logout)
  logout(@Payload() { userId }: { userId: string }) {
    return this.authService.logout(userId);
  }
}
