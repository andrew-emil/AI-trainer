import { ClientProxy } from '@nestjs/microservices';
import { User, UserContract } from 'src/common/contracts/user.contract';
import { UserPattern } from 'src/common/patterns/userPatterns.enum';
import { rpcCall } from 'src/common/utils/rpc-call.helper';
import { TraineeContract, TraineeContractType, TraineeWithUserContract, TraineeWithUserContractType } from '../contracts/trainee.contract';
import { Trainer, TrainerContract, TrainerWithUserContract, TrainerWithUserContractType } from '../contracts/trainer.contract';
import { TraineePatterns } from '../patterns/trainee.pattern';
import { TrainerPattern } from '../patterns/trainer.patterns';

export const getUser = async (authService: ClientProxy, userId: string) => {
  return await rpcCall<User>(
    authService,
    UserPattern.GET_ME,
    { userId },
    UserContract
  );
};

export const getTrainee = async (authService: ClientProxy, userId: string) => {
  return await rpcCall<TraineeContractType>(
    authService,
    TraineePatterns.FIND_ONE,
    { id: userId },
    TraineeContract
  )
}

export const getTraineeWithUser = async (authService: ClientProxy, userId: string) => {
  return await rpcCall<TraineeWithUserContractType>(
    authService,
    TraineePatterns.FIND_ONE,
    { id: userId },
    TraineeWithUserContract
  )
}

export const getTrainer = async (authService: ClientProxy, userId: string) => {
  return await rpcCall<Trainer>(
    authService,
    TrainerPattern.GET_BY_ID,
    { userId },
    TrainerContract
  )
}

export const getTrainerWithUser = async (authService: ClientProxy, userId: string) => {
  return await rpcCall<TrainerWithUserContractType>(
    authService,
    TrainerPattern.GET_BY_ID,
    { id: userId },
    TrainerWithUserContract
  )
}