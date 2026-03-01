import { motion } from 'framer-motion';

function MessageSkeleton() {
    return (
        <div className="space-y-4 p-4">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex gap-3 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                    {/* Avatar skeleton */}
                    <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse flex-shrink-0" />

                    {/* Message skeleton */}
                    <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'} max-w-[70%]`}>
                        <div className="w-48 h-16 rounded-2xl bg-muted/20 animate-pulse" />
                        <div className="w-16 h-3 rounded bg-muted/10 animate-pulse mt-1" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default MessageSkeleton;
