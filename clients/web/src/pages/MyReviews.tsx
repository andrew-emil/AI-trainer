import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Star,
  Edit,
  Trash2,
  Calendar,
  User,
  MessageSquare,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import StarRating from '@/components/ui/StarRating';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  getReviewsForTrainee,
  updateReview,
  deleteReview,
} from '@/services/trainee';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const MyReviews = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const user = auth?.user;
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [user?.id]);

  const fetchReviews = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const { data } = await getReviewsForTrainee();
      if (data) setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error(t('reviews.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (review: any) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment || '');
    setIsEditDialogOpen(true);
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;
    try {
      setSubmitting(true);
      await updateReview(editingReview.id, {
        rating: editRating,
        comment: editComment,
      });
      toast.success(t('reviews.reviewUpdateSuccess'));
      setIsEditDialogOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error(t('reviews.reviewUpdateError'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (reviewId: string) => {
    setDeletingReviewId(reviewId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingReviewId) return;
    try {
      setSubmitting(true);
      await deleteReview(deletingReviewId);
      toast.success(t('reviews.reviewDeleteSuccess'));
      setIsDeleteDialogOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error(t('reviews.reviewDeleteError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            {t('reviews.title')}{' '}
            <span className="text-egyptian-gold">
              {t('reviews.titleHighlight')}
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">{t('reviews.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <EgyptianCard className="h-full flex flex-col group overflow-hidden border-egyptian-gold/10 hover:border-egyptian-gold/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full border-2 border-egyptian-gold bg-egyptian-night flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500">
                          {review.trainer?.user?.avatar ? (
                            <img
                              src={review.trainer.user.avatar}
                              alt={review.trainer.user.firstName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-7 h-7 text-egyptian-gold" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-egyptian-gold transition-colors duration-300 line-clamp-1">
                            {review.trainer?.user?.firstName}{' '}
                            {review.trainer?.user?.lastName}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="w-3.5 h-3.5 text-egyptian-gold/60" />
                            {format(new Date(review.createdAt), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 px-1">
                        <StarRating rating={review.rating} size={20} />
                      </div>

                      <div className="relative mb-6 flex-grow p-4 rounded-xl bg-egyptian-night-light border border-egyptian-gold/5 group-hover:border-egyptian-gold/10 transition-colors duration-300">
                        <MessageSquare className="w-4 h-4 text-egyptian-gold/30 absolute -left-1 -top-1" />
                        <p className="text-sm text-muted-foreground/90 pl-2 italic leading-relaxed">
                          "{review.comment}"
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 mt-auto pt-4 border-t border-egyptian-gold/10">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-egyptian-gold transition-colors duration-300"
                          onClick={() => handleEditClick(review)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          {t('common.edit')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-red-500 transition-colors duration-300"
                          onClick={() => handleDeleteClick(review.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t('common.delete')}
                        </Button>
                      </div>
                    </div>
                  </EgyptianCard>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-20 h-20 rounded-full bg-egyptian-gold/10 flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-egyptian-gold/30">
                  <Star className="w-10 h-10 text-egyptian-gold/30" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t('reviews.noReviews')}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t('reviews.noReviewsDesc')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-egyptian-night border-egyptian-gold/30 sm:max-w-[480px] max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
            <div className="sticky top-0 z-10 bg-egyptian-night pt-6 pb-2 border-b border-egyptian-gold/10">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light bg-clip-text text-transparent">
                  {t('reviews.editReview')}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground/70 text-sm">
                  {t('reviews.editReviewDesc')}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <label className="text-egyptian-gold font-medium text-sm">
                  {t('reviews.rating')}
                </label>
                <div className="p-4 rounded-xl bg-black border border-egyptian-gold/10 flex justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                  <StarRating
                    rating={editRating}
                    interactive
                    onRatingChange={setEditRating}
                    size={32}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-egyptian-gold font-medium text-sm">
                  {t('reviews.comment')}
                </label>
                <Textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  placeholder={t('reviews.commentPlaceholder')}
                  className="bg-black border-egyptian-gold/10 focus:border-egyptian-gold/40 min-h-[100px] transition-all duration-300 text-white placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-2 pb-4 pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={submitting}
                className="text-muted-foreground hover:text-white"
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleUpdateReview}
                disabled={submitting || editRating === 0}
                className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-light text-egyptian-night hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500 font-bold h-11 px-6 shadow-egyptian-gold/10"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Edit className="w-4 h-4 mr-2" />
                )}
                {t('reviews.updateReview')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-egyptian-night border-red-500/30">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-red-500">
                {t('reviews.deleteReview')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t('reviews.deleteReviewDesc')}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2 sm:gap-0 mt-6">
              <Button
                variant="ghost"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={submitting}
                className="text-muted-foreground hover:text-white"
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleConfirmDelete}
                disabled={submitting}
                className="bg-red-500 text-white hover:bg-red-600 font-bold"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                {t('common.delete')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MyReviews;
