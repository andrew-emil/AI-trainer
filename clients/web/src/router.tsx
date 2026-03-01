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
import MyWorkouts from '@/pages/MyWorkouts';
import MyNutrition from '@/pages/MyNutrition';
import NutritionPlans from '@/pages/NutritionPlans';
import NutritionPlanDetails from '@/pages/NutritionPlanDetails';
import Progress from '@/pages/Progress';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Schedule from '@/pages/Schedule';
import Settings from '@/pages/Settings';
import TraineeDetail from '@/pages/TraineeDetail';
import TraineeProfile from '@/pages/TraineeProfile';
import Trainees from '@/pages/Trainees';
import TrainerProfile from '@/pages/TrainerProfile';
import Trainers from '@/pages/Trainers';
import TraineeProgress from '@/pages/TraineeProgress';
import WeightLog from '@/pages/WeightLog';
import WorkoutPlans from '@/pages/WorkoutPlans';
import WorkoutPlanDetails from '@/pages/WorkoutPlanDetails';
import NutritionCalculatorPage from '@/pages/NutritionCalculatorPage';
import TrainerRequestDetails from '@/pages/admin/TrainerRequestDetails';

// actions
import { forgetPasswordAction } from '@/actions/forgetPassword.action';
import { loginAction } from '@/actions/login.action';
import { registerAction } from '@/actions/register.action';
import { resetPasswordAction } from '@/actions/resetPassword.action';

// loaders
import { requireAuthLoader } from '@/loaders/requireAuth.loader';
import MyReviews from './pages/MyReviews';

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
          { path: 'login', element: <Login />, action: loginAction },
          { path: 'register', element: <Register />, action: registerAction },
          {
            path: 'forget-password',
            element: <ForgetPassword />,
            action: forgetPasswordAction,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
            action: resetPasswordAction,
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
            loader: requireAuthLoader(['trainee']),
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
            loader: requireAuthLoader(['trainer']),
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
        loader: requireAuthLoader(['admin']),
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
