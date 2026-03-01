import EmptyMessages from '@/components/chat/EmptyMessages';
import MessageBubble from '@/components/chat/MessageBubble';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { useChatSocket } from '@/hooks/useChatSocket';
import { conversationsQuery, infiniteMessagesQuery } from '@/lib/queries/conversation.query';
import { MessageWithSender } from '@/types/chat';
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Send, User } from 'lucide-react';
import { startTransition, Suspense, useEffect, useMemo, useOptimistic, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import MessageSkeleton from './MessageSkeleton';

export function ChatContent() {
    const { t } = useTranslation();
    const { chatId } = useParams<{ chatId: string }>();
    const { auth } = useAuth();
    const [message, setMessage] = useState('');
    const { sendMessage } = useChatSocket(chatId);

    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);
    const user = auth?.user;

    // 1️⃣ Fetch infinite messages
    const {
        data,
        isFetchingNextPage
    } = useSuspenseInfiniteQuery(infiniteMessagesQuery(chatId!));

    // 2️⃣ Flatten pages
    const allMessages = useMemo(() => {
        return data.pages.flatMap(page => page.data.data);
    }, [data]);


    // 3️⃣ Use optimistic state
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        allMessages,
        (state: MessageWithSender[], newMessage: MessageWithSender) => [
            ...state,
            newMessage
        ]
    );

    // Fetch conversations to get the other user's info
    const { data: { data: conversationsData, error: conversationsError } } = useSuspenseQuery(conversationsQuery());

    // Redirect if conversation doesn't exist
    useEffect(() => {
        if (conversationsError) {
            toast.error(conversationsError.message);
            navigate('/chats', { replace: true });
        }
    }, [conversationsError, navigate]);

    // Find the current conversation to get other user info
    const currentConversation = conversationsData?.find(conv => conv.id === chatId);
    const otherUser = currentConversation?.otherUser;


    // Reset initial mount on chat change
    useEffect(() => {
        isInitialMount.current = true;
    }, [chatId]);

    // Auto-scroll to bottom when messages load or change
    useEffect(() => {
        if (bottomRef.current && (isInitialMount.current || !isFetchingNextPage)) {
            const behavior = isInitialMount.current ? 'auto' : 'smooth';
            // Only scroll to bottom smoothly if we are not fetching next page (pagination)
            // or if it's the initial mount
            bottomRef.current.scrollIntoView({
                behavior,
                block: 'end'
            });
            isInitialMount.current = false;
        }
    }, [optimisticMessages, isFetchingNextPage]);


    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user) return;

        const newMessage: MessageWithSender = {
            id: crypto.randomUUID(),
            content: message,
            senderId: user.id,
            conversationId: chatId!,
            createdAt: new Date().toISOString(),
            senderType: 'USER',
            sender: {
                id: user.id,
                username: user.username,
                avatar: user.avatar
            }
        };

        startTransition(() => {
            addOptimisticMessage(newMessage);
            sendMessage(message);
        });
        setMessage('');
    };

    console.log(data)


    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-120px)]">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/30 bg-card/30 backdrop-blur-sm rounded-t-lg">
                    <div className="flex items-center gap-3">
                        {/* Back Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate('/chats')}
                            className="hover:bg-primary/10"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>

                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-primary/20">
                                <AvatarImage src={otherUser?.avatar || undefined} alt={otherUser?.username} />
                                <AvatarFallback>
                                    <User className="w-5 h-5 text-primary" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-heading font-semibold text-foreground">
                                    {otherUser?.username || 'Unknown User'}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <Suspense fallback={<MessageSkeleton />}>
                    <div className="flex-1 overflow-hidden bg-gradient-to-b from-background to-background/95">
                        <ScrollArea className="h-full">
                            <div ref={scrollRef} className="p-4 space-y-2">
                                <div ref={topRef} className="h-1" />
                                <AnimatePresence>
                                    {isFetchingNextPage && (
                                        <div className="flex justify-center p-4">
                                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                        </div>
                                    )}
                                    {optimisticMessages.length > 0 ? (
                                        optimisticMessages.map((msg, index) => (
                                            <MessageBubble
                                                key={msg.id}
                                                message={msg}
                                                isOwn={msg.senderId === user?.id}
                                                index={index}
                                            />
                                        ))
                                    ) : (
                                        <EmptyMessages />
                                    )}
                                    <div ref={bottomRef} className="h-0" />
                                </AnimatePresence>
                            </div>
                        </ScrollArea>
                    </div>
                </Suspense>

                {/* Message Input */}
                <div className="p-4 border-t border-border/30 bg-card/30 backdrop-blur-sm rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t('chats.typeMessage')}
                            className="flex-1 input-egyptian"
                        />
                        <Button
                            type="submit"
                            disabled={!message.trim()}
                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-[0_0_20px_-5px_hsla(43,87%,55%,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}