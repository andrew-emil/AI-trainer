import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { ConversationListItemDto, MessageWithSender } from '@/types/chat';
import { Paginated } from '@/types/paginate';

export const getMyConversations = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<ConversationListItemDto[]>('/chat/conversations')
  );
  return { data, error };
};

export const getMessages = async (
  conversationId: string,
  params: { page: number; limit?: number }
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<Paginated<MessageWithSender>>(`/chat/${conversationId}/messages`, {
      params,
    })
  );
  return { data, error };
};

export const getTotalUnreadCount = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<{ count: number }>('/chat/total-unread')
  );
  return { data, error };
};
