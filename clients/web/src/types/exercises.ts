export interface CreateExerciseDto {
  name: string;
  gifUrl: string;
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles?: string[]; // Optional in DTO? No, checks IsArray. But logic might allow empty.
  // Code says IsArray, IsString each.
  // In Entity it is string[].
  // DTO: secondaryMuscles: string[]
  instructions: string[];
}

export interface UpdateExerciseDto extends Partial<CreateExerciseDto> {}
