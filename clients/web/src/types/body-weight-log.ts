export interface CreateBodyWeightLogDto {
  traineeId: string;
  weight: number;
  smm?: number;
  pbf?: number;
  loggedAt: Date | string;
}

export interface UpdateBodyWeightLogDto extends Partial<CreateBodyWeightLogDto> {}
