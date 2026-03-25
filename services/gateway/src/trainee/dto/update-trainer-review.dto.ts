import { PartialType } from "@nestjs/mapped-types";
import { CreateTrainerReviewDto } from "./create-trainer-review.dto";

export class UpdateTrainerReviewDto extends PartialType(CreateTrainerReviewDto) {}