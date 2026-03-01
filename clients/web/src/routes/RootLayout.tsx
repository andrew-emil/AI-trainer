import { NotificationsToastListener } from '@/components/notification/NotificationsToastListener';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SocketProvider } from '@/providers/SocketsProvider';
import { tokenStore } from '@/store/tokenStore';
import { Outlet } from 'react-router';

export default function RootLayout() {
  const token = tokenStore.get();

  return (
    <SocketProvider jwt={token}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NotificationsToastListener />
        <Outlet />
      </TooltipProvider>
    </SocketProvider>
  );
}
