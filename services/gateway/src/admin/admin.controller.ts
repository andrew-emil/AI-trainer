import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/entities.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('trainer-requests')
  getTrainerRequests() {
    return this.adminService.getTrainerRequests()
  }

  @Get('trainer-requests/:id')
  getTrainerRequestById(@Param('id') id: string) {
    return this.adminService.getTrainerRequestById(id)
  }

  @Patch('trainer-requests/:id/approve')
  async approveTrainerRequest(@Param('id') id: string) {
    await this.adminService.approveTrainerRequest(id)
    return { message: "Trainer Account Approved Successfully"}
  }

  @Patch('trainer-requests/:id/reject')
  async rejectTrainerRequest(@Param('id') id: string, @Body('adminNote') adminNote?: string) {
    await this.adminService.rejectTrainerRequest(id, adminNote)
    return { message: "Trainer Account Rejected Successfully" }
  }

  @Delete('trainer-requests/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrainerRequest(@Param('id') id: string) {
    return this.adminService.deleteTrainerRequest(id)
  }
}
