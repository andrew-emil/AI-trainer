import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { ImageType, uploadImageToCloudinary } from '@/lib/cloudinary';
import { validateImage } from '@/lib/utils';
import { findTrainerById, updateTrainer } from '@/services/trainer';
import { updateUser } from '@/services/user';
import { UserRole } from '@/types/entities';
import { motion } from 'framer-motion';
import {
  Camera,
  Plus,
  Save,
  Shield,
  Trash2,
  User as UserIcon,
  X,
} from 'lucide-react';
import { Activity, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import EgyptianCard from '../ui/EgyptianCard';
import EgyptianDivider from '../ui/EgyptianDivider';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import UserAvatar from '../UserAvatar';

type ProfileFormValues = {
  avatar: string | null;
  avatarPublicId: string | null;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  // Trainer fields
  bio?: string;
  experienceYears?: number;
  certifications?: { name: string; imageUrl: string; imagePublicId: string }[];
  transformations?: { name: string; imageUrl: string; imagePublicId: string }[];
};

function ProfileSettings() {
  const { auth, refresh } = useAuth();
  const user = auth?.user;
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
    watch,
    reset,
    control,
    getValues,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || null,
      avatarPublicId: user?.avatarPublicId || null,
      bio: '',
      experienceYears: 0,
      certifications: [],
      transformations: [],
    },
  });

  const [isFetchingTrainer, setIsFetchingTrainer] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingTrainerImage, setIsUploadingTrainerImage] = useState(false);

  const avatar = watch('avatar');

  // Field arrays for trainer data
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  const {
    fields: transFields,
    append: appendTrans,
    remove: removeTrans,
  } = useFieldArray({
    control,
    name: 'transformations',
  });

  useEffect(() => {
    if (user?.role === UserRole.trainer && user?.id) {
      setIsFetchingTrainer(true);
      findTrainerById(user.id).then(({ data }) => {
        if (data) {
          setValue('bio', data.bio || '');
          setValue('experienceYears', data.experienceYears || 0);
          setValue(
            'certifications',
            data.certifications?.map((c) => ({
              name: c.name,
              imageUrl: c.imageUrl,
              imagePublicId: c.imagePublicId,
            })) || [],
          );
          setValue(
            'transformations',
            data.transformations?.map((t) => ({
              name: t.name,
              imageUrl: t.imageUrl,
              imagePublicId: t.imagePublicId,
            })) || [],
          );
        }
        setIsFetchingTrainer(false);
      });
    }
  }, [user?.id, user?.role, setValue]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file, t)) return;

    setIsUploadingAvatar(true);
    try {
      const { secureUrl, publicId } = await uploadImageToCloudinary(
        file,
        ImageType.AVATAR,
      );
      setValue('avatar', secureUrl, { shouldDirty: true });
      setValue('avatarPublicId', publicId, { shouldDirty: true });
      user.avatar = secureUrl;
      user.avatarPublicId = publicId;
      toast({
        title: 'Photo Uploaded',
        description:
          'Your profile photo has been uploaded successfully. Save changes to apply.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload photo',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleTrainerImageUpload = async (
    file: File,
    type: ImageType,
    index: number,
    field: 'certifications' | 'transformations',
  ) => {
    if (!validateImage(file, t)) return;

    setIsUploadingTrainerImage(true);
    try {
      const { secureUrl, publicId } = await uploadImageToCloudinary(file, type);
      setValue(`${field}.${index}.imageUrl`, secureUrl, { shouldDirty: true });
      setValue(`${field}.${index}.imagePublicId`, publicId, {
        shouldDirty: true,
      });

      // Auto-fill name if empty
      const namePath = `${field}.${index}.name` as const;
      const currentName = getValues(namePath);
      if (!currentName) {
        setValue(namePath, file.name.split('.')[0], { shouldDirty: true });
      }

      toast({
        title: 'Image Uploaded',
        description: 'Image uploaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingTrainerImage(false);
    }
  };

  const handleSaveProfile = async (data: ProfileFormValues) => {
    try {
      // 1. Update User
      const { error: userError } = await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        avatar: data.avatar,
        avatarPublicId: data.avatarPublicId,
      });

      if (userError) {
        toast({
          title: 'Error',
          description: userError.message || 'Failed to update user profile',
          variant: 'destructive',
        });
        return;
      }

      // 2. Update Trainer (if applicable)
      if (user.role === UserRole.trainer) {
        const { error: trainerError } = await updateTrainer({
          bio: data.bio,
          experienceYears: Number(data.experienceYears),
          certifications: data.certifications,
          transformations: data.transformations,
        });

        if (trainerError) {
          toast({
            title: 'Error',
            description:
              trainerError.message || 'Failed to update trainer profile',
            variant: 'destructive',
          });
          return;
        }
      }

      if (refresh) await refresh();
      reset(data);

      toast({
        title: t('settings.profile.saveChanges'),
        description: 'Your profile has been updated successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleRemovePhoto = () => {
    setValue('avatar', null, { shouldDirty: true });
    setValue('avatarPublicId', null, { shouldDirty: true });
    user.avatar = null;
    user.avatarPublicId = null;
    toast({
      title: 'Photo Removed',
      description:
        'Your profile photo has been removed. Save changes to apply.',
    });
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full"
    >
      <EgyptianCard hoverable={false}>
        <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-primary" />
          {t('settings.profile.title')}
        </h2>

        <EgyptianDivider className="mb-6" />

        <form onSubmit={handleSubmit(handleSaveProfile)}>
          {/* Photo Upload */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                {isUploadingAvatar ? (
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UserAvatar avatar={avatar} size="large" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute bottom-0 end-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-foreground">
                {t('settings.profile.photo')}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t('settings.profile.photoDesc')}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                >
                  <Camera className="w-4 h-4 me-2" />
                  {t('settings.profile.upload')}
                </Button>
                <Activity mode={avatar ? 'visible' : 'hidden'}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePhoto}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4 me-2" />
                    {t('settings.profile.remove')}
                  </Button>
                </Activity>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t('auth.register.firstName')}
                </Label>
                <Input
                  id="firstName"
                  {...register('firstName', { required: true })}
                  className="bg-muted/30 border-border/50"
                />
                {errors.firstName && (
                  <span className="text-xs text-destructive">
                    {t('auth.register.firstNameRequired')}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('auth.register.lastName')}</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: true })}
                  className="bg-muted/30 border-border/50"
                />
                {errors.lastName && (
                  <span className="text-xs text-destructive">
                    {t('auth.register.lastNameRequired')}
                  </span>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t('auth.register.username')}</Label>
                <Input
                  id="username"
                  {...register('username', { required: true })}
                  className="bg-muted/30 border-border/50"
                />
                {errors.username && (
                  <span className="text-xs text-destructive">
                    {t('auth.register.usernameRequired')}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('settings.profile.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: t('auth.login.emailRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('auth.login.emailInvalid'),
                    },
                  })}
                  className="bg-muted/20 border-border/50 cursor-not-allowed opacity-70"
                />
                {errors.email && (
                  <span className="text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('settings.profile.role')}</Label>
                <div className="flex items-center gap-2 h-10 p-3 rounded-lg bg-muted/20 border border-border/50 opacity-70">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-body text-foreground capitalize text-sm">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Trainer Specific Fields */}
            <Activity
              mode={user.role === UserRole.trainer ? 'visible' : 'hidden'}
            >
              <EgyptianDivider className="my-4" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Trainer Details
              </h3>

              <div className="space-y-6">
                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">{t('auth.register.bio')}</Label>
                  <Textarea
                    id="bio"
                    {...register('bio', {
                      required: t('auth.register.bioRequired'),
                    })}
                    className="bg-muted/30 border-border/50 min-h-[120px]"
                    placeholder={t('auth.register.bioPlaceholder')}
                  />
                  {errors.bio && (
                    <span className="text-xs text-destructive">
                      {errors.bio.message}
                    </span>
                  )}
                </div>

                {/* Experience Years */}
                <div className="space-y-2">
                  <Label htmlFor="experienceYears">
                    {t('auth.register.experienceYears')}
                  </Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    {...register('experienceYears', {
                      required: t('auth.register.experienceYearsRequired'),
                    })}
                    className="bg-muted/30 border-border/50 opacity-60 cursor-not-allowed"
                    placeholder={t('auth.register.experienceYearsPlaceholder')}
                    disabled
                  />
                  {errors.experienceYears && (
                    <span className="text-xs text-destructive">
                      {errors.experienceYears.message}
                    </span>
                  )}
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t('auth.register.certificates')}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendCert({
                          name: '',
                          imageUrl: '',
                          imagePublicId: '',
                        })
                      }
                      className="h-8"
                    >
                      <Plus className="w-4 h-4 me-1" />
                      Add
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {certFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="p-4 rounded-lg border border-border/40 bg-muted/10 space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <Label className="text-xs text-muted-foreground">
                            Certificate #{index + 1}
                          </Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCert(index)}
                            className="h-6 w-6 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Name</Label>
                          <Input
                            {...register(
                              `certifications.${index}.name` as const,
                              { required: true },
                            )}
                            className="bg-muted/30 border-border/50 h-9"
                            placeholder="Certificate Name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Image</Label>
                          {watch(`certifications.${index}.imageUrl`) ? (
                            <div className="relative w-full h-32 bg-muted/20 rounded-md overflow-hidden border border-border/30 group">
                              <img
                                src={watch(`certifications.${index}.imageUrl`)}
                                alt="Cert"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setValue(
                                      `certifications.${index}.imageUrl`,
                                      '',
                                    );
                                    setValue(
                                      `certifications.${index}.imagePublicId`,
                                      '',
                                    );
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleTrainerImageUpload(
                                    e.target.files[0],
                                    ImageType.CERTIFICATE,
                                    index,
                                    'certifications',
                                  );
                                }
                              }}
                              className="bg-muted/30 border-border/50 text-xs"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transformations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t('auth.register.transformations')}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendTrans({
                          name: '',
                          imageUrl: '',
                          imagePublicId: '',
                        })
                      }
                      className="h-8"
                    >
                      <Plus className="w-4 h-4 me-1" />
                      Add
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {transFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="p-4 rounded-lg border border-border/40 bg-muted/10 space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <Label className="text-xs text-muted-foreground">
                            Transformation #{index + 1}
                          </Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTrans(index)}
                            className="h-6 w-6 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Client Name / Title</Label>
                          <Input
                            {...register(
                              `transformations.${index}.name` as const,
                              { required: true },
                            )}
                            className="bg-muted/30 border-border/50 h-9"
                            placeholder="Transformation Title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Before/After Image</Label>
                          {watch(`transformations.${index}.imageUrl`) ? (
                            <div className="relative w-full h-32 bg-muted/20 rounded-md overflow-hidden border border-border/30 group">
                              <img
                                src={watch(`transformations.${index}.imageUrl`)}
                                alt="Trans"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setValue(
                                      `transformations.${index}.imageUrl`,
                                      '',
                                    );
                                    setValue(
                                      `transformations.${index}.imagePublicId`,
                                      '',
                                    );
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleTrainerImageUpload(
                                    e.target.files[0],
                                    ImageType.TRANSFORMATION,
                                    index,
                                    'transformations',
                                  );
                                }
                              }}
                              className="bg-muted/30 border-border/50 text-xs"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Activity>

            <Button
              type="submit"
              className="btn-pharaoh w-full sm:w-auto"
              disabled={
                !isDirty ||
                isSubmitting ||
                isUploadingAvatar ||
                isFetchingTrainer ||
                isUploadingTrainerImage
              }
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin me-2" />
              ) : (
                <Save className="w-4 h-4 me-2" />
              )}
              {t('settings.profile.saveChanges')}
            </Button>
          </div>
        </form>
      </EgyptianCard>
    </motion.div>
  );
}

export default ProfileSettings;
