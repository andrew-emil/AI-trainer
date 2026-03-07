import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { IUserResponse, UserResponseSchema } from 'src/common/contracts/user';
import { UserPattern } from 'src/common/patterns/userPatterns.enum';
import { rpcCall } from 'src/common/utils/rpc-call.util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: ClientProxy,
  ) { }

  findOne(userId: string) {
    return rpcCall<IUserResponse>(
      this.authService,
      UserPattern.GET_ME,
      { userId },
      UserResponseSchema
    );
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return rpcCall<IUserResponse>(
      this.authService,
      UserPattern.UPDATE,
      { userId, ...updateUserDto },
      UserResponseSchema
    );
  }
}
