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
exports.TraineeController = void 0;
const common_1 = require("@nestjs/common");
const trainee_service_1 = require("./trainee.service");
const create_trainee_dto_1 = require("./dto/create-trainee.dto");
const update_trainee_dto_1 = require("./dto/update-trainee.dto");
let TraineeController = class TraineeController {
    traineeService;
    constructor(traineeService) {
        this.traineeService = traineeService;
    }
    create(createTraineeDto) {
        return this.traineeService.create(createTraineeDto);
    }
    findAll() {
        return this.traineeService.findAll();
    }
    findOne(id) {
        return this.traineeService.findOne(+id);
    }
    update(id, updateTraineeDto) {
        return this.traineeService.update(+id, updateTraineeDto);
    }
    remove(id) {
        return this.traineeService.remove(+id);
    }
};
exports.TraineeController = TraineeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trainee_dto_1.CreateTraineeDto]),
    __metadata("design:returntype", void 0)
], TraineeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TraineeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraineeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trainee_dto_1.UpdateTraineeDto]),
    __metadata("design:returntype", void 0)
], TraineeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraineeController.prototype, "remove", null);
exports.TraineeController = TraineeController = __decorate([
    (0, common_1.Controller)('trainee'),
    __metadata("design:paramtypes", [trainee_service_1.TraineeService])
], TraineeController);
//# sourceMappingURL=trainee.controller.js.map