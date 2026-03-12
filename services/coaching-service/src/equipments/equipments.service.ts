import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EquipmentsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEquipmentDto: CreateEquipmentDto) {
    return await this.prisma.equipment.create({
      data: {
        name: createEquipmentDto.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.equipment.findMany();
  }

  async findOne(id: string) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new RpcException({
        status: 404,
        message: 'Equipment not found',
      });
    }

    return equipment;
  }

  async findByName(name: string) {
    return this.prisma.equipment.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    await this.findOne(id);
    return this.prisma.equipment.update({
      where: { id },
      data: {
        name: updateEquipmentDto.name,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.equipment.delete({
      where: { id },
    });
  }
}
