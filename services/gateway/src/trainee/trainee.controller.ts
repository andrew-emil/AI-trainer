import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/entities.enum';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { TraineeService } from './trainee.service';
import { CreateTrainerReviewDto } from './dto/create-trainer-review.dto';
import { UpdateTrainerReviewDto } from './dto/update-trainer-review.dto';

@UseGuards(JwtAuthGuard)
@Controller('trainee')
export class TraineeController {
  constructor(private readonly traineeService: TraineeService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('all')
  findAll() {
    return this.traineeService.findAll();
  }

  @Get()
  findOne(@Req() req: CustomRequest) {
    return this.traineeService.findOne(req.user.sub);
  }

  @Patch()
  update(@Req() req: CustomRequest, @Body() updateTraineeDto: UpdateTraineeDto) {
    return this.traineeService.update(req.user.sub, updateTraineeDto);
  }

  @Delete()
  remove(@Req() req: CustomRequest) {
    return this.traineeService.remove(req.user.sub);
  }

  // ------------ Reviews ------------
  @Get("reviews")
  getReviewsForTrainee(@Req() req: CustomRequest) {
    return this.traineeService.getReviewsForTrainee(req.user.sub);
  }

  @Post("/review")
  createReview(@Req() req: CustomRequest, @Body() dto: CreateTrainerReviewDto) {
    return this.traineeService.createReview(
      req.user.sub,
      dto,
    );
  }

  @Patch("review/:reviewId")
  updateReview(
    @Param("reviewId") reviewId: string,
    @Req() req: CustomRequest,
    @Body() dto: UpdateTrainerReviewDto,
  ) {
    return this.traineeService.updateReview(
      reviewId,
      req.user.sub,
      dto,
    );
  }

  @Delete("review/:reviewId")
  deleteReview(@Param("reviewId") reviewId: string, @Req() req: CustomRequest) {
    return this.traineeService.deleteReview(reviewId, req.user.sub);
  }

}
