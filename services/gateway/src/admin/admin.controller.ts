import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import { AdminService } from './admin.service';

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
  @HttpCode(HttpStatus.OK)
  async approveTrainerRequest(@Param('id') id: string) {
    return this.adminService.approveTrainerRequest(id)
  }

  @Patch('trainer-requests/:id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectTrainerRequest(@Param('id') id: string, @Body('adminNote') adminNote?: string) {
    return this.adminService.rejectTrainerRequest(id, adminNote)
  }

  @Delete('trainer-requests/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrainerRequest(@Param('id') id: string) {
    return this.adminService.deleteTrainerRequest(id)
  }
}
