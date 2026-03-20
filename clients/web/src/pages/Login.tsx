import FormWrapper from '@/components/forms/FormWrapper';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { ErrorResponse } from '@/types/errorResponse';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Activity, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from 'react-router';
import { toast } from 'sonner';

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const actionData = useActionData<string | ErrorResponse>();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useNavigation();
  const isLoading = state === 'submitting' || state === 'loading';

  const { refresh } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (!actionData) return;

    if (typeof actionData === 'string') {
      toast.success(t('auth.login.welcomeToast'));
      refresh().then((authState) => {
        if (!authState.user) {
          navigate('/');
          return;
        }

        switch (authState.user.role) {
          case 'trainee':
            navigate('/dashboard');
            break;
          case 'trainer':
            navigate('/workout-plans');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/');
        }
      });
    } else {
      const error = actionData as ErrorResponse;
      toast.error(error.message ?? t('auth.login.error'));
    }
  }, [actionData, navigate, t, refresh]);

  const onSubmit: SubmitHandler<Inputs> = (data, e: React.FormEvent) => {
    e.preventDefault();
    submit(data, { method: 'post' });
  };

  return (
    <FormWrapper
      title={t('auth.login.title')}
      subtitle={t('auth.login.subtitle')}
    >
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.login.email')}
          </label>
          <Input
            {...register('email', {
              required: t('auth.login.emailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('auth.login.emailInvalid'),
              },
            })}
            type="email"
            placeholder={t('auth.login.emailPlaceholder')}
            className="input-egyptian h-12"
          />
          <Activity mode={errors.email?.message ? 'visible' : 'hidden'}>
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </Activity>
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.login.password')}
          </label>
          <div className="relative">
            <Input
              {...register('password', {
                required: t('auth.login.passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('auth.login.passwordMinLength'),
                },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.login.passwordPlaceholder')}
              className="input-egyptian h-12 pe-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <Activity mode={errors.password?.message ? 'visible' : 'hidden'}>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </Activity>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary"
            />
            <span className="font-body text-sm text-muted-foreground">
              {t('auth.login.rememberMe')}
            </span>
          </label>
          <Link
            to="/forget-password"
            className="font-body text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {t('auth.login.forgotPassword')}
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-pharaoh w-full rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              {t('auth.login.submitButton')}
            </>
          )}
        </button>
      </form>

      <EgyptianDivider className="my-8" />

      {/* Register link */}
      <p className="text-center font-body text-muted-foreground">
        {t('auth.login.noAccount')}{' '}
        <Link
          to="/register"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          {t('auth.login.signUp')}
        </Link>
      </p>
    </FormWrapper>
  );
};

export default Login;
