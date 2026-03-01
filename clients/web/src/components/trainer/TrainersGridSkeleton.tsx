function TrainersGridSkeleton() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-card border border-egyptian-gold/20 rounded-2xl overflow-hidden animate-pulse"
                >
                    <div className="h-64 bg-muted" />
                    <div className="p-6 space-y-4">
                        <div className="h-5 bg-muted rounded w-2/3" />
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                        <div className="h-10 bg-muted rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TrainersGridSkeleton
