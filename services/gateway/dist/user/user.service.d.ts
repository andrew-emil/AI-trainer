import { ClientProxy } from '@nestjs/microservices';
import { UserResponse } from 'src/common/contracts/user';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly authService;
    constructor(authService: ClientProxy);
    findOne(userId: string): Promise<UserResponse>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponse>;
    remove(userId: string): boolean;
}
