import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { firstValueFrom } from 'rxjs';
import { TraineePatterns } from 'src/common/patterns/traineePatterns.enum';

@Injectable()
export class TraineeService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  findAll() {
    return firstValueFrom(
      this.client.send(TraineePatterns.FIND_ALL, {})
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.client.send(TraineePatterns.FIND_ONE, { id })
    );
  }

  update(id: string, updateTraineeDto: UpdateTraineeDto) {
    return firstValueFrom(
      this.client.send(TraineePatterns.UPDATE, { id, updateTraineeDto })
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.client.send(TraineePatterns.DELETE, { id })
    );
  }
}
