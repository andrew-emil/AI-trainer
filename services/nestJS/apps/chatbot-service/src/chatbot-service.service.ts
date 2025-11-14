import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
