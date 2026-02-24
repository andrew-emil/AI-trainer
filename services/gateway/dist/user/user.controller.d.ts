import type { CustomRequest } from 'src/common/types/customRequest.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMyProfile(req: CustomRequest): Promise<import("../common/contracts/user").UserResponse>;
    update(req: CustomRequest, updateUserDto: UpdateUserDto): Promise<import("../common/contracts/user").UserResponse>;
    remove(req: CustomRequest): boolean;
}
