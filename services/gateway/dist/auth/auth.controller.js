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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const cookieOption_1 = require("../common/constants/cookieOption");
const auth_service_1 = require("./auth.service");
const forgetPassword_dto_1 = require("./dto/forgetPassword.dto");
const login_dto_1 = require("./dto/login.dto");
const registerAsTrainee_dto_1 = require("./dto/registerAsTrainee.dto");
const registerAsTrainer_dto_1 = require("./dto/registerAsTrainer.dto");
const resetPassword_dto_1 = require("./dto/resetPassword.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const refreshToken_1 = require("../common/constants/refreshToken");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto, res) {
        const { accessToken, refreshToken } = await this.authService.login(loginDto);
        res.cookie(refreshToken_1.RefreshToken, refreshToken, cookieOption_1.cookieOptions);
        return { accessToken };
    }
    async refresh(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('No refresh token');
        }
        const { accessToken, refreshToken: newRefreshToken } = await this.authService.refresh(refreshToken);
        if (newRefreshToken) {
            res.cookie(refreshToken_1.RefreshToken, newRefreshToken, cookieOption_1.cookieOptions);
        }
        return { accessToken };
    }
    async registerAsTrainee(registerDto, res) {
        const { accessToken, refreshToken } = await this.authService.registerAsTrainee(registerDto);
        res.cookie(refreshToken_1.RefreshToken, refreshToken, cookieOption_1.cookieOptions);
        return { accessToken };
    }
    async registerAsTrainer(registerDto) {
        return this.authService.registerAsTrainer(registerDto);
    }
    forgetPassword({ email }) {
        return this.authService.forgetPassword(email);
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    logout(req, res) {
        res.clearCookie(refreshToken_1.RefreshToken, cookieOption_1.cookieOptions);
        return this.authService.logout(req.user.sub);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('register-as-trainee'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerAsTrainee_dto_1.RegisterAsTraineeDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAsTrainee", null);
__decorate([
    (0, common_1.Post)('register-as-trainer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerAsTrainer_dto_1.RegisterAsTrainerDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAsTrainer", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgetPassword_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map