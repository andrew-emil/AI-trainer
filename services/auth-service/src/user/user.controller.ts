import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserPattern } from 'src/common/enums/userPatterns.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern(UserPattern.GET_ME)
    findUserById(@Payload() { userId }: { userId: string }) {
        return this.userService.findOne(userId);
    }

    @MessagePattern(UserPattern.UPDATE)
    updateUser(@Payload() updateUserDto: UpdateUserDto) {
        return this.userService.update(updateUserDto.userId, updateUserDto);
    }

    @EventPattern(UserPattern.DELETE)
    deleteUser(@Payload() { userId }: { userId: string }) {
        this.userService.delete(userId);
    }
}
