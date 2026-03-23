import { PartialType } from "@nestjs/mapped-types";
import { CreateWorkoutSessionDto } from "./create-workout-session.dto";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateWorkoutSessionDto extends PartialType(CreateWorkoutSessionDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}