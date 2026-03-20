import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { ExercisePatterns } from 'src/common/patterns/exercises.patterns';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly client: ClientProxy,
  ) { }

  async create(dto: CreateExerciseDto) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.CREATE, dto)
    )
  }

  /* ================= FIND ALL ================= */
  async findAll(page = 1, limit = 10) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.FIND_ALL, { page, limit })
    )
  }

  /* ================= FIND BY TARGET MUSCLE ================= */
  async findByTargetMuscle(muscle: string) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.FIND_BY_TARGET_MUSCLE, { muscle })
    )

  }

  async findByBodyPart(bodyPart: string) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.FIND_BY_BODY_PART, { bodyPart })
    )
  }

  async findByEquipment(equipment: string) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.FIND_BY_EQUIPMENT, { equipment })
    )
  }

  async findByName(name: string) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.FIND_BY_NAME, { name })
    )
  }

  /* ================= FIND ONE ================= */
  async findOne(id: string) {
    return firstValueFrom(
      this.client.send(ExercisePatterns.FIND_ONE, { id })
    )
  }
}
