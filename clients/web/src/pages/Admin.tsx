import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  FileText,
  Mail,
  User as UserIcon,
  Users as UsersIcon,
  Filter,
  Eye,
  Dumbbell,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  approveTrainerRequest,
  rejectTrainerRequest,
  activateTrainer,
  deactivateTrainer,
  activateTrainee,
  deactivateTrainee,
} from '@/services/admin';
import { trainerRequestsQuery, usersQuery } from '@/lib/queries/admin.query';
import { trainersQuery } from '@/lib/queries/trainer.query';
import { toast } from 'sonner';
import { TrainerRequestStatus, UserRole } from '@/types/entities';
import { useNavigate } from 'react-router';
import { RejectRequestDialog } from '@/components/admin/RejectRequestDialog';

const Admin = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('requests');
  const [requestFilter, setRequestFilter] = useState<string | undefined>(
    undefined,
  );

  // Queries
  const { data: requestsData, isLoading: isLoadingRequests } = useQuery(
    trainerRequestsQuery(requestFilter),
  );
  const { data: usersData, isLoading: isLoadingUsers } = useQuery(usersQuery());
  const { data: trainersData, isLoading: isLoadingTrainers } =
    useQuery(trainersQuery()); // Fetch all trainers

  const requests = requestsData?.data || [];
  const allUsers = usersData?.data || [];
  const allTrainers = trainersData?.data || [];

  // Mutations
  const approveMutation = useMutation({
    mutationFn: approveTrainerRequest,
    onSuccess: () => {
      toast.success(t('admin.requests.approveSuccess'));
      queryClient.invalidateQueries({ queryKey: ['trainerRequests'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['allTrainers'] });
    },
    onError: () => toast.error(t('admin.requests.approveError')),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      rejectTrainerRequest(id, { adminNote: note }),
    onSuccess: () => {
      toast.success(t('admin.requests.rejectSuccess'));
      queryClient.invalidateQueries({ queryKey: ['trainerRequests'] });
    },
    onError: () => toast.error(t('admin.requests.rejectError')),
  });

  const userActionMutation = useMutation({
    mutationFn: async ({
      id,
      role,
      action,
    }: {
      id: string;
      role: UserRole;
      action: 'activate' | 'deactivate';
    }) => {
      if (role === UserRole.trainer) {
        return action === 'activate'
          ? activateTrainer(id)
          : deactivateTrainer(id);
      } else {
        return action === 'activate'
          ? activateTrainee(id)
          : deactivateTrainee(id);
      }
    },
    onSuccess: () => {
      toast.success(t('admin.users.actionSuccess'));
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['allTrainers'] });
    },
    onError: () => toast.error(t('admin.users.actionError')),
  });

  const filteredUsers = allUsers.filter(
    (u) =>
      u.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredTrainers = allTrainers.filter(
    (t) =>
      t.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('admin.title')}{' '}
            <span className="text-gradient-gold">
              {t('admin.titleHighlight')}
            </span>
          </h1>
          <p className="font-body text-muted-foreground">
            {t('admin.subtitle')}
          </p>
        </motion.div>

        <EgyptianDivider />

        <Tabs
          defaultValue="requests"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-card border border-border/30 mb-8 p-1">
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <FileText className="w-4 h-4 me-2" />
              {t('admin.tabs.trainerRequests')}
            </TabsTrigger>
            <TabsTrigger
              value="trainers"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Dumbbell className="w-4 h-4 me-2" />
              {t('admin.tabs.trainers')}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <UsersIcon className="w-4 h-4 me-2" />
              {t('admin.tabs.userManagement')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant={requestFilter === undefined ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRequestFilter(undefined)}
                className={requestFilter === undefined ? 'btn-pharaoh' : ''}
              >
                {t('common.all')}
              </Button>
              <Button
                variant={
                  requestFilter === TrainerRequestStatus.pending
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                onClick={() => setRequestFilter(TrainerRequestStatus.pending)}
                className={
                  requestFilter === TrainerRequestStatus.pending
                    ? 'btn-pharaoh'
                    : ''
                }
              >
                {t('admin.requests.pending')}
              </Button>
              <Button
                variant={
                  requestFilter === TrainerRequestStatus.approved
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                onClick={() => setRequestFilter(TrainerRequestStatus.approved)}
                className={
                  requestFilter === TrainerRequestStatus.approved
                    ? 'btn-pharaoh'
                    : ''
                }
              >
                {t('admin.requests.approved')}
              </Button>
              <Button
                variant={
                  requestFilter === TrainerRequestStatus.rejected
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                onClick={() => setRequestFilter(TrainerRequestStatus.rejected)}
                className={
                  requestFilter === TrainerRequestStatus.rejected
                    ? 'btn-pharaoh'
                    : ''
                }
              >
                {t('admin.requests.rejected')}
              </Button>
            </div>

            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {isLoadingRequests ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('common.loading')}
                  </div>
                ) : requests.length === 0 ? (
                  <EgyptianCard className="text-center py-12" hoverable={false}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {t('admin.requests.noRequests')}
                    </h3>
                  </EgyptianCard>
                ) : (
                  requests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <EgyptianCard>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                              {request.user.avatar ? (
                                <img
                                  src={request.user.avatar}
                                  alt="Avatar"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="font-heading text-xl font-bold text-primary">
                                  {request.user.firstName.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-heading text-lg font-bold text-foreground">
                                {request.user.firstName} {request.user.lastName}
                              </h3>
                              <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {request.user.email}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              request.status === TrainerRequestStatus.approved
                                ? 'bg-green-500/20 text-green-500 border-green-500/30'
                                : request.status ===
                                    TrainerRequestStatus.rejected
                                  ? 'bg-destructive/20 text-destructive border-destructive/30'
                                  : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                            }
                          >
                            {t(`admin.requests.${request.status}`)}
                          </Badge>
                        </div>

                        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
                          <p className="font-heading text-sm font-bold text-foreground mb-2">
                            {t('auth.register.bio')}
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            {request.user.trainer?.bio || 'No bio provided'}
                          </p>
                          <div className="mt-4 flex gap-4">
                            <div>
                              <p className="font-body text-xs text-muted-foreground">
                                {t('auth.register.experienceYears')}
                              </p>
                              <p className="font-heading font-bold text-foreground">
                                {request.user.trainer?.experienceYears}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(`/admin/trainer-requests/${request.id}`)
                            }
                          >
                            <Eye className="w-4 h-4 me-2" />
                            {t('admin.requests.viewDetails')}
                          </Button>
                          {request.status === TrainerRequestStatus.pending && (
                            <>
                              <RejectRequestDialog
                                isLoading={rejectMutation.isPending}
                                onConfirm={(note) =>
                                  rejectMutation.mutate({
                                    id: request.id,
                                    note,
                                  })
                                }
                              />
                              <Button
                                size="sm"
                                className="btn-pharaoh"
                                onClick={() =>
                                  approveMutation.mutate(request.id)
                                }
                              >
                                <CheckCircle2 className="w-4 h-4 me-2" />
                                {t('admin.requests.approve')}
                              </Button>
                            </>
                          )}
                        </div>
                      </EgyptianCard>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="trainers" className="space-y-6">
            <div className="relative">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trainers..."
                className="ps-12 bg-card border-border/50 text-foreground h-12"
              />
            </div>
            <div className="grid gap-4">
              {isLoadingTrainers ? (
                <div className="text-center py-12 text-muted-foreground">
                  {t('common.loading')}
                </div>
              ) : (
                filteredTrainers.map((trainer, index) => (
                  <motion.div
                    key={trainer.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <EgyptianCard>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                            {trainer.user.avatar ? (
                              <img
                                src={trainer.user.avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-foreground">
                              {trainer.user.firstName} {trainer.user.lastName}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground">
                              @{trainer.user.username} • {trainer.user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-end">
                            <Badge
                              variant={trainer.isActive ? 'default' : 'outline'}
                              className={trainer.isActive ? 'bg-green-600' : ''}
                            >
                              {trainer.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-primary/30 text-primary hover:bg-primary/10"
                              onClick={() =>
                                userActionMutation.mutate({
                                  id: trainer.userId,
                                  role: UserRole.trainer,
                                  action: 'activate',
                                })
                              }
                              disabled={trainer.isActive}
                            >
                              <UserCheck className="w-4 h-4 me-2" />
                              Activate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() =>
                                userActionMutation.mutate({
                                  id: trainer.userId,
                                  role: UserRole.trainer,
                                  action: 'deactivate',
                                })
                              }
                              disabled={!trainer.isActive}
                            >
                              <UserX className="w-4 h-4 me-2" />
                              Deactivate
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/30">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground mr-2 block text-xs">
                              Experience
                            </span>
                            <span className="font-medium">
                              {trainer.experienceYears} years
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-2 block text-xs">
                              Rank Score
                            </span>
                            <span className="font-medium">
                              {(trainer.rankScore * 10).toFixed(1)}
                            </span>
                          </div>
                        </div>
                        {trainer.bio && (
                          <div className="mt-3 pt-3 border-t border-border/30">
                            <span className="text-muted-foreground block text-xs mb-1">
                              Bio
                            </span>
                            <p className="text-sm text-foreground line-clamp-2">
                              {trainer.bio}
                            </p>
                          </div>
                        )}
                      </div>
                    </EgyptianCard>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="relative">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('admin.users.searchPlaceholder')}
                className="ps-12 bg-card border-border/50 text-foreground h-12"
              />
            </div>

            <div className="grid gap-4">
              {isLoadingUsers ? (
                <div className="text-center py-12 text-muted-foreground">
                  {t('common.loading')}
                </div>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <EgyptianCard>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-foreground">
                              {user.firstName} {user.lastName}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground">
                              @{user.username} • {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-end">
                            <Badge variant="outline" className="mb-1">
                              {t(`roles.${user.role}`)}
                            </Badge>
                          </div>

                          {/* Placeholder for activation status if we had it in SafeUser */}
                          {/* For now, we'll just show the buttons as if they could be toggled */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-primary/30 text-primary hover:bg-primary/10"
                              onClick={() =>
                                userActionMutation.mutate({
                                  id: user.id,
                                  role: user.role,
                                  action: 'activate',
                                })
                              }
                            >
                              <UserCheck className="w-4 h-4 me-2" />
                              {t('admin.users.activate')}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() =>
                                userActionMutation.mutate({
                                  id: user.id,
                                  role: user.role,
                                  action: 'deactivate',
                                })
                              }
                            >
                              <UserX className="w-4 h-4 me-2" />
                              {t('admin.users.deactivate')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </EgyptianCard>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
