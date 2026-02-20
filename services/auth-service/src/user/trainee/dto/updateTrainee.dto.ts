import { PartialType } from "@nestjs/mapped-types";
import { RegisterAsTraineeDto } from "src/auth/dto/registerAsTrainee.dto";

export class UpdateTraineeDto extends PartialType(RegisterAsTraineeDto) {}