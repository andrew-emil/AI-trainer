import { ImageType, uploadImageToCloudinary } from '@/lib/cloudinary';
import { CreateTransformationDto } from '@/types/auth';
import { Gender, UserRole } from '@/types/entities';
import { ErrorResponse } from '@/types/errorResponse';
import { CreateTrainerDto } from '@/types/trainer';
import { CreateUserDto } from '@/types/user';
import { UserPlus, X } from 'lucide-react';
import { Activity, useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from 'react-router';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import UserForm from './UserForm';
import { validateImage } from '@/lib/utils';

export type TrainerInputs = CreateUserDto &
  CreateTrainerDto & {
    confirmPassword: string;
    transformations: CreateTransformationDto[];
  };

function TrainerForm() {
  const { t } = useTranslation();
  const [isUploadingCertificate, setIsUploadingCertificate] = useState(false);
  const [isUploadingTransformation, setIsUploadingTransformation] =
    useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<TrainerInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null,
      avatarPublicId: null,
      gender: Gender.male,
      bio: '',
      experienceYears: 0,
      certifications: [],
      transformations: [],
    },
  });

  // Certificates FieldArray
  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  // Transformations FieldArray (array of images)
  const {
    fields: transformationFields,
    append: appendTransformation,
    remove: removeTransformation,
  } = useFieldArray({
    control,
    name: 'transformations',
  });

  const { state } = useNavigation();
  const isLoading = state === 'submitting' || state === 'loading';
  const navigate = useNavigate();
  const submitForm = useSubmit();
  const action = useActionData<{ message: string } | ErrorResponse>();

  useEffect(() => {
    if (!action) return;

    if (typeof action === 'string') {
      toast.success(t('auth.register.registerTrainerSuccessToast'));
      navigate('/');
    } else {
      toast.error(action.message);
    }
  }, [action, navigate, t]);

  const handleCertificateImageChange = async (index: number, file?: File) => {
    if (!file) return;
    if (!validateImage(file, t)) return;

    setIsUploadingCertificate(true);
    try {
      const { secureUrl, publicId } = await uploadImageToCloudinary(
        file,
        ImageType.CERTIFICATE,
      );
      setValue(`certifications.${index}.imageUrl` as never, secureUrl as never, {
        shouldValidate: true,
      });
      setValue(`certifications.${index}.imagePublicId` as never, publicId as never, {
        shouldValidate: true,
      });
      if (getValues(`certifications.${index}.name`) === '')
        setValue(`certifications.${index}.name` as never, file.name as never, {
          shouldValidate: true,
        });
      toast.success(t('auth.register.certificateUploaded'));
    } catch {
      toast.error(t('auth.register.certificateUploadError'));
    } finally {
      setIsUploadingCertificate(false);
    }
  };

  const handleTransformationImageChange = async (index: number, file?: File) => {
    if (!file) return;
    if (!validateImage(file, t)) return;

    setIsUploadingTransformation(true);
    try {
      const { secureUrl, publicId } = await uploadImageToCloudinary(
        file,
        ImageType.TRANSFORMATION,
      );
      setValue(`transformations.${index}.imageUrl` as never, secureUrl as never, {
        shouldValidate: true,
      });
      setValue(
        `transformations.${index}.imagePublicId` as never,
        publicId as never,
        {
          shouldValidate: true,
        },
      );
      if (getValues(`transformations.${index}.name`) === '')
        setValue(`transformations.${index}.name` as never, file.name as never, {
          shouldValidate: true,
        });
      toast.success(t('auth.register.transformationUploaded'));
    } catch {
      toast.error(t('auth.register.transformationUploadError'));
    } finally {
      setIsUploadingTransformation(false);
    }
  };

  const onSubmit: SubmitHandler<TrainerInputs> = (
    data: TrainerInputs,
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    submitForm(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
        avatarPublicId: data.avatarPublicId,
        gender: data.gender,
        bio: data.bio,
        experienceYears: data.experienceYears,
        certifications: JSON.stringify(
          data.certifications.map((certificate) => ({
            name: certificate.name,
            imageUrl: certificate.imageUrl,
            imagePublicId: certificate.imagePublicId,
          })),
        ),
        transformations: JSON.stringify(
          data.transformations.map((transformation) => ({
            imageUrl: transformation.imageUrl,
            imagePublicId: transformation.imagePublicId,
            name: transformation.name,
          })),
        ),
        role: UserRole.trainer,
      },
      { method: 'POST' },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <UserForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        setIsUploadingAvatar={setIsUploadingAvatar}
        isUploadingAvatar={isUploadingAvatar}
      />

      {/* bio */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.bio')}
        </label>
        <Textarea
          {...register('bio', { required: t('auth.register.bioRequired') })}
          placeholder={t('auth.register.bioPlaceholder')}
          className="input-egyptian"
          rows={4}
        />
        <Activity mode={errors.bio?.message ? 'visible' : 'hidden'}>
          <p className="text-red-500 text-sm">{errors.bio?.message}</p>
        </Activity>
      </div>

      {/* experienceYears */}
      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">
          {t('auth.register.experienceYears')}
        </label>
        <Input
          {...register('experienceYears', {
            required: t('auth.register.experienceYearsRequired'),
          })}
          type="number"
          placeholder={t('auth.register.experienceYearsPlaceholder')}
          className="input-egyptian h-12"
        />
        <Activity mode={errors.experienceYears?.message ? 'visible' : 'hidden'}>
          <p className="text-red-500 text-sm">
            {errors.experienceYears?.message}
          </p>
        </Activity>
      </div>

      {/* Certificates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.register.certificates')}
          </label>
          <button
            type="button"
            className="btn-pharaoh px-3 py-2 rounded-md"
            onClick={() =>
              appendCertificate({ name: '', imageUrl: '', imagePublicId: '' })
            }
          >
            {t('auth.register.addCertificate')}
          </button>
        </div>

        {certificateFields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t('auth.register.noCertificates')}
          </p>
        )}

        <div className="space-y-4">
          {certificateFields.map((field, index) => (
            <div
              key={field.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {t('auth.register.certificate')} #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  className="text-destructive hover:underline"
                >
                  {t('auth.register.removeCertificate')}
                </button>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t('auth.register.certificateName')}
                </label>
                <Input
                  {...register(`certifications.${index}.name` as const, {
                    required: 'Name is required',
                  })}
                  placeholder={t('auth.register.certificateNamePlaceholder')}
                  className="input-egyptian h-12"
                />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t('auth.register.certificateImage')}
                </label>

                {getValues(`certifications.${index}.imageUrl`) ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={getValues(`certifications.${index}.imageUrl`)}
                      alt="Certificate"
                      className="w-28 h-20 object-cover rounded-md border border-border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setValue(`certifications.${index}.imageUrl` as never, '' as never)
                      }
                      className="text-destructive hover:underline"
                    >
                      {t('auth.register.clearImage')}
                    </button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleCertificateImageChange(index, e.target.files?.[0])
                    }
                    className="input-egyptian h-12"
                  />
                )}

                <input
                  type="hidden"
                  {...register(`certifications.${index}.imageUrl` as const, {
                    required: 'Image is required',
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transformations */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-body text-sm text-muted-foreground">
            {t('auth.register.transformations')}
          </label>
          <button
            type="button"
            className="btn-pharaoh px-3 py-2 rounded-md"
            onClick={() =>
              appendTransformation({ name: '', imageUrl: '', imagePublicId: '' })
            }
          >
            {t('auth.register.addTransformation')}
          </button>
        </div>

        {transformationFields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t('auth.register.noTransformations')}
          </p>
        )}

        <div className="space-y-4">
          {transformationFields.map((field, index) => (
            <div
              key={field.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {t('auth.register.transformation')} #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeTransformation(index)}
                  className="text-destructive hover:underline"
                >
                  {t('auth.register.removeTransformation')}
                </button>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t('auth.register.transformationName')}
                </label>
                <Input
                  {...register(`transformations.${index}.name` as const, {
                    required: 'Name is required',
                  })}
                  placeholder={t('auth.register.transformationNamePlaceholder')}
                  className="input-egyptian h-12"
                />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t('auth.register.transformationImage')}
                </label>

                {getValues(`transformations.${index}.imageUrl`) ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={getValues(`transformations.${index}.imageUrl`)}
                      alt="Transformation"
                      className="w-28 h-20 object-cover rounded-md border border-border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setValue(
                          `transformations.${index}.imageUrl` as never,
                          '' as never,
                        )
                      }
                      className="text-destructive hover:underline"
                    >
                      {t('auth.register.clearImage')}
                    </button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleTransformationImageChange(index, e.target.files?.[0])
                    }
                    className="input-egyptian h-12"
                  />
                )}

                <input
                  type="hidden"
                  {...register(`transformations.${index}.imageUrl` as const, {
                    required: 'Image is required',
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          isLoading || isUploadingCertificate || isUploadingTransformation || isUploadingAvatar
        }
        className="btn-pharaoh w-full rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
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

export default TrainerForm;
