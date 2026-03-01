import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { trainerRequestQuery } from '@/lib/queries/admin.query';
import { approveTrainerRequest, rejectTrainerRequest } from '@/services/admin';
import { TrainerRequestStatus } from '@/types/entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  User,
  XCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { RejectRequestDialog } from '@/components/admin/RejectRequestDialog';

const TrainerRequestDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Query
  // Query
  const { data: requestData, isLoading } = useQuery(
    trainerRequestQuery(id || ''),
  );
  const request = requestData?.data;

  // Mutations
  const approveMutation = useMutation({
    mutationFn: approveTrainerRequest,
    onSuccess: () => {
      toast.success(t('admin.requests.approveSuccess'));
      queryClient.invalidateQueries({ queryKey: ['trainerRequests'] });
      queryClient.invalidateQueries({ queryKey: ['trainerRequest', id] });
      navigate('/admin');
    },
    onError: () => toast.error(t('admin.requests.approveError')),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      rejectTrainerRequest(id, { adminNote: note }),
    onSuccess: () => {
      toast.success(t('admin.requests.rejectSuccess'));
      queryClient.invalidateQueries({ queryKey: ['trainerRequests'] });
      queryClient.invalidateQueries({ queryKey: ['trainerRequest', id] });
      navigate('/admin');
    },
    onError: () => toast.error(t('admin.requests.rejectError')),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!request) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold">{t('common.notFound')}</h2>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Back Button */}
        <div>
          <Button
            variant="ghost"
            className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('admin.requests.backToAll')}
          </Button>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-heading text-3xl font-bold text-foreground">
                {t('admin.requests.detailsTitle')}
              </h1>
              <Badge
                className={
                  request.status === TrainerRequestStatus.approved
                    ? 'bg-green-500/20 text-green-500 border-green-500/30'
                    : request.status === TrainerRequestStatus.rejected
                      ? 'bg-destructive/20 text-destructive border-destructive/30'
                      : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                }
              >
                {t(`admin.requests.${request.status}`)}
              </Badge>
            </div>
            <div className="flex gap-3">
              {request.status === TrainerRequestStatus.pending && (
                <>
                  <RejectRequestDialog
                    isLoading={rejectMutation.isPending}
                    onConfirm={(note) =>
                      rejectMutation.mutate({ id: request.id, note })
                    }
                  />
                  <Button
                    className="btn-pharaoh"
                    onClick={() => approveMutation.mutate(request.id)}
                  >
                    <CheckCircle2 className="me-2 h-4 w-4" />
                    {t('admin.requests.approve')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <EgyptianDivider />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column: User Profile info */}
          <div className="md:col-span-1 space-y-6">
            <EgyptianCard>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 bg-muted">
                  {request.user.avatar ? (
                    <img
                      src={request.user.avatar}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                      <User className="h-16 w-16 text-primary" />
                    </div>
                  )}
                </div>
                <h2 className="font-heading text-xl font-bold">
                  {request.user.firstName} {request.user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  @{request.user.username || 'username'}
                </p>

                <div className="mt-6 w-full space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{request.user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>
                      {request.user.trainer?.experienceYears}{' '}
                      {t('auth.register.experienceYears')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </EgyptianCard>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <EgyptianCard>
              <h3 className="font-heading text-lg font-bold mb-4">
                {t('auth.register.bio')}
              </h3>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {request.user.trainer?.bio || 'No bio provided'}
              </p>
            </EgyptianCard>

            {/* Certifications */}
            <EgyptianCard>
              <h3 className="font-heading text-lg font-bold mb-4">
                {t('auth.register.certificates')}
              </h3>
              {!request.certifications ||
              request.certifications.length === 0 ? (
                <p className="text-muted-foreground">
                  {t('auth.register.noCertificates')}
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {request.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={cert.imageUrl}
                          alt={cert.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold">{cert.name}</h4>
                        {cert.issuedBy && (
                          <p className="text-xs text-muted-foreground">
                            {cert.issuedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </EgyptianCard>

            {/* Transformations */}
            <EgyptianCard>
              <h3 className="font-heading text-lg font-bold mb-4">
                {t('auth.register.transformations')}
              </h3>
              {!request.transformations ||
              request.transformations.length === 0 ? (
                <p className="text-muted-foreground">
                  {t('auth.register.noTransformations')}
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {request.transformations.map((trans) => (
                    <div
                      key={trans.id}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={trans.imageUrl}
                          alt={trans.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold">{trans.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </EgyptianCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerRequestDetails;
