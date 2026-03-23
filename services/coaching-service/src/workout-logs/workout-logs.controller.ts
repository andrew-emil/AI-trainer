import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkoutLogPattern } from 'src/common/patterns/workout-logs.patterns';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { FindAllPayload } from './dto/find-all.dto';
import { Latest1RMPayload } from './dto/latest-1rm-dto';
import { ProgressiveOverloadPayload } from './dto/progress-overload.dto';
import { SummaryPayload } from './dto/summary.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutLogsService } from './workout-logs.service';

@Controller()
export class WorkoutLogsController {
  constructor(
    private readonly service: WorkoutLogsService) { }

  // ─── CRUD ─────────────────────────────────────────────────────────────────
  @MessagePattern(WorkoutLogPattern.CREATE)
  create(@Payload() payload: { dto: CreateWorkoutSessionDto; traineeId: string }) {
    return this.service.create(payload.dto, payload.traineeId);
  }

  @MessagePattern(WorkoutLogPattern.FIND_ONE)
  findOne(@Payload() payload: { id: string }) {
    return this.service.findOne(payload.id);
  }

  @MessagePattern(WorkoutLogPattern.FIND_ALL)
  findAllByTrainee(@Payload() payload: FindAllPayload) {
    return this.service.findAllByTrainee(
      payload.traineeId,
      payload.limit,
      payload.cursor,
    );
  }

  @MessagePattern(WorkoutLogPattern.UPDATE)
  update(@Payload() payload: { dto: UpdateWorkoutSessionDto }) {
    return this.service.update(payload.dto);
  }

  @MessagePattern(WorkoutLogPattern.REMOVE)
  remove(@Payload() payload: { id: string }) {
    return this.service.remove(payload.id);
  }

  // ─── Analytics ────────────────────────────────────────────────────────────

  @MessagePattern(WorkoutLogPattern.SUMMARY)
  getWorkoutSummary(@Payload() payload: SummaryPayload) {
    const { traineeId, ...options } = payload;
    return this.service.getWorkoutSummary(traineeId, options);
  }

  @MessagePattern(WorkoutLogPattern.PROGRESSIVE_OVERLOAD)
  getProgressiveOverload(@Payload() payload: ProgressiveOverloadPayload) {
    return this.service.getProgressiveOverload(
      payload.traineeId,
      payload.exerciseId,
      payload.dayId,
    );
  }

  @MessagePattern(WorkoutLogPattern.LATEST_PROGRESSIVE_OVERLOAD)
  getLatestProgressiveOverload(@Payload() payload: ProgressiveOverloadPayload) {
    return this.service.getLatestProgressiveOverload(
      payload.traineeId,
      payload.exerciseId,
      payload.dayId,
    );
  }

  @MessagePattern(WorkoutLogPattern.LATEST_1RM)
  getLatest1RMPerExercise(@Payload() payload: Latest1RMPayload) {
    return this.service.getLatest1RMPerExercise(
      payload.traineeId,
      payload.exerciseId,
    );
  }
}
