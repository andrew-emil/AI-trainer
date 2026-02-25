import { Controller } from '@nestjs/common';
import { TrainerApplicationsProvider } from '../providers/trainer-applications.provider';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerApplicationPatterns } from 'src/common/enums/trainerApplicationPatterns.enum';
import type { AcceptTrainerApplicationPayload } from '../types/acceptTrainerApplicationPayload';
import type { RejectTrainerApplicationPayload } from '../types/rejectTrainerApplicationPayload';


@Controller()
export class TrainerApplicationsController {
    constructor(private readonly trainerApplicationsProvider: TrainerApplicationsProvider) { }

    @MessagePattern(TrainerApplicationPatterns.GET_ALL_TRAINER_APPLICATIONS)
    getAllTrainerApplications() {
        return this.trainerApplicationsProvider.getTrainerRequests();
    }

    @MessagePattern(TrainerApplicationPatterns.GET_TRAINER_APPLICATION_BY_ID)
    getTrainerApplicationById(@Payload() { id }: AcceptTrainerApplicationPayload) {
        return this.trainerApplicationsProvider.getTrainerRequest(id);
    }

    @MessagePattern(TrainerApplicationPatterns.ACCEPT_TRAINER_APPLICATION)
    acceptTrainerApplication(@Payload() { id }: AcceptTrainerApplicationPayload) {
        return this.trainerApplicationsProvider.approveTrainerRequest(id);
    }

    @MessagePattern(TrainerApplicationPatterns.REJECT_TRAINER_APPLICATION)
    rejectTrainerApplication(@Payload() { id, adminNote }: RejectTrainerApplicationPayload) {
        return this.trainerApplicationsProvider.rejectTrainerRequest(id, adminNote);
    }

    @EventPattern(TrainerApplicationPatterns.DELETE_TRAINER_APPLICATION)
    deleteTrainerApplication(@Payload() { id }: AcceptTrainerApplicationPayload) {
        return this.trainerApplicationsProvider.deleteTrainerApplication(id);
    }
}
