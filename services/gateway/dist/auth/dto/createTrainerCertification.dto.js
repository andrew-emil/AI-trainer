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
exports.CreateTrainerCertificationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateTrainerCertificationDto {
    name;
    imageUrl;
    imagePublicId;
    issuedBy;
    issuedAt;
}
exports.CreateTrainerCertificationDto = CreateTrainerCertificationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTrainerCertificationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.imagePublicId != null),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateTrainerCertificationDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.imageUrl != null),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateTrainerCertificationDto.prototype, "imagePublicId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTrainerCertificationDto.prototype, "issuedBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], CreateTrainerCertificationDto.prototype, "issuedAt", void 0);
//# sourceMappingURL=createTrainerCertification.dto.js.map