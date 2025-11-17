import { Controller } from '@nestjs/common';
import { HistoryService } from './history.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Patterns } from '@app/contracts/patterns';
import { GetAllPayloadDto } from './dtos/getAllPayload.dto';
import { GetAndDeletePayloadDto } from './dtos/getAndDeletePayload.dto';
import { UpdatePayloadDto } from './dtos/updatePayload.dto';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @MessagePattern(Patterns.HISTORY_GET_ALL)
  async getAllHistory(@Payload() payload: GetAllPayloadDto) {
    return await this.historyService.getAllConversation(payload)
  }

  @MessagePattern(Patterns.HISTORY_GET_BY_ID)
  async getHistoryById(@Payload() payload: GetAndDeletePayloadDto) {
    return await this.historyService.getConversationById(payload)
  }

  @MessagePattern(Patterns.HISTORY_UPDATE_TITLE)
  async updateConversationTitle(@Payload() payload: UpdatePayloadDto) {
    return await this.historyService.updateConversationTitle(payload)
  }

  @MessagePattern(Patterns.HISTORY_DELETE)
  async deleteConversationById(@Payload() payload: GetAndDeletePayloadDto) {
    return await this.historyService.deleteConversation(payload)
  }
}
