import { IsMongoId, IsNotEmpty } from "class-validator";
import { GetAllPayloadDto } from "./getAllPayload.dto";

export class GetAndDeletePayloadDto extends GetAllPayloadDto {
    @IsMongoId()
    @IsNotEmpty()
    _id: string
}