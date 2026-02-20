import { RequestStatus } from '@prisma/client';

export class TraineeRequestResponseDto {
  id: string;
  trainerId: string;
  traineeId: string;
  traineeName: string;
  sessionsCount: number;
  status: RequestStatus;
  createdAt: Date;
  respondedAt?: Date;

  constructor(partial: Partial<TraineeRequestResponseDto>) {
    Object.assign(this, partial);
  }
}
