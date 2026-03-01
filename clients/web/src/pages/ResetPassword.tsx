import FormWrapper from '@/components/forms/FormWrapper';
import { Input } from '@/components/ui/input';
import { ErrorResponse } from '@/types/errorResponse';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { Activity, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
  useSubmit,
} from 'react-router';
import { toast } from 'sonner';

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const action = useActionData<{ message: string } | ErrorResponse>();
  const { state } = useNavigation();
  const navigate = useNavigate();
  const [isLoading] = useState(state === 'submitting' || state === 'loading');

  if (!token) {
    navigate('/not-found');
  }
  const submit = useSubmit();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) navigate('/not-found', { replace: true });
  }, [token, navigate]);

  // React to action result AFTER the router action finishes
  useEffect(() => {
    if (!action) return;

    if ('statusCode' in action) {
      toast.error(action.message);
      return;
    }

    toast.success(t('auth.resetPassword.successToast'));
    reset();
    navigate('/login', { replace: true });
  }, [action, navigate, reset, t]);

  const onSubmit = (data: ResetPasswordForm) => {
    if (!token) return;
    submit({ token, password: data.password }, { method: 'post' });
  };

  return (
    <FormWrapper
      title={t('auth.resetPassword.title')}
      subtitle={t('auth.resetPassword.subtitle')}
    >
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.resetPassword.password')}
          </label>
          <div className="relative">
            <Input
              {...register('password', {
                required: t('auth.resetPassword.passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('auth.resetPassword.passwordMinLength'),
                },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.resetPassword.passwordPlaceholder')}
              className="input-egyptian h-12 pe-12"
              onPaste={(e) => e.preventDefault()}
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

        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.resetPassword.confirmPassword')}
          </label>
          <div className="relative">
            <Input
              {...register('confirmPassword', {
                required: t('auth.resetPassword.confirmPasswordRequired'),
                minLength: {
                  value: 8,
                  message: t('auth.resetPassword.confirmPasswordMinLength'),
                },
                validate: (value) => {
                  const password = getValues('password');
                  if (value !== password) {
                    return t('auth.resetPassword.passwordMismatch');
                  }
                  return true;
                },
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
              className="input-egyptian h-12 pe-12"
              onPaste={(e) => e.preventDefault()}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <Activity
            mode={errors.confirmPassword?.message ? 'visible' : 'hidden'}
          >
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </Activity>
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
              <KeyRound className="w-5 h-5" />
              {t('auth.resetPassword.submitButton')}
            </>
          )}
        </button>
      </form>
    </FormWrapper>
  );
}

export default ResetPassword;
