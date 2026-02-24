"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Gender = exports.TraineeGoal = void 0;
var TraineeGoal;
(function (TraineeGoal) {
    TraineeGoal["CUT"] = "cut";
    TraineeGoal["BULK"] = "bulk";
    TraineeGoal["MAINTENANCE"] = "maintenance";
    TraineeGoal["STRENGTH"] = "strength";
    TraineeGoal["BODY_RECOMB"] = "body_recomb";
})(TraineeGoal || (exports.TraineeGoal = TraineeGoal = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["UNKNOWN"] = "unknown";
})(Gender || (exports.Gender = Gender = {}));
var UserRole;
(function (UserRole) {
    UserRole["TRAINER"] = "trainer";
    UserRole["TRAINEE"] = "trainee";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=entities.enum.js.map