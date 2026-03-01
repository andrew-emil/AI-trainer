import { MessageWithSender } from '@/types/chat';
import { Paginated } from '@/types/paginate';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useSockets } from './useSockets';


export function useChatSocket(conversationId?: string) {
    const sockets = useSockets();
    const queryClient = useQueryClient();

    // Helper to emit events
    const sendMessage = useCallback((message: string) => {
        console.log(sockets, conversationId)
        if (!sockets || !conversationId) return;
        const payload = JSON.stringify({ conversationId, message });
        sockets.chats.emit('message.send', payload);
    }, [sockets, conversationId]);

    const markAsRead = useCallback(() => {
        if (!sockets || !conversationId) return;
        const payload = JSON.stringify({ conversationId });
        sockets.chats.emit('message.markAsRead', payload);
    }, [sockets, conversationId]);

    useEffect(() => {
        if (!sockets || !conversationId) return;

        const s = sockets.chats;

        // Join the conversation room
        s.emit('conversation.join', JSON.stringify({ conversationId }));

        const onMessageCreated = (payload: string | MessageWithSender) => {
            const data: MessageWithSender = typeof payload === 'string' ? JSON.parse(payload) : payload;

            queryClient.setQueryData<InfiniteData<{ data: Paginated<MessageWithSender> | null }>>(
                ['messages', 'infinite', conversationId],
                (old) => {
                    if (!old || !old.pages) return old;

                    return {
                        ...old,
                        pages: old.pages.map((page, index) => {
                            if (index === 0) {
                                if (!page.data) return page;
                                // Prevent duplicate messages
                                if (page.data.data.find((m: MessageWithSender) => m.id === data.id)) {
                                    return page;
                                }

                                return {
                                    ...page,
                                    data: {
                                        ...page.data,
                                        data: [data, ...(page.data.data || [])],
                                        meta: {
                                            ...page.data.meta,
                                            totalItems: page.data.meta.totalItems + 1
                                        }
                                    }
                                };
                            }
                            return page;
                        })
                    };
                }
            );

            // Also invalidate conversations list to update unread count/last message
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        };

        const onMessageMarkedAsRead = (payload: string | { conversationId: string }) => {
            const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
            // If it's for this conversation, we might want to update local state
            if (data.conversationId === conversationId) {
                queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
                queryClient.invalidateQueries({ queryKey: ['messages', 'infinite', conversationId] });
            }
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        };

        s.on('message.created', onMessageCreated);
        s.on('message.markedAsRead', onMessageMarkedAsRead);

        return () => {
            s.off('message.created', onMessageCreated);
            s.off('message.markedAsRead', onMessageMarkedAsRead);
        };
    }, [sockets, conversationId, queryClient]);

    return { sendMessage, markAsRead };
}
