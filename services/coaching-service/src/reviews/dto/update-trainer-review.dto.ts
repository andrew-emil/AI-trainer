import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateTrainerReviewDto } from "./create-trainer-review.dto";

export class UpdateTrainerReviewDto extends PartialType(CreateTrainerReviewDto) {
    @IsUUID()
    @IsNotEmpty()
    reviewId: string
}