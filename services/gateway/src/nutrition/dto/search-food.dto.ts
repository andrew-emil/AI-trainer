import { IsNotEmpty, IsString } from "class-validator";
import { PaginationDto } from "./pagination.dto";

export class SearchFoodDto extends PaginationDto {
    @IsString()
    @IsNotEmpty()
    q: string;
}