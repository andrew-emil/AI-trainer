import { IsBoolean, IsMongoId, IsNotEmpty, IsString, IsUUID } from 'class-validator';

/**
 * DTO for streaming chunks back to the client via RabbitMQ.
 */
export class OutgoingMessageChunkDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string; // Identifier for routing the message back to the correct client

    @IsMongoId()
    @IsNotEmpty()
    conversation_id: string; // Identifier for the chat session

    @IsString()
    @IsNotEmpty()
    chunk: string; // The streaming text chunk from the Gemini API

    @IsBoolean()
    @IsNotEmpty()
    isFinal: boolean; // True if this is the last chunk of the response
}