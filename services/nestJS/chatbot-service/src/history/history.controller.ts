import { Controller } from '@nestjs/common';
import { HistoryService } from './history.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllPayloadDto } from './dto/getAllPayload.dto';
import { GetAndDeletePayloadDto } from './dto/getAndDeletePayload.dto';
import { UpdatePayloadDto } from './dto/updatePayload.dto';

enum HistoryPatterns {
  HISTORY_GET_ALL = 'history.getAll',
  HISTORY_GET_BY_ID = 'history.getById',
  HISTORY_UPDATE_TITLE = 'history.updateTitle',
  HISTORY_DELETE = 'history.delete',
}

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @MessagePattern(HistoryPatterns.HISTORY_GET_ALL)
  getAllHistory(@Payload() payload: GetAllPayloadDto) {
    return this.historyService.getAllConversation(payload)
  }

  @MessagePattern(HistoryPatterns.HISTORY_GET_BY_ID)
  getHistoryById(@Payload() payload: GetAndDeletePayloadDto) {
    return this.historyService.getConversationById(payload)
  }

  @MessagePattern(HistoryPatterns.HISTORY_UPDATE_TITLE)
  updateConversationTitle(@Payload() payload: UpdatePayloadDto) {
    return this.historyService.updateConversationTitle(payload)
  }

  @MessagePattern(HistoryPatterns.HISTORY_DELETE)
  deleteConversationById(@Payload() payload: GetAndDeletePayloadDto) {
    return this.historyService.deleteConversation(payload)
  }
}
