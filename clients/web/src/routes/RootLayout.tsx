import { NotificationsToastListener } from '@/components/notification/NotificationsToastListener';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationsToastListener />
      <Outlet />
    </TooltipProvider>
  );
}
