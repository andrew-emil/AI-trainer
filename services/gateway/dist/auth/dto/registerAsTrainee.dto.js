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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAsTraineeDto = void 0;
const class_validator_1 = require("class-validator");
const entities_enum_1 = require("../../common/enums/entities.enum");
const create_user_dto_1 = require("../../user/dto/create-user.dto");
class RegisterAsTraineeDto extends create_user_dto_1.CreateUserDto {
    goal;
    heightCm;
}
exports.RegisterAsTraineeDto = RegisterAsTraineeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(entities_enum_1.TraineeGoal),
    __metadata("design:type", String)
], RegisterAsTraineeDto.prototype, "goal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(40),
    (0, class_validator_1.Max)(272),
    __metadata("design:type", Number)
], RegisterAsTraineeDto.prototype, "heightCm", void 0);
//# sourceMappingURL=registerAsTrainee.dto.js.map