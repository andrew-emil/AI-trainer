import { PrismaClient } from '@prisma/client';

import muscles from '../data/muscles.json';
import bodyParts from '../data/bodyParts.json';
import equipments from '../data/equipments.json';
import exercises from '../data/exercises.json';

export async function seedExercises(prisma: PrismaClient) {
  console.log('🏋️‍♂️ Seeding exercises...');

  await prisma.muscle.createMany({
    data: muscles,
    skipDuplicates: true,
  });

  await prisma.bodyPart.createMany({
    data: bodyParts,
    skipDuplicates: true,
  });

  await prisma.equipment.createMany({
    data: equipments,
    skipDuplicates: true,
  });

  await prisma.exercise.createMany({
    data: exercises.map((exercise: any) => ({
      name: exercise.name,
      gifUrl: exercise.gifUrl,
      targetMuscles: exercise.targetMuscles ?? [],
      bodyParts: exercise.bodyParts ?? [],
      equipments: exercise.equipments ?? [],
      secondaryMuscles: exercise.secondaryMuscles ?? [],
      instructions: exercise.instructions,
    })),
    skipDuplicates: true,
  });

  console.log('✅ Exercise seed done');
}
