import { IsNotEmpty, IsString } from "class-validator";

export class CreateBodyPartDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
