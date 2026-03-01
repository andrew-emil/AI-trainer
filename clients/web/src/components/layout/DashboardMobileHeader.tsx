import EgyptianLogo from '@/components/ui/EgyptianLogo';
import NotificationButton from '@/components/notification/NotificationButton';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';

interface DashboardMobileHeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const DashboardMobileHeader = ({ setSidebarOpen }: DashboardMobileHeaderProps) => {
    return (
        <header className="lg:hidden sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
            <div className="flex items-center justify-between h-16 px-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 text-muted-foreground hover:text-foreground"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <Link to="/">
                    <EgyptianLogo size="sm" />
                </Link>
                <NotificationButton />
            </div>
        </header>
    );
};

export default DashboardMobileHeader;
