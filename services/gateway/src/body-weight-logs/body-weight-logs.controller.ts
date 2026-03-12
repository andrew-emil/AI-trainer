import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { CreateBodyWeightLogDto } from './dto/create-body-weight-log.dto';
import { UpdateBodyWeightLogDto } from './dto/update-body-weight-log.dto';
import { AnalysisProvider } from './providers/analysis.provider';

@Controller('body-weight-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BodyWeightLogsController {
  constructor(
    private readonly bodyWeightLogsService: BodyWeightLogsService,
    private readonly analysisProvider: AnalysisProvider
  ) { }

  @Post()
  @Roles(UserRole.TRAINEE, UserRole.ADMIN)
  create(@Body() createBodyWeightLogDto: CreateBodyWeightLogDto) {
    return this.bodyWeightLogsService.create(createBodyWeightLogDto);
  }

  @Get('trainee/:traineeId')
  findByTrainee(@Param('traineeId') traineeId: string) {
    return this.bodyWeightLogsService.findByTrainee(traineeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodyWeightLogsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.TRAINEE, UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @Body() updateBodyWeightLogDto: UpdateBodyWeightLogDto) {
    return this.bodyWeightLogsService.update(id, req.user.sub, updateBodyWeightLogDto);
  }

  @Delete(':id')
  @Roles(UserRole.TRAINEE, UserRole.ADMIN)
  remove(@Param('id') id: string, @Req() req: CustomRequest) {
    return this.bodyWeightLogsService.remove(id, req.user.sub);
  }

  ///////////analytics endpoints///////////
  // @Roles(UserRole.trainee, UserRole.trainer)
  @Get('analyze/:traineeId')
  analyzeWeightChanges(@Param('traineeId') traineeId: string) {
    return this.analysisProvider.analyzeBodyWeightLog(traineeId);
  }

  // @Roles(UserRole.trainee, UserRole.trainer)
  @Get('trend/:traineeId')
  getWeightTrend(@Param('traineeId') traineeId: string) {
    return this.analysisProvider.getWeightTrend(traineeId);
  }
}
