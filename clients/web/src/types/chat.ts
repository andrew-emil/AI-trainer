import { ConversationType } from "./entities";

/* ---------- Commands / Requests ---------- */

export type MessageSenderType = 'USER' | 'BOT';

export interface CreateConversationDto {
  trainerTraineeId: string;
  trainerId: string;
  traineeId: string;
  title?: string;
}

export interface SendMessageDto {
  conversationId: string;
  userId: string;
  message: string;
}

/* ---------- Responses / UI DTOs ---------- */

/** Simple user summary used by the chat list (other participant) */
export interface ChatUserSummary {
  id: string;
  username: string;
  avatar: string | null;
}

/** Message shape including sender info (frontend-friendly) */
export interface MessageWithSender {
  id: string;
  conversationId: string;
  senderId?: string | null;
  senderType: MessageSenderType;
  content?: string | null;
  createdAt: string; // ISO
  sender?: {
    id: string;
    username: string;
    avatar: string | null;
  } | null;
}

/** Last message preview DTO (keeps nullable safety) */
export interface LastMessageDto {
  id: string;
  content: string | null;
  createdAt: string; // ISO
  sender: {
    id: string;
    username: string;
    avatar: string | null;
  } | null;
}

/** Participant summary (what frontend needs to track last read per participant) */
export interface ConversationParticipantSummary {
  userId: string;
  lastReadAt: string | null; // ISO or null
}

/** Conversation detail DTO (for screens that show messages + metadata) */
export interface ConversationWithDetails {
  id: string;
  type: ConversationType;
  trainerTraineeId: string | null;
  lastMessageAt: string | null; // ISO or null
  updatedAt: string; // ISO
  unread: number;
  lastReadAt: string | null; // current user's lastReadAt
  messages: MessageWithSender[]; // usually latest messages (pagination applies)
}

/** Minimal message response used by the paginated messages endpoint */
export type MessageResponse = {
  id: string;
  conversationId: string;
  senderType: "USER" | "BOT";
  senderId: string | null;
  content: string | null;
  createdAt: string; // ISO
};

/** Conversation item used by the conversation list UI (sidebar / inbox) */
export interface ConversationListItemDto {
  id: string;
  type: ConversationType;
  trainerTraineeId: string | null;
  lastMessageAt: string | null; // ISO or null
  updatedAt: string; // ISO
  lastReadAt: string | null; // current user's lastReadAt (ISO or null)
  unread: number;
  otherUser: ChatUserSummary | null; // null if remote user was deleted or it's a bot/chat
  messages: LastMessageDto[]; // backend returns take:1 so keep array shape
}
