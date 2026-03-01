import { Skeleton } from "@/components/ui/skeleton";
import EgyptianCard from "../ui/EgyptianCard";

export default function ChatSkeleton() {
    return (
        <EgyptianCard className="flex items-center gap-4 relative overflow-hidden opacity-70">
            {/* Avatar Skeleton */}
            <div className="relative">
                <Skeleton className="w-12 h-12 rounded-full bg-primary/20" />
            </div>

            <div className="flex-1 min-w-0 space-y-2">
                {/* Header: Name and Time */}
                <div className="flex items-center justify-between mb-1">
                    <Skeleton className="h-4 w-32 bg-primary/20" />
                    <Skeleton className="h-3 w-12 bg-primary/10" />
                </div>

                {/* Footer: Last Message */}
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-3 w-full max-w-[200px] bg-primary/10" />
                </div>
            </div>
        </EgyptianCard>
    );
}

export function ChatListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <ChatSkeleton key={i} />
            ))}
        </div>
    );
}
