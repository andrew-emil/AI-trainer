import { getMessages, getMyConversations } from "@/services/chat"

export const conversationsQuery = () => {
    return {
        queryKey: ['conversations'],
        queryFn: () => getMyConversations(),
        staleTime: 60_000,
    }
}

export const messagesQuery = (conversationId: string, page: number = 1, limit: number = 50) => {
    return {
        queryKey: ['messages', conversationId, page],
        queryFn: () => getMessages(conversationId, { page, limit }),
        staleTime: 0,
    }
}

interface LastPageData {
    data: {
        meta: {
            currentPage: number;
            totalPages: number;
        };
    };
}

export const infiniteMessagesQuery = (conversationId: string, limit: number = 50) => {
    return {
        queryKey: ['messages', 'infinite', conversationId],
        queryFn: ({ pageParam = 1 }) => getMessages(conversationId, { page: pageParam as number, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: LastPageData) => {
            const { data } = lastPage;
            if (!data || data.meta.currentPage >= data.meta.totalPages) return undefined;
            return data.meta.currentPage + 1;
        },
        staleTime: 0,
    }
}