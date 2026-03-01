import ChatCard from '@/components/chat/ChatCard';
import ChatSkeleton from '@/components/chat/ChatSkeleton';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { conversationsQuery } from '@/lib/queries/conversation.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Search } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';


const Chats = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const { data: chats, error } = useSuspenseQuery(conversationsQuery());

    if (error) {
        return <div className="text-center text-red-500 font-bold">Error: {error.message}</div>
    }

    const filteredChats = chats.data ? chats.data.filter(chat =>
        chat.otherUser?.username.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            {t('chats.title')}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {t('chats.subtitle')}
                        </p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t('chats.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-egyptian ps-10"
                        />
                    </div>
                </div>

                {/* Chats List */}
                <Suspense fallback={<ChatSkeleton />}>
                    <ScrollArea className="h-[calc(100vh-300px)] rounded-lg border border-border/30 bg-card/30 p-4 backdrop-blur-sm w-full">
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredChats.length > 0 ? (
                                    filteredChats.map((chat, index) => (
                                        <ChatCard key={chat.id} chat={chat} index={index} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center py-12 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                                            <MessageSquare className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                                            {t('chats.noChats')}
                                        </h3>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </ScrollArea>
                </Suspense>
            </div>
        </DashboardLayout>
    );
};

export default Chats;