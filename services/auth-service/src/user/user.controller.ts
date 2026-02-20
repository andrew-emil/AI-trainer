import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPattern } from 'src/common/enums/userPatterns.enum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern(UserPattern.GET_ME)
    findUserById(@Payload() { userId }: { userId: string }) {
        return this.userService.findOne(userId);
    }

    @EventPattern(UserPattern.UPDATE)
    updateUser(@Payload() updateUserDto: UpdateUserDto) {
        this.userService.update(updateUserDto.userId, updateUserDto);
    }

    @EventPattern(UserPattern.DELETE)
    deleteUser(@Payload() { userId }: { userId: string }) {
        this.userService.delete(userId);
    }
}
