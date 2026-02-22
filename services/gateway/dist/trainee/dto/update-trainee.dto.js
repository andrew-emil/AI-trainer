"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTraineeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_trainee_dto_1 = require("./create-trainee.dto");
class UpdateTraineeDto extends (0, swagger_1.PartialType)(create_trainee_dto_1.CreateTraineeDto) {
}
exports.UpdateTraineeDto = UpdateTraineeDto;
//# sourceMappingURL=update-trainee.dto.js.map