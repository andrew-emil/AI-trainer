import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MusclesService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.muscle.findMany();
  }

  findOne(id: string) {
    return this.prisma.muscle.findUnique({
      where: { id },
    });
  }

  findByName(name: string) {
    return this.prisma.muscle.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
}
