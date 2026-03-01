import EgyptianLogo from '@/components/ui/EgyptianLogo';
import { useAuth } from '@/hooks/useAuth';
import { returnNavItems } from '@/lib/utils';
import { LogOut, Settings, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import UserAvatar from '../UserAvatar';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isRTL: boolean;
}

const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isRTL,
}: DashboardSidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { auth, logout } = useAuth();
  const user = auth?.user;

  // Safety check if user is not available
  if (!user) return null;

  const navItems = returnNavItems(user.role, t) || [];

  return (
    <>
      <aside
        className={`fixed inset-y-0 z-50 w-64 bg-card border-border/30 transform transition-transform duration-300 lg:translate-x-0 flex flex-col
          ${isRTL ? 'right-0 border-l' : 'left-0 border-r'}
          ${sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-border/30 shrink-0">
          <Link to="/">
            <EgyptianLogo size="sm" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border/30 shrink-0">
          <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30 transition-all">
            <UserAvatar avatar={user.avatar} />
            <div className="flex-1 text-start overflow-hidden">
              <p className="font-heading text-sm font-semibold text-foreground truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="font-body text-xs text-muted-foreground capitalize truncate">
                {user?.role && t(`roles.${user.role}`)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navItems &&
            navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                      ? 'bg-primary/10 border border-primary/30 text-primary'
                      : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                    }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="font-body">{item.label}</span>
                </Link>
              );
            })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 shrink-0">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-all"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="font-body">{t('nav.settings')}</span>
          </Link>
          <Link
            to="/"
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-body">{t('nav.logout')}</span>
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
