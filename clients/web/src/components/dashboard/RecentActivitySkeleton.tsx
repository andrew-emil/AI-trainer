import { Skeleton } from "../ui/skeleton"

function RecentActivitySkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((index) => (
                <div key={index} className="flex items-start gap-3">
                    <Skeleton className="w-2 h-2 rounded-full bg-muted mt-2 animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                        <Skeleton className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecentActivitySkeleton