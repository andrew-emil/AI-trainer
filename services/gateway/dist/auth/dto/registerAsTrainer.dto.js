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
exports.RegisterAsTrainerDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_user_dto_1 = require("../../user/dto/create-user.dto");
const createTrainerCertification_dto_1 = require("./createTrainerCertification.dto");
const createTransformation_dto_1 = require("./createTransformation.dto");
class RegisterAsTrainerDto extends create_user_dto_1.CreateUserDto {
    bio;
    experienceYears;
    certifications;
    transformations;
}
exports.RegisterAsTrainerDto = RegisterAsTrainerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterAsTrainerDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegisterAsTrainerDto.prototype, "experienceYears", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => createTrainerCertification_dto_1.CreateTrainerCertificationDto),
    __metadata("design:type", Array)
], RegisterAsTrainerDto.prototype, "certifications", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => createTransformation_dto_1.CreateTransformationDto),
    __metadata("design:type", Array)
], RegisterAsTrainerDto.prototype, "transformations", void 0);
//# sourceMappingURL=registerAsTrainer.dto.js.map