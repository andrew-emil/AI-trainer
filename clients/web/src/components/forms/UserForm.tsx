import { ImageType, uploadImageToCloudinary } from '@/lib/cloudinary';
import { Gender } from '@/types/entities';
import { CreateUserDto } from '@/types/user';
import { Eye, EyeOff, Upload, X } from 'lucide-react';
import { Activity, useState } from 'react';
import {
  FieldErrors,
  Path,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import UserAvatar from '../UserAvatar';

interface UserFormProps<T extends CreateUserDto & { confirmPassword: string }> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  setIsUploadingAvatar: (isUploadingAvatar: boolean) => void;
  isUploadingAvatar: boolean;
}

function UserForm<T extends CreateUserDto & { confirmPassword: string }>({
  register,
  errors,
  getValues,
  setValue,
  setIsUploadingAvatar,
  isUploadingAvatar,
}: UserFormProps<T>) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('auth.register.avatarFileTypeError'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('auth.register.avatarFileSizeError'));
      return;
    }

    // Upload to Cloudinary
    setIsUploadingAvatar(true);
    try {
      const { secureUrl, publicId } = await uploadImageToCloudinary(
        file,
        ImageType.AVATAR,
      );
      setValue(ImageType.AVATAR as Path<T>, secureUrl as never);
      setValue('avatarPublicId' as Path<T>, publicId as never);
      setAvatarPreview(secureUrl);
      toast.success(t('auth.register.avatarUploadSuccess'));
    } catch (error) {
      toast.error(t('auth.register.avatarUploadError'));
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setValue(ImageType.AVATAR as Path<T>, null as never);
    setValue('avatarPublicId' as Path<T>, null as never);
  };

  return (
    <>
      {/* Avatar Upload */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.avatar')}
        </label>
        <div className="flex flex-col gap-3 rounded-full w-full items-center justify-center">
          {avatarPreview ? (
            <>
              <UserAvatar size="large" avatar={avatarPreview} />
              <Button
                onClick={handleRemoveAvatar}
                className="relative top-0 right-0 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              >
                Remove
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <label
              htmlFor="avatar-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {t('auth.register.avatarPlaceholder')}
                </p>
              </div>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="input-egyptian h-12 rounded-full"
                disabled={isUploadingAvatar}
              />
            </label>
          )}
        </div>
        {errors.avatar?.message && (
          <p className="text-red-500 text-sm">
            {errors.avatar?.message as string}
          </p>
        )}
      </div>

      {/* First Name */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.firstName')}
        </label>
        <Input
          {...register('firstName' as Path<T>, {
            required: t('auth.register.firstNameRequired'),
          })}
          type="text"
          placeholder={t('auth.register.firstNamePlaceholder')}
          className="input-egyptian h-12"
        />
        {errors.firstName?.message && (
          <p className="text-red-500 text-sm">
            {errors.firstName?.message as string}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.lastName')}
        </label>
        <Input
          {...register('lastName' as Path<T>, {
            required: t('auth.register.lastNameRequired'),
          })}
          type="text"
          placeholder={t('auth.register.lastNamePlaceholder')}
          className="input-egyptian h-12"
        />
        {errors.lastName?.message && (
          <p className="text-red-500 text-sm">
            {errors.lastName?.message as string}
          </p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.username')}
        </label>
        <Input
          {...register('username' as Path<T>, {
            required: t('auth.register.usernameRequired'),
            minLength: {
              value: 3,
              message: t('auth.register.usernameMinLength'),
            },
          })}
          type="text"
          placeholder={t('auth.register.usernamePlaceholder')}
          className="input-egyptian h-12"
        />
        {errors.username?.message && (
          <p className="text-red-500 text-sm">
            {errors.username?.message as string}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.email')}
        </label>
        <Input
          {...register('email' as Path<T>, {
            required: t('auth.register.emailRequired'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('auth.register.emailInvalid'),
            },
          })}
          type="email"
          placeholder={t('auth.register.emailPlaceholder')}
          className="input-egyptian h-12"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">
            {errors.email?.message as string}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.password')}
        </label>
        <div className="relative">
          <Input
            {...register('password' as Path<T>, {
              required: t('auth.register.passwordRequired'),
              minLength: {
                value: 8,
                message: t('auth.register.passwordMinLength'),
              },
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.register.passwordPlaceholder')}
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
        {errors.password?.message && (
          <p className="text-red-500 text-sm">
            {errors.password?.message as string}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.confirmPassword')}
        </label>
        <div className="relative">
          <Input
            {...register('confirmPassword' as Path<T>, {
              required: t('auth.register.confirmPasswordRequired'),
              validate: (value) => {
                const password = getValues('password' as Path<T>);
                if (value !== password) {
                  return t('auth.register.passwordMismatch');
                }
                return true;
              },
            })}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('auth.register.confirmPasswordPlaceholder')}
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
        {errors.confirmPassword?.message && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message as string}
          </p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.gender')}
        </label>
        <select
          {...register('gender' as Path<T>, {
            required: t('auth.register.genderRequired'),
          })}
          className="input-egyptian h-12 w-full rounded-md p-2"
        >
          <option value="">{t('auth.register.genderPlaceholder')}</option>
          <option value={Gender.male}>Male</option>
          <option value={Gender.female}>Female</option>
        </select>
        {errors.gender?.message && (
          <p className="text-red-500 text-sm">
            {errors.gender?.message as string}
          </p>
        )}
      </div>
    </>
  );
}

export default UserForm;
