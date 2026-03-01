import NotificationButton from '@/components/notification/NotificationButton';

const DashboardHeader = () => {
    return (
        <header className="hidden lg:flex sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30 h-20 items-center justify-end px-8">
            <div className="flex items-center gap-4">
                <NotificationButton />
            </div>
        </header>
    );
};

export default DashboardHeader;
