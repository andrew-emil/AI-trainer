import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    gifUrl: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    targetMuscles: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    bodyParts: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    equipments: string[];

    @IsArray()
    @IsString({ each: true })
    secondaryMuscles: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    instructions: string[];
}
