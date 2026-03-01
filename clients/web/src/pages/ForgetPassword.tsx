import FormWrapper from '@/components/forms/FormWrapper';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import { Activity, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useActionData, useNavigation, useSubmit } from 'react-router';
import { toast } from 'sonner';

type ForgetPasswordForm = {
  email: string;
};

function ForgetPassword() {
  const submit = useSubmit();
  const action = useActionData<string>();
  const { t } = useTranslation();
  const { state } = useNavigation();
  const isLoading = state === 'submitting' || state === 'loading';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordForm>({
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (!action) return;

    if (action) {
      toast.success(t('auth.forgetPassword.successToast'));
    }
  }, [action, t]);

  const onSubmit = (data: ForgetPasswordForm, e: React.FormEvent) => {
    e.preventDefault();
    submit(data, { method: 'post' });
  };

  return (
    <FormWrapper
      title={t('auth.forgetPassword.title')}
      subtitle={t('auth.forgetPassword.subtitle')}
    >
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.forgetPassword.email')}
          </label>
          <Input
            {...register('email', {
              required: t('auth.forgetPassword.emailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('auth.forgetPassword.emailInvalid'),
              },
            })}
            type="email"
            placeholder={t('auth.forgetPassword.emailPlaceholder')}
            className="input-egyptian h-12"
          />
          <Activity mode={errors.email?.message ? 'visible' : 'hidden'}>
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
              <LogIn className="w-5 h-5" />
              {t('auth.forgetPassword.submitButton')}
            </>
          )}
        </button>
      </form>
    </FormWrapper>
  );
}

export default ForgetPassword;
