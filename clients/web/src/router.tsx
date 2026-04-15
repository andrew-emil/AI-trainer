import { createBrowserRouter, Outlet } from 'react-router';

import RootErrorBoundary from '@/components/RootErrorBoundary';
import NotFound from '@/pages/NotFound';
import GuestLayout from '@/routes/GuestLayout';
import RootLayout from '@/routes/RootLayout';

import About from '@/pages/About';
import Admin from '@/pages/Admin';
import Chat from '@/pages/Chat';
import Chats from '@/pages/Chats';
import Dashboard from '@/pages/Dashboard';
import Features from '@/pages/Features';
import ForgetPassword from '@/pages/ForgetPassword';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import MyNutrition from '@/pages/MyNutrition';
import MyWorkouts from '@/pages/MyWorkouts';
import NutritionCalculatorPage from '@/pages/NutritionCalculatorPage';
import NutritionPlanDetails from '@/pages/NutritionPlanDetails';
import NutritionPlans from '@/pages/NutritionPlans';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Schedule from '@/pages/Schedule';
import Settings from '@/pages/Settings';
import TraineeDetail from '@/pages/TraineeDetail';
import TraineeProfile from '@/pages/TraineeProfile';
import TraineeProgress from '@/pages/TraineeProgress';
import Trainees from '@/pages/Trainees';
import TrainerProfile from '@/pages/TrainerProfile';
import Trainers from '@/pages/Trainers';
import WeightLog from '@/pages/WeightLog';
import WorkoutPlanDetails from '@/pages/WorkoutPlanDetails';
import WorkoutPlans from '@/pages/WorkoutPlans';
import TrainerRequestDetails from '@/pages/admin/TrainerRequestDetails';

// loaders
import { requireAuthLoader } from '@/loaders/requireAuth.loader';
import MyReviews from './pages/MyReviews';
import { UserRole } from './services/user';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    hydrateFallbackElement: (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
    children: [
      { index: true, element: <Index /> },

      {
        element: <GuestLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          {
            path: 'forget-password',
            element: <ForgetPassword />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: 'trainers',
        element: <Trainers />,
      },
      { path: 'features', element: <Features /> },
      { path: 'about', element: <About /> },
      {
        element: <Outlet />,
        loader: requireAuthLoader(),
        children: [
          // Trainee only routes
          {
            element: <Outlet />,
            loader: requireAuthLoader([UserRole.trainee]),
            children: [
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'my-workouts', element: <MyWorkouts /> },
              { path: 'my-nutrition', element: <MyNutrition /> },
              { path: 'schedule', element: <Schedule /> },
              { path: 'weight-log', element: <WeightLog /> },
              { path: 'progress', element: <TraineeProgress /> },
              { path: 'my-reviews', element: <MyReviews /> },
            ],
          },

          // Trainer only routes
          {
            element: <Outlet />,
            loader: requireAuthLoader([UserRole.trainer]),
            children: [
              { path: 'workout-plans', element: <WorkoutPlans /> },
              { path: 'workout-plans/:id', element: <WorkoutPlanDetails /> },
              { path: 'trainees', element: <Trainees /> },
              { path: 'trainees/:id', element: <TraineeDetail /> },
              { path: 'trainees/:id/progress', element: <TraineeProgress /> },
              { path: 'nutrition', element: <NutritionPlans /> },
              { path: 'nutrition/:id', element: <NutritionPlanDetails /> },
              {
                path: 'nutrition-calculator',
                element: <NutritionCalculatorPage />,
              },
            ],
          },

          // Common authenticated routes
          { path: 'trainers/:id', element: <TrainerProfile /> },
          { path: 'trainer-profile', element: <TrainerProfile /> },
          { path: 'trainee-profile', element: <TraineeProfile /> },
          { path: 'settings', element: <Settings /> },
          { path: 'chat/:chatId', element: <Chat /> },
          { path: 'chats', element: <Chats /> },
        ],
      },
      {
        element: <Outlet />,
        loader: requireAuthLoader([UserRole.admin]),
        children: [
          { path: 'admin', element: <Admin /> },
          {
            path: 'admin/trainer-requests/:id',
            element: <TrainerRequestDetails />,
          },
        ],
      },
      // Catch-all
      { path: '*', element: <NotFound /> },
    ],
  },
]);
