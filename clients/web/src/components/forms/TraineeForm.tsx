import { useAuth } from '@/hooks/useAuth';
import { registerAsTrainee } from '@/services/auth';
import { Gender, TraineeGoal, UserRole } from '@/types/entities';
import { CreateTraineeDto } from '@/types/trainee';
import { CreateUserDto } from '@/types/user';
import { UserPlus } from 'lucide-react';
import { Activity, useState } from 'react';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../ui/input';
import UserForm from './UserForm';

export type TraineeInputs = CreateUserDto &
  CreateTraineeDto & { confirmPassword: string };

function TraineeForm() {
  const { t } = useTranslation();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TraineeInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
      gender: Gender.male,
      goal: TraineeGoal.body_recomb,
      heightCm: 40,
    },
  });
  const { refresh } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TraineeInputs) =>
      registerAsTrainee({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
        avatarPublicId: data.avatarPublicId,
        gender: data.gender,
        goal: data.goal,
        heightCm: data.heightCm,
        role: UserRole.trainee,
      }),
    onSuccess: ({ error }) => {
      if (error) {
        toast.error(error.data ?? t('auth.register.error'));
        return;
      }
      toast.success(t('auth.register.welcomeToast'));
      refresh().then(() => {
        navigate('/dashboard');
      });
    },
    onError: () => {
      toast.error(t('auth.register.error'));
    },
  });

  const isTraineeGoal = (v: unknown): v is TraineeGoal =>
    typeof v === 'string' &&
    (Object.values(TraineeGoal) as string[]).includes(v);

  const onSubmit: SubmitHandler<TraineeInputs> = (data: TraineeInputs) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <UserForm
        register={register as UseFormRegister<TraineeInputs>}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        setIsUploadingAvatar={setIsUploadingAvatar}
        isUploadingAvatar={isUploadingAvatar}
      />

      {/* goal */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.goal')}
        </label>
        <select
          {...register('goal', {
            required: t('auth.register.goalRequired'),
            validate: (value) =>
              isTraineeGoal(value) || t('auth.register.goalInvalid'),
          })}
          className="input-egyptian h-12 w-full rounded-md p-2"
        >
          <option value="">{t('auth.register.goalPlaceholder')}</option>
          <option value={TraineeGoal.body_recomb}>
            {t('auth.register.goalOptions.body_recomb')}
          </option>
          <option value={TraineeGoal.bulk}>
            {t('auth.register.goalOptions.bulk')}
          </option>
          <option value={TraineeGoal.cut}>
            {t('auth.register.goalOptions.cut')}
          </option>
          <option value={TraineeGoal.maintenance}>
            {t('auth.register.goalOptions.maintenance')}
          </option>
          <option value={TraineeGoal.strength}>
            {t('auth.register.goalOptions.strength')}
          </option>
        </select>
        <Activity mode={errors.goal?.message ? 'visible' : 'hidden'}>
          <p className="text-red-500 text-sm">{errors.goal?.message}</p>
        </Activity>
      </div>

      {/* height */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.height')}
        </label>
        <Input
          {...register('heightCm', {
            required: t('auth.register.heightRequired'),
            min: {
              value: 40,
              message: t('auth.register.heightMin'),
            },
            max: {
              value: 272,
              message: t('auth.register.heightMax'),
            },
          })}
          type="number"
          placeholder={t('auth.register.heightPlaceholder')}
          className="input-egyptian h-12"
        />
        <Activity mode={errors.heightCm?.message ? 'visible' : 'hidden'}>
          <p className="text-red-500 text-sm">{errors.heightCm?.message}</p>
        </Activity>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending || isUploadingAvatar}
        className="btn-pharaoh w-full rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isPending ? (
          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            {t('auth.register.submitButton')}
          </>
        )}
      </button>
    </form>
  );
}

export default TraineeForm;
