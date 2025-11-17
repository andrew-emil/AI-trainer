import { IsMongoId, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdatePayloadDto {
    @IsMongoId()
    @IsNotEmpty()
    _id: string

    @IsUUID()
    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    @IsString()
    title: string
}