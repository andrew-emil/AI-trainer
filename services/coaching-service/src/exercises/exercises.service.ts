import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) { }

  /* ================= CREATE ================= */
  async create(dto: CreateExerciseDto) {
    // check unique name
    const exists = await this.prisma.exercise.findUnique({
      where: { name: dto.name },
    });

    if (exists) {
      throw new ConflictException("Exercise already exists");
    }

    return this.prisma.exercise.create({
      data: {
        name: dto.name,
        gifUrl: dto.gifUrl,
        targetMuscles: dto.targetMuscles,
        bodyParts: dto.bodyParts,
        equipments: dto.equipments,
        secondaryMuscles: dto.secondaryMuscles ?? [],
        instructions: dto.instructions,
      },
    });
  }

  /* ================= FIND ALL ================= */
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [exercises, totalExercises] = await Promise.all([
      this.prisma.exercise.findMany({
        skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      this.prisma.exercise.count(),
    ]);

    return {
      exercises,
      page,
      limit,
      totalExercises,
      totalPages: Math.ceil(totalExercises / limit),
    }
  }

  /* ================= FIND BY TARGET MUSCLE ================= */
  async findByTargetMuscle(muscle: string) {
    return this.prisma.exercise.findMany({
      where: {
        targetMuscles: {
          has: muscle,
        },
      },
    });
  }

  async findByBodyPart(bodyPart: string) {
    return this.prisma.exercise.findMany({
      where: {
        bodyParts: {
          has: bodyPart,
        },
      },
    });
  }

  async findByEquipment(equipment: string) {
    return this.prisma.exercise.findMany({
      where: {
        equipments: {
          has: equipment,
        },
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.exercise.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  /* ================= FIND ONE ================= */
  async findOne(id: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException("Exercise not found");
    }

    return exercise;
  }
}
