export interface CreateMuscleDto {
  name: string;
}

export interface UpdateMuscleDto extends Partial<CreateMuscleDto> {}

export interface CreateBodyPartDto {
  name: string;
}

export interface UpdateBodyPartDto extends Partial<CreateBodyPartDto> {}

export interface CreateEquipmentDto {
  name: string;
}

export interface UpdateEquipmentDto extends Partial<CreateEquipmentDto> {}
