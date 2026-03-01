import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const GuestLayout = () => {
  const { auth, loading } = useAuth();
  const { t } = useTranslation();
  const user = auth?.user;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-body animate-pulse">
            {t('common.loading') || 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (user) {
    switch (user.role) {
      case 'trainee':
        return <Navigate to="/dashboard" replace />;
      case 'trainer':
        return <Navigate to="/workout-plans" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default GuestLayout;
