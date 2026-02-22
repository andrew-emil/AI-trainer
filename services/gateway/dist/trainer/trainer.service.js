"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerService = void 0;
const common_1 = require("@nestjs/common");
let TrainerService = class TrainerService {
    create(createTrainerDto) {
        return 'This action adds a new trainer';
    }
    findAll() {
        return `This action returns all trainer`;
    }
    findOne(id) {
        return `This action returns a #${id} trainer`;
    }
    update(id, updateTrainerDto) {
        return `This action updates a #${id} trainer`;
    }
    remove(id) {
        return `This action removes a #${id} trainer`;
    }
};
exports.TrainerService = TrainerService;
exports.TrainerService = TrainerService = __decorate([
    (0, common_1.Injectable)()
], TrainerService);
//# sourceMappingURL=trainer.service.js.map