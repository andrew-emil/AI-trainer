import { Injectable } from '@nestjs/common';
import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';

@Injectable()
export class TraineeService {
  create(createTraineeDto: CreateTraineeDto) {
    return 'This action adds a new trainee';
  }

  findAll() {
    return `This action returns all trainee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainee`;
  }

  update(id: number, updateTraineeDto: UpdateTraineeDto) {
    return `This action updates a #${id} trainee`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainee`;
  }
}
