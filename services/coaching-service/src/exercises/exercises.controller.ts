import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller()
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @MessagePattern('createExercise')
  create(@Payload() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @MessagePattern('findAllExercises')
  findAll() {
    return this.exercisesService.findAll();
  }

  @MessagePattern('findOneExercise')
  findOne(@Payload() id: number) {
    return this.exercisesService.findOne(id);
  }

  @MessagePattern('updateExercise')
  update(@Payload() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(updateExerciseDto.id, updateExerciseDto);
  }

  @MessagePattern('removeExercise')
  remove(@Payload() id: number) {
    return this.exercisesService.remove(id);
  }
}
