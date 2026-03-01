import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { MessageWithSender } from '@/types/chat';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

type MessageBubbleProps = {
    message: MessageWithSender;
    isOwn: boolean;
    index: number;
}

function MessageBubble({ message, isOwn, index }: MessageBubbleProps) {
    const { auth } = useAuth()
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'} mb-4`}
        >
            {/* Avatar */}
            <div className="flex-shrink-0">
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                    <AvatarImage src={isOwn ? auth?.user?.avatar : message.sender?.avatar} alt={message.sender?.username} />
                    <AvatarFallback>
                        <User className="w-5 h-5 text-primary" />
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* Message Content */}
            <div className={`flex flex-col ${isOwn ? 'items-start' : 'items-end'} max-w-[70%]`}>
                <div
                    className={`
                        relative px-4 py-3 rounded-2xl
                        ${isOwn
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-sm'
                            : 'bg-card border border-border/30 text-foreground rounded-tl-sm'
                        }
                        shadow-md
                    `}
                >

                    <p className="text-sm font-body whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                </div>

                {/* Timestamp */}
                <span className="text-xs text-muted-foreground mt-1 px-1">
                    {new Date(message.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </div>
        </motion.div>
    );
}

export default MessageBubble;
