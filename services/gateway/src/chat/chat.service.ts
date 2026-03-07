import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { CreateConversationDto } from './dto/createConversation.dto';
import { firstValueFrom } from 'rxjs';
import { ChatPattern } from 'src/common/patterns/chat.pattern';
import { SendMessageDto } from './dto/sendMessage.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject(INTERACTION_SERVICE)
    private readonly client: ClientProxy,
  ) { }

  private async assertParticipant(userId: string, conversationId: string) {
    //TODO: To be implemented
  }

  private async validateTrainerTraineeRelationship(trainerId: string, traineeId: string) {
    //TODO: To be implemented
  }

  async createConversation(dto: CreateConversationDto) {
    return await firstValueFrom(
      this.client.send(ChatPattern.CREATE_CONVERSATION, dto)
    )
  }

  async listMyConversations(userId: string) {
    return await firstValueFrom(
      this.client.send(ChatPattern.LIST_MY_CONVERSATIONS, userId)
    )
  }

  async sendMessage(dto: SendMessageDto) {
    return firstValueFrom(
      this.client.send(ChatPattern.SEND_MESSAGE, dto)
    )
  }

  async getMessages(conversationId: string) {
    return await firstValueFrom(
      this.client.send(ChatPattern.GET_MESSAGES, conversationId)
    )
  }
}
