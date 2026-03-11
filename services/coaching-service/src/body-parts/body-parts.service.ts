import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBodyPartDto } from './dto/create-body-part.dto';
import { UpdateBodyPartDto } from './dto/update-body-part.dto';

@Injectable()
export class BodyPartsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBodyPartDto: CreateBodyPartDto) {
    return await this.prisma.bodyPart.create({
      data: {
        name: this.normalizeName(createBodyPartDto.name),
      },
    });
  }

  async findAll() {
    return await this.prisma.bodyPart.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.bodyPart.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.prisma.bodyPart.findUnique({
      where: { name: this.normalizeName(name) },
    });
  }

  async remove(id: string) {
    await this.prisma.bodyPart.findUnique({
      where: { id },
    });

    return await this.prisma.bodyPart.delete({
      where: { id },
    });
  }

  private normalizeName(name: string): string {
    return name.toLowerCase().trim();
  }
}
