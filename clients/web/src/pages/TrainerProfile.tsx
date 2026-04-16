import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StarRating from '@/components/ui/StarRating';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import i18n from '@/i18n';
import {
  createReview,
  createTrainerRequest,
  getAssignedTrainers
} from '@/services/trainee';
import { traineeQueryKeys } from '@/services/trainee/queryKeys';
import {
  findTrainerById,
  getReviewsForTrainer
} from '@/services/trainer';
import { trainerQueryKeys } from '@/services/trainer/queryKeys';
import { UserRole } from '@/services/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Calendar,
  ChevronLeft,
  Crown,
  Edit,
  History as HistoryIcon,
  Loader2,
  Mail,
  MessageSquare,
  Quote,
  Star,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { toast } from 'sonner';

const TrainerProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { auth } = useAuth();
  const user = auth?.user;
  const queryClient = useQueryClient();

  const [sessionsCount, setSessionsCount] = useState<string>('20');
  const [isRequesting, setIsRequesting] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageTitle, setSelectedImageTitle] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  // Fetch trainer data
  const {
    data: trainer = null,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useQuery({
    queryKey: trainerQueryKeys.detail(id!),
    queryFn: () => findTrainerById(id!),
    enabled: !!id,
  });

  console.log('Trainer data:', trainer);

  // Fetch reviews for this trainer
  const { data: reviews = [] } = useQuery({
    queryKey: trainerQueryKeys.reviews(id!),
    queryFn: () => getReviewsForTrainer(id!),
    enabled: !!id,
  });

  console.log('Reviews data:', reviews);

  // Fetch assignment data (only for trainees)
  const isTrainee = user?.role === UserRole.trainee;
  const { data: assignmentRaw = null } = useQuery({
    queryKey: traineeQueryKeys.assignedTrainers(),
    queryFn: () => getAssignedTrainers(),
    enabled: isTrainee,
  });

  console.log('Assignment data:', assignmentRaw);

  // Derive assignment status from the fetched data
  const isAssigned = !!(assignmentRaw && trainer && (
    assignmentRaw.trainerId === trainer.userId ||
    assignmentRaw.trainer?.userId === trainer.userId ||
    assignmentRaw.trainerId === id
  ));
  const assignmentData = isAssigned ? assignmentRaw : null;
  const isLoading = isTrainerLoading;

  // Helper to refetch all queries after mutations
  const refetchAll = () => {
    queryClient.invalidateQueries({ queryKey: trainerQueryKeys.detail(id!) });
    queryClient.invalidateQueries({ queryKey: trainerQueryKeys.reviews(id!) });
    if (isTrainee) {
      queryClient.invalidateQueries({ queryKey: traineeQueryKeys.assignedTrainers() });
    }
  };

  const handleRequestTrainer = async () => {
    if (!trainer) return;
    setIsRequesting(true);
    try {
      await createTrainerRequest(trainer.userId, Number(sessionsCount));
      toast.success(t('profile.trainer.requestSuccess'));
      setIsRequestDialogOpen(false);
      refetchAll();
    } catch (err) {
      toast.error(
        typeof err === 'string' ? err : t('profile.trainer.requestError'),
      );
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCreateReview = async () => {
    if (!trainer) return;
    setIsRequesting(true);
    try {
      await createReview({
        trainerId: trainer.userId,
        rating: reviewRating,
        comment: reviewComment,
      });
      toast.success(t('reviews.reviewSuccess'));
      setIsReviewDialogOpen(false);
      setReviewRating(0);
      setReviewComment('');
      refetchAll();
    } catch (err) {
      toast.error(
        typeof err === 'string' ? err : t('reviews.reviewError'),
      );
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
        </div>
      </DashboardLayout>
    );
  }

  if (isTrainerError) {
    toast.error(t('profile.trainer.fetchError'));
  }

  if (!trainer) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center text-muted-foreground">
          {t('profile.trainer.notFound')}
        </div>
      </DashboardLayout>
    );
  }

  // isTrainee is already defined above

  // A trainee with active sessions should renew, not re-request
  const hasActiveMembership =
    isAssigned &&
    assignmentData != null &&
    (assignmentData.sessionsCount > 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Link */}
        <Link
          to="/trainers"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-egyptian-gold transition-colors gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('profile.trainer.backToTrainers')}
        </Link>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EgyptianCard className="relative overflow-hidden">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-egyptian-gold/30 via-egyptian-gold/20 to-egyptian-turquoise/20" />

            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-egyptian-gold bg-egyptian-night flex items-center justify-center overflow-hidden">
                  {trainer.user?.avatar ? (
                    <img
                      src={trainer.user.avatar}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-egyptian-gold" />
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">
                      {trainer.user.firstName} {trainer.user.lastName}
                    </h1>
                    <span className="px-3 py-1 rounded-full bg-egyptian-gold/20 text-egyptian-gold text-sm font-medium">
                      {t('profile.trainer.role')}
                    </span>
                  </div>
                  <p className="text-egyptian-gold font-medium mb-2">
                    {trainer.certifications?.map((c) => c.name).join(', ') ||
                      t('profile.trainer.certifiedTrainer')}
                  </p>
                  <p className="text-muted-foreground max-w-xl">
                    {trainer.bio || t('profile.trainer.noBio')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {(user?.id === trainer.userId ||
                    user?.role === UserRole.admin) && (
                      <Button
                        asChild
                        className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      >
                        <Link to="/settings">
                          <Edit className="w-4 h-4 mr-2" />
                          {t('profile.trainer.editProfile')}
                        </Link>
                      </Button>
                    )}

                  {isTrainee && (
                    <Dialog
                      open={isRequestDialogOpen}
                      onOpenChange={setIsRequestDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          disabled={hasActiveMembership}
                          className="bg-gradient-to-r text-black from-egyptian-gold to-egyptian-gold-light hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isAssigned ? (
                            <HistoryIcon className="w-4 h-4 mr-2" />
                          ) : (
                            <UserPlus className="w-4 h-4 mr-2" />
                          )}
                          {isAssigned
                            ? t('dashboard.renewalMembershipDialog.title')
                            : t('dashboard.renewalMembershipDialog.requestTitle')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {isAssigned
                              ? t('dashboard.renewalMembershipDialog.renewTitle', {
                                trainer: trainer.user.firstName,
                              })
                              : t('dashboard.renewalMembershipDialog.requestWith', {
                                trainer: trainer.user.firstName,
                              })}
                          </DialogTitle>
                          <DialogDescription>
                            {isAssigned
                              ? t('dashboard.renewalMembershipDialog.renewDesc')
                              : t('dashboard.renewalMembershipDialog.requestDesc')}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sessions" className="text-right">
                              {t('dashboard.renewalMembershipDialog.sessions')}
                            </Label>
                            <div className="col-span-3">
                              <Select
                                value={sessionsCount}
                                onValueChange={setSessionsCount}
                              >
                                <SelectTrigger id="sessions">
                                  <SelectValue
                                    placeholder={t(
                                      'dashboard.renewalMembershipDialog.selectSessions',
                                    )}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {[20, 40, 60].map((count) => (
                                    <SelectItem key={count} value={String(count)}>
                                      {t(
                                        'dashboard.renewalMembershipDialog.sessionCount',
                                        { count },
                                      )}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={handleRequestTrainer}
                            disabled={isRequesting}
                            className="bg-egyptian-gold text-egyptian-night hover:bg-egyptian-gold-light"
                          >
                            {isRequesting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isAssigned ? (
                              t('dashboard.renewalMembershipDialog.sendRenewal')
                            ) : (
                              t('dashboard.renewalMembershipDialog.sendRequest')
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {isTrainee && isAssigned && (
                    <Dialog
                      open={isReviewDialogOpen}
                      onOpenChange={setIsReviewDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {t('reviews.writeReview')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-egyptian-night border-egyptian-gold/30 sm:max-w-[480px] max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
                        <div className="sticky top-0 z-10 bg-egyptian-night pt-6 pb-2 border-b border-egyptian-gold/10">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light bg-clip-text text-transparent">
                              {t('reviews.writeReview')}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground/70 text-sm">
                              {t('reviews.subtitle')}
                            </DialogDescription>
                          </DialogHeader>
                        </div>

                        <div className="space-y-6 py-4">
                          <div className="space-y-3">
                            <Label className="text-egyptian-gold font-medium text-sm">
                              {t('reviews.rating')}
                            </Label>
                            <div className="p-4 rounded-xl bg-black border border-egyptian-gold/10 flex justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                              <StarRating
                                rating={reviewRating}
                                interactive
                                onRatingChange={setReviewRating}
                                size={32}
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-egyptian-gold font-medium text-sm">
                              {t('reviews.comment')}
                            </Label>
                            <Textarea
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              placeholder={t('reviews.commentPlaceholder')}
                              className="bg-black border-egyptian-gold/10 focus:border-egyptian-gold/40 min-h-[100px] transition-all duration-300 text-white placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>

                        <DialogFooter className="pt-2 pb-2">
                          <Button
                            disabled={isRequesting || reviewRating === 0}
                            onClick={handleCreateReview}
                            className="w-full bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-egyptian-night hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500 font-bold h-11 text-base"
                          >
                            {isRequesting && (
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            )}
                            {t('reviews.submitReview')}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          </EgyptianCard>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {[
            {
              label: t('profile.trainer.rating'),
              value: (
                <div className="flex items-center justify-center gap-1">
                  <span>{trainer.ratingAvg.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">
                    ({trainer.ratingCount})
                  </span>
                </div>
              ),
              icon: Star,
            },
            {
              label: t('profile.trainer.rank'),
              value: trainer.rankScore || 0,
              icon: Crown,
            },
            {
              label: t('profile.trainer.experience'),
              value: `${trainer.experienceYears} ${t('profile.trainer.years')}`,
              icon: HistoryIcon,
            },
            {
              label: t('profile.trainer.achievements'),
              value: trainer.certifications?.length || 0,
              icon: Award,
            },
            {
              label: t('profile.trainer.transformations'),
              value: trainer.transformations?.length || 0,
              icon: Users,
            },
          ].map((stat) => (
            <EgyptianCard
              key={stat.label}
              className="p-4 text-center group hover:border-egyptian-gold/40 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-egyptian-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-bold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                {stat.label}
              </div>
            </EgyptianCard>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EgyptianCard className="p-6 h-full">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-egyptian-gold" />
                {t('profile.trainer.contactInfo')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <Mail className="w-5 h-5 text-egyptian-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {t('profile.trainer.email')}
                    </div>
                    <div className="font-medium">{trainer.user.email}</div>
                  </div>
                </div>
              </div>
            </EgyptianCard>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EgyptianCard className="p-6 h-full">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-egyptian-gold" />
                {t('profile.trainer.achievements')}
              </h2>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-egyptian-gold/20 scrollbar-track-transparent">
                {trainer.certifications?.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl border border-egyptian-gold/10 bg-gradient-to-r from-egyptian-gold/5 to-transparent hover:border-egyptian-gold/30 hover:bg-egyptian-gold/10 transition-all duration-300 group cursor-pointer"
                    onClick={() => {
                      if (cert.imageUrl) {
                        setSelectedImage(cert.imageUrl);
                        setSelectedImageTitle(cert.name);
                        setIsImageDialogOpen(true);
                      }
                    }}
                  >
                    <div className="w-20 h-16 rounded-lg bg-black/40 flex items-center justify-center overflow-hidden shrink-0 border border-egyptian-gold/20 group-hover:border-egyptian-gold/40 transition-colors">
                      {cert.imageUrl ? (
                        <img
                          src={cert.imageUrl}
                          alt={cert.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Award className="w-8 h-8 text-egyptian-gold/60 group-hover:text-egyptian-gold transition-colors" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-lg group-hover:text-egyptian-gold transition-colors">
                        {cert.name}
                      </div>
                    </div>
                  </div>
                ))}
                {(!trainer.certifications ||
                  trainer.certifications.length === 0) && (
                    <div className="text-muted-foreground text-center py-8">
                      {t('profile.trainer.noCertifications')}
                    </div>
                  )}
              </div>
            </EgyptianCard>
          </motion.div>
        </div>

        {/* Transformations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <EgyptianCard className="p-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Users className="w-6 h-6 text-egyptian-gold" />
              {t('profile.trainer.transformations')}
            </h2>

            {trainer.transformations && trainer.transformations.length > 0 ? (
              <div className="px-12">
                <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {trainer.transformations.map((trans, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                      >
                        <div
                          className="group relative overflow-hidden rounded-2xl border border-egyptian-gold/20 bg-egyptian-night-light aspect-[4/5] shadow-lg cursor-pointer"
                          onClick={() => {
                            setSelectedImage(trans.imageUrl);
                            setSelectedImageTitle(trans.name);
                            setIsImageDialogOpen(true);
                          }}
                        >
                          <img
                            src={trans.imageUrl}
                            alt={trans.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-bold text-xl text-white mb-1">
                              {trans.name}
                            </h3>
                            <p className="text-xs text-egyptian-gold/80 font-medium tracking-wide uppercase">
                              {formatDistanceToNow(new Date(trans.createdAt), {
                                addSuffix: true,
                                locale: i18n.language === 'ar' ? ar : enUS,
                              })}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="border-egyptian-gold/20 text-egyptian-gold hover:bg-egyptian-gold hover:text-egyptian-night" />
                  <CarouselNext className="border-egyptian-gold/20 text-egyptian-gold hover:bg-egyptian-gold hover:text-egyptian-night" />
                </Carousel>
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-12 border-2 border-dashed border-egyptian-gold/10 rounded-3xl bg-egyptian-gold/5">
                <Users className="w-12 h-12 text-egyptian-gold/20 mx-auto mb-4" />
                {t('profile.trainer.noTransformations')}
              </div>
            )}
          </EgyptianCard>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EgyptianCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-egyptian-gold" />
                {t('reviews.review')}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({reviews.length})
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="p-6 rounded-2xl bg-egyptian-night-light border border-egyptian-gold/10 group-hover:border-egyptian-gold/30 transition-all duration-300 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-egyptian-gold/30 bg-egyptian-night flex items-center justify-center overflow-hidden shrink-0">
                              {review.trainee.user.avatar ? (
                                <img
                                  src={review.trainee.user.avatar}
                                  alt={review.trainee.user.firstName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-egyptian-gold/60" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-sm">
                                {review.trainee.user.firstName}{' '}
                                {review.trainee.user.lastName}
                              </div>
                              <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                {formatDistanceToNow(new Date(review.createdAt), {
                                  addSuffix: true,
                                  locale: i18n.language === 'ar' ? ar : enUS,
                                })}
                              </div>
                            </div>
                          </div>
                          <StarRating rating={review.rating} size={14} />
                        </div>

                        {review.comment && (
                          <div className="relative flex-grow">
                            <Quote className="w-4 h-4 text-egyptian-gold/10 absolute -left-2 -top-2" />
                            <p className="text-sm text-muted-foreground/90 italic leading-relaxed pl-4">
                              "{review.comment}"
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-egyptian-gold/10 rounded-3xl bg-egyptian-gold/5">
                    <MessageSquare className="w-12 h-12 text-egyptian-gold/20 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-muted-foreground">
                      {t('reviews.noReviews')}
                    </h3>
                    <p className="text-sm text-muted-foreground/60 max-w-xs mx-auto mt-2">
                      {t('reviews.noReviewsDesc')}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </EgyptianCard>
        </motion.div>
      </div>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl bg-egyptian-night border-egyptian-gold/20 p-0 overflow-hidden">
          <div className="relative w-full h-full max-h-[80vh] flex flex-col">
            <div className="relative flex-1 bg-black/50 flex items-center justify-center p-4">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={selectedImageTitle || ''}
                  className="max-w-full max-h-[70vh] object-contain rounded-md"
                />
              )}
            </div>
            {selectedImageTitle && (
              <div className="p-6 text-center border-t border-egyptian-gold/10 bg-egyptian-night-light">
                <h3 className="text-xl font-bold text-egyptian-gold">
                  {selectedImageTitle}
                </h3>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TrainerProfile;