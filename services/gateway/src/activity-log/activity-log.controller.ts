import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/authPayload.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-log')
@UseGuards(JwtAuthGuard)
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) { }

  @Get()
  findAll(
    @Req() req: { user: AuthPayloadDto },
    @Query("page") page: string,
    @Query('limit') limit: string,
  ) {
    return this.activityLogService.findAll(req.user.sub, Number(page), Number(limit));
  }

  @Get('last-three')
  getLastThree(
    @Req() req: { user: AuthPayloadDto },
  ) {
    return this.activityLogService.findLastThree(req.user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @Req() req: { user: AuthPayloadDto },
  ) {
    return this.activityLogService.remove(id, req.user.sub);
  }
}
