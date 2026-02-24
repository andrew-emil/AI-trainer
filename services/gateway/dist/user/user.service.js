"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const clientModuleNames_1 = require("../common/constants/clientModuleNames");
const user_1 = require("../common/contracts/user");
const userPatterns_enum_1 = require("../common/enums/userPatterns.enum");
const rpc_call_util_1 = require("../common/utils/rpc-call.util");
let UserService = class UserService {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    findOne(userId) {
        return (0, rpc_call_util_1.rpcCall)(this.authService, userPatterns_enum_1.UserPattern.GET_ME, { userId }, user_1.UserResponseSchema);
    }
    update(userId, updateUserDto) {
        return (0, rpc_call_util_1.rpcCall)(this.authService, userPatterns_enum_1.UserPattern.UPDATE, { userId, ...updateUserDto }, user_1.UserResponseSchema);
    }
    remove(userId) {
        this.authService.emit(userPatterns_enum_1.UserPattern.DELETE, { userId });
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(clientModuleNames_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UserService);
//# sourceMappingURL=user.service.js.map