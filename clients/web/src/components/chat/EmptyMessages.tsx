import { motion } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function EmptyMessages() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center h-full py-16 text-center px-4"
        >
            {/* Icon with Egyptian styling */}
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/30 shadow-[0_0_30px_-5px_hsla(43,87%,55%,0.3)]">
                    <MessageSquare className="w-12 h-12 text-primary" />
                </div>
                {/* Sparkle accent */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-2 -right-2"
                >
                    <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
            </div>

            {/* Text content */}
            <h3 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
                {t('chats.noMessagesYet')}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
                {t('chats.noMessagesDesc')}
            </p>
        </motion.div>
    );
}

export default EmptyMessages;
