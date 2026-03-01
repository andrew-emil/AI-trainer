import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterAsTrainerDto } from 'src/auth/dto/registerAsTrainer.dto';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { TrainerPattern } from 'src/common/patterns/trainerPatterns.enum';
import { CreatedTrainer } from './dto/createdTrainerResponse.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: ClientProxy,
  ) { }

  create(dto: RegisterAsTrainerDto) {
    return firstValueFrom<CreatedTrainer>(
      this.authService.send(
        TrainerPattern.CREATE,
        { ...dto }
      )
    )
  }

  findAll() {
    return firstValueFrom(
      this.authService.send(
        TrainerPattern.GET_ALL_ACTIVE,
        {}
      )
    )
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} trainer`;
  // }

  update(id: string, updateTrainerDto: UpdateTrainerDto) {
    return firstValueFrom(
      this.authService.send(
        TrainerPattern.UPDATE,
        { userId: id, ...updateTrainerDto }
      )
    )
  }

  remove(id: string) {
    this.authService.emit(
      TrainerPattern.DELETE,
      { userId: id }
    )
    return true;
  }
}
