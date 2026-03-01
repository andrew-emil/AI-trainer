import { useAuth } from '@/hooks/useAuth';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from './DashboardHeader';
import DashboardMobileHeader from './DashboardMobileHeader';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { auth, loading } = useAuth();
  const user = auth?.user;
  const isRTL = i18n.language === 'ar';

  // Show loading spinner while initial auth is loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-body animate-pulse">
            {t('common.loading')}
          </p>
        </div>
      </div>
    );
  }

  // If loading finished and we STILL have no user, redirecting should be handled by the router loader.
  // But as a fallback, we show nothing or an error.
  if (!user) {
    return null; // The loader will redirect to /login
  }

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <DashboardMobileHeader setSidebarOpen={setSidebarOpen} />

      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isRTL={isRTL}
      />

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all duration-300 ${isRTL ? 'lg:mr-64' : 'lg:ml-64'}`}
      >
        <DashboardHeader />

        {/* Page Content */}
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
