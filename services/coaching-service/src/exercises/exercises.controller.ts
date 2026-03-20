import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExercisePatterns } from 'src/common/patterns/exercises.patterns';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller()
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  /* ================= CREATE ================= */
  @MessagePattern(ExercisePatterns.CREATE)
  create(@Payload() dto: CreateExerciseDto) {
    return this.exercisesService.create(dto);
  }

  /* ================= FIND ALL ================= */
  @MessagePattern(ExercisePatterns.FIND_ALL)
  findAll(@Payload() payload: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = payload ?? {};
    return this.exercisesService.findAll(page, limit);
  }

  /* ================= FIND ONE ================= */
  @MessagePattern(ExercisePatterns.FIND_ONE)
  findOne(@Payload() payload: { id: string }) {
    return this.exercisesService.findOne(payload.id);
  }

  /* ================= FIND BY TARGET MUSCLE ================= */
  @MessagePattern(ExercisePatterns.FIND_BY_TARGET_MUSCLE)
  findByTargetMuscle(@Payload() payload: { muscle: string }) {
    return this.exercisesService.findByTargetMuscle(payload.muscle);
  }

  /* ================= FIND BY BODY PART ================= */
  @MessagePattern(ExercisePatterns.FIND_BY_BODY_PART)
  findByBodyPart(@Payload() payload: { bodyPart: string }) {
    return this.exercisesService.findByBodyPart(payload.bodyPart);
  }

  /* ================= FIND BY EQUIPMENT ================= */
  @MessagePattern(ExercisePatterns.FIND_BY_EQUIPMENT)
  findByEquipment(@Payload() payload: { equipment: string }) {
    return this.exercisesService.findByEquipment(payload.equipment);
  }

  /* ================= FIND BY NAME ================= */
  @MessagePattern(ExercisePatterns.FIND_BY_NAME)
  findByName(@Payload() payload: { name: string }) {
    return this.exercisesService.findByName(payload.name);
  }
}