import { LanguageProvider } from '@/contexts/LanguageContext';
import { NutritionProvider } from '@/contexts/NutritionContext';
import { WorkoutProvider } from '@/contexts/WorkoutContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './providers/SocketsProvider';
import { tokenStore } from './store/tokenStore';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SocketProvider jwt={tokenStore.get()}>
        <LanguageProvider>
          <WorkoutProvider>
            <NutritionProvider>
              <RouterProvider router={router} />
            </NutritionProvider>
          </WorkoutProvider>
        </LanguageProvider>
      </SocketProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
