import { ConversationListItemDto } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';
import EgyptianCard from '../ui/EgyptianCard';
import { formatDistanceToNow } from 'date-fns';

type ChatCardProps = {
    chat: ConversationListItemDto;
    index: number;
}

function ChatCard({ chat, index }: ChatCardProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="cursor-pointer group block w-full"
        >
            <EgyptianCard
                className="!p-4 w-full flex items-center gap-3 hover:bg-white/5 transition-colors"
                hoverable
            >
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={chat.otherUser?.avatar || undefined} alt={chat.otherUser?.username} />
                        <AvatarFallback>
                            <User className="w-6 h-6 text-primary" />
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                    {/* Username and Time */}
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="font-heading font-semibold text-foreground truncate group-hover:text-primary transition-colors flex-1 min-w-0">
                            {chat.otherUser?.username}
                        </h3>
                        <span className="text-xs text-muted-foreground font-body whitespace-nowrap flex-shrink-0">
                            {formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: true })}
                        </span>
                    </div>

                    {/* Message and Badge */}
                    <div className="flex items-center gap-2 w-full">
                        <p className={`text-sm truncate font-body flex-1 min-w-0 ${chat.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                            {chat.messages[0]?.content}
                        </p>
                        {chat.unread > 0 && (
                            <div className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-[0_0_10px_hsla(43,87%,55%,0.5)] animate-pulse-gold flex-shrink-0">
                                {chat.unread}
                            </div>
                        )}
                    </div>
                </div>
            </EgyptianCard>
        </motion.div>
    )
}

export default ChatCard