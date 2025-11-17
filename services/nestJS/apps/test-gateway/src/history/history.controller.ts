/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Patterns } from '@app/contracts/patterns';
import { RMQ_TOKENS } from '@app/contracts/tokens';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('history')
export class HistoryController {
  constructor(
    @Inject(RMQ_TOKENS.CHATBOT_CLIENT)
    private readonly client: ClientProxy,
  ) { }

  @Get()
  async getAll(@Query('user_id') userId: string) {
    // payload shape must match your HistoryService expectations
    const payload = { user_id: userId };
    return await lastValueFrom(
      this.client.send(Patterns.HISTORY_GET_ALL, payload),
    );
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Query('user_id') userId: string,
  ) {
    const payload = { user_id: userId, conversation_id: id };
    return await lastValueFrom(
      this.client.send(Patterns.HISTORY_GET_BY_ID, payload),
    );
  }

  @Patch(':id/title')
  async updateTitle(
    @Param('id') id: string,
    @Body() body: { user_id: string; title: string },
  ) {
    const payload = {
      _id: id,
      user_id: body.user_id,
      title: body.title,
    };
    return await lastValueFrom(
      this.client.send(Patterns.HISTORY_UPDATE_TITLE, payload),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('user_id') userId: string,
  ) {
    const payload = { user_id: userId, conversation_id: id };
    return await lastValueFrom(
      this.client.send(Patterns.HISTORY_DELETE, payload),
    );
  }
}
