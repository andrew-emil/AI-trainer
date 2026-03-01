import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  UserPlus,
  UserMinus,
  Loader2,
  Dumbbell,
  Apple,
  Filter,
  History,
  LayoutDashboard,
  ClipboardList,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianCard from '@/components/ui/EgyptianCard';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  getTraineeRequests,
  getAssignedTrainees,
  processTraineeRequest,
  unassignTrainee,
  getAllTraineesAndTheirAssignedPlans,
  getAllTraineesAndTheirAssignedNutritionPlans,
  unassignWorkoutPlan,
  unassignNutritionPlan,
} from '@/services/trainer';
import {
  TraineeRequestResponseDto,
  GetAssignedTraineesResponse,
  GetAllTraineesWithWorkoutPlans,
  GetAllTraineesWithNutritionPlans,
} from '@/types/trainer';
import { toast } from 'sonner';
import AssignWorkoutToTraineeModal from '@/components/trainer/AssignWorkoutToTraineeModal';
import AssignNutritionToTraineeModal from '@/components/trainer/AssignNutritionToTraineeModal';
import TraineeCard from '@/components/trainer/TraineeCard';

const Trainees = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const user = auth?.user;

  const [requests, setRequests] = useState<TraineeRequestResponseDto[]>([]);
  const [assignedTrainees, setAssignedTrainees] = useState<
    GetAssignedTraineesResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Nested Tabs State
  const [activeMainTab, setActiveMainTab] = useState('trainees');
  const [activeTraineeTab, setActiveTraineeTab] = useState('active');
  const [activeRequestTab, setActiveRequestTab] = useState('pending');

  const [unassigningTraineeId, setUnassigningTraineeId] = useState<
    string | null
  >(null);
  const [isUnassignDialogOpen, setIsUnassignDialogOpen] = useState(false);

  const [assignWorkoutTrainee, setAssignWorkoutTrainee] = useState<{
    id: string;
    name: string;
    currentPlanId?: string;
  } | null>(null);
  const [assignNutritionTrainee, setAssignNutritionTrainee] = useState<{
    id: string;
    name: string;
    currentPlanId?: string;
  } | null>(null);

  // Plan assignment data for filtering
  const [workoutPlanData, setWorkoutPlanData] = useState<
    GetAllTraineesWithWorkoutPlans[]
  >([]);
  const [nutritionPlanData, setNutritionPlanData] = useState<
    GetAllTraineesWithNutritionPlans[]
  >([]);
  const [planFilter, setPlanFilter] = useState<
    'all' | 'no-workout' | 'no-nutrition'
  >('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reqRes, assignedRes, workoutRes, nutritionRes] = await Promise.all(
        [
          getTraineeRequests(),
          getAssignedTrainees(),
          getAllTraineesAndTheirAssignedPlans(),
          getAllTraineesAndTheirAssignedNutritionPlans(),
        ],
      );

      if (reqRes.error || assignedRes.error) {
        toast.error(
          'Failed to fetch data: ' +
            (reqRes.error?.message ||
              assignedRes.error?.message ||
              'Server Error'),
        );
      }

      if (reqRes.data) setRequests(reqRes.data);
      if (assignedRes.data) setAssignedTrainees(assignedRes.data);
      if (workoutRes.data) setWorkoutPlanData(workoutRes.data);
      if (nutritionRes.data) setNutritionPlanData(nutritionRes.data);
    } catch (error) {
      toast.error('Failed to fetch trainees data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProcessRequest = async (reqId: string, approve: boolean) => {
    try {
      const { error } = await processTraineeRequest(reqId, approve);
      if (error) {
        toast.error(error.message || 'Failed to process request');
      } else {
        toast.success(approve ? 'Request approved' : 'Request rejected');
        fetchData();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleUnassign = async () => {
    if (!unassigningTraineeId) return;
    try {
      const { error } = await unassignTrainee(unassigningTraineeId);
      if (error) {
        toast.error(error.message || 'Failed to unassign trainee');
      } else {
        toast.success('Trainee unassigned');
        fetchData();
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsUnassignDialogOpen(false);
      setUnassigningTraineeId(null);
    }
  };

  const activeAssigned = assignedTrainees.filter(
    (item) => item.membershipStatus === 'active',
  );
  const finishedAssigned = assignedTrainees.filter(
    (item) => item.membershipStatus === 'inactive',
  );

  const filterTraineeItems = (items: GetAssignedTraineesResponse[]) => {
    return items
      .filter(
        (item) =>
          item.trainee.user.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.trainee.user.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.trainee.user.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
      .filter((item) => {
        if (planFilter === 'all') return true;

        const traineeId = item.traineeId;
        const hasWorkoutPlan = workoutPlanData.some(
          (wp) => wp.trainee.userId === traineeId && wp.assignedPlan !== null,
        );
        const hasNutritionPlan = nutritionPlanData.some(
          (np) => np.trainee.userId === traineeId && np.assignedPlan !== null,
        );

        if (planFilter === 'no-workout') return !hasWorkoutPlan;
        if (planFilter === 'no-nutrition') return !hasNutritionPlan;

        return true;
      });
  };

  const filteredAssigned = filterTraineeItems(activeAssigned);
  const filteredFinished = filterTraineeItems(finishedAssigned);

  // Filter requests based on sub-tab and search
  const displayRequests = requests.filter(
    (r) =>
      r.status === activeRequestTab &&
      r.traineeName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderRequestCard = (req: TraineeRequestResponseDto, index: number) => (
    <motion.div
      key={req.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <EgyptianCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Link
            to={`/trainees/${req.traineeId}`}
            className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
          >
            <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden text-primary font-heading text-xl font-bold">
              {req.traineeName.charAt(0)}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {req.traineeName}
              </h3>
              <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(req.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
          <Badge
            className={cn(
              req.status === 'pending'
                ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                : req.status === 'approved'
                  ? 'bg-green-500/20 text-green-500 border-green-500/30'
                  : req.status === 'rejected'
                    ? 'bg-destructive/20 text-destructive border-destructive/30'
                    : 'bg-muted/20 text-muted-foreground border-border/30',
            )}
          >
            {req.status === 'pending'
              ? t('trainees.labels.pending')
              : req.status === 'approved'
                ? t('trainees.labels.approved') || 'Approved'
                : req.status === 'rejected'
                  ? t('trainees.labels.rejected') || 'Rejected'
                  : t('trainees.labels.cancelled') || 'Cancelled'}
          </Badge>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-body text-xs text-muted-foreground mb-1">
                {t('trainees.labels.requestedSessions')}
              </p>
              <p className="font-heading font-bold text-foreground">
                {req.sessionsCount}
              </p>
            </div>
            {req.respondedAt && (
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">
                  {t('trainees.labels.respondedAt') || 'Responded At'}
                </p>
                <p className="font-heading font-bold text-foreground">
                  {new Date(req.respondedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {req.status === 'pending' && (
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProcessRequest(req.id, false)}
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <XCircle className="w-4 h-4 me-2" />
              {t('trainees.buttons.reject')}
            </Button>
            <Button
              size="sm"
              className="btn-pharaoh"
              onClick={() => handleProcessRequest(req.id, true)}
            >
              <CheckCircle2 className="w-4 h-4 me-2" />
              {t('trainees.buttons.approve')}
            </Button>
          </div>
        )}
      </EgyptianCard>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('trainees.title')}{' '}
              <span className="text-gradient-gold">
                {t('trainees.titleHighlight')}
              </span>
            </h1>
            <p className="font-body text-muted-foreground">
              {t('trainees.subtitleFull')}
            </p>
          </motion.div>
        </div>

        <EgyptianDivider />

        {/* Main Tabs: Trainees | Requests */}
        <Tabs
          value={activeMainTab}
          onValueChange={setActiveMainTab}
          className="w-full"
        >
          <TabsList className="bg-card border border-border/30 mb-8 p-1 w-full max-w-sm">
            <TabsTrigger
              value="trainees"
              className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              <Users className="w-4 h-4 me-2" />
              {t('trainees.sections.trainees') || 'Trainees'}
              <Badge
                variant="secondary"
                className="ml-2 bg-primary/10 text-primary border-primary/20"
              >
                {assignedTrainees.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="flex-1 data-[state=active]:bg-egyptian-gold/20 data-[state=active]:text-egyptian-gold"
            >
              <ClipboardList className="w-4 h-4 me-2" />
              {t('trainees.sections.requests') || 'Requests'}
              <Badge
                variant="secondary"
                className="ml-2 bg-egyptian-gold/10 text-egyptian-gold border-egyptian-gold/20"
              >
                {requests.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Search Bar - Shared across all tabs */}
          <div className="mb-6 relative max-w-md">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('trainees.searchPlaceholder')}
              className="ps-10 bg-card border-border/50 text-foreground h-11"
            />
          </div>

          <TabsContent value="trainees" className="space-y-6">
            {/* Trainee Sub-Tabs: Active | Finished */}
            <Tabs
              value={activeTraineeTab}
              onValueChange={setActiveTraineeTab}
              className="w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <TabsList className="bg-muted/20 border border-border/20 p-1">
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 me-2" />
                    {t('trainees.tabs.activeMembership') || 'Active'}
                    <span className="ms-2 opacity-60">
                      ({activeAssigned.length})
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="finished"
                    className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500 text-sm"
                  >
                    <History className="w-3 h-3 me-2" />
                    {t('trainees.tabs.finishedMembership') || 'Finished'}
                    <span className="ms-2 opacity-60">
                      ({finishedAssigned.length})
                    </span>
                  </TabsTrigger>
                </TabsList>

                {/* Plan Filters - Only show for Active Trainees */}
                {activeTraineeTab === 'active' && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={planFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setPlanFilter('all')}
                      className={
                        planFilter === 'all'
                          ? 'btn-pharaoh h-9'
                          : 'border-border/50 text-foreground h-9'
                      }
                    >
                      <Users className="w-4 h-4 me-2" />
                      {t('trainees.filters.allTrainees')}
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        planFilter === 'no-workout' ? 'default' : 'outline'
                      }
                      onClick={() => setPlanFilter('no-workout')}
                      className={
                        planFilter === 'no-workout'
                          ? 'bg-primary/90 hover:bg-primary h-9'
                          : 'border-border/50 text-foreground h-9'
                      }
                    >
                      <Dumbbell className="w-4 h-4 me-2" />
                      {t('trainees.filters.noWorkoutPlan')}
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        planFilter === 'no-nutrition' ? 'default' : 'outline'
                      }
                      onClick={() => setPlanFilter('no-nutrition')}
                      className={
                        planFilter === 'no-nutrition'
                          ? 'bg-green-600 hover:bg-green-700 h-9'
                          : 'border-border/50 text-foreground h-9'
                      }
                    >
                      <Apple className="w-4 h-4 me-2" />
                      {t('trainees.filters.noNutritionPlan')}
                    </Button>
                  </div>
                )}
              </div>

              <TabsContent value="active" className="space-y-6 m-0">
                <AnimatePresence mode="popLayout">
                  {loading && activeAssigned.length === 0 ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
                    </div>
                  ) : filteredAssigned.length === 0 ? (
                    <EgyptianCard
                      className="text-center py-12"
                      hoverable={false}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
                        <Users className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {t('trainees.messages.noAssignedTrainees')}
                      </h3>
                    </EgyptianCard>
                  ) : (
                    <div className="grid gap-6">
                      {filteredAssigned.map((item, index) => (
                        <TraineeCard
                          key={item.id}
                          item={item}
                          index={index}
                          workoutPlanData={workoutPlanData}
                          nutritionPlanData={nutritionPlanData}
                          onAssignWorkout={setAssignWorkoutTrainee}
                          onAssignNutrition={setAssignNutritionTrainee}
                          onUnassign={(id) => {
                            setUnassigningTraineeId(id);
                            setIsUnassignDialogOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="finished" className="space-y-6 m-0">
                <AnimatePresence mode="popLayout">
                  {loading && finishedAssigned.length === 0 ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
                    </div>
                  ) : filteredFinished.length === 0 ? (
                    <EgyptianCard
                      className="text-center py-12"
                      hoverable={false}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
                        <History className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {t('trainees.messages.noFinishedTrainees') ||
                          'No trainees with finished memberships found.'}
                      </h3>
                    </EgyptianCard>
                  ) : (
                    <div className="grid gap-6">
                      {filteredFinished.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <EgyptianCard>
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <Link
                                to={`/trainees/${item.traineeId}`}
                                className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
                              >
                                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                                  {item.trainee.user.avatar ? (
                                    <img
                                      src={item.trainee.user.avatar}
                                      alt="Avatar"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="font-heading text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                                      {item.trainee.user.firstName.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                    {item.trainee.user.firstName}{' '}
                                    {item.trainee.user.lastName}
                                  </h3>
                                  <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {item.trainee.user.email}
                                  </p>
                                </div>
                              </Link>
                              <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                                {t('traineeDetail.inactive')}
                              </Badge>
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-body text-xs text-muted-foreground mb-1">
                                    {t('trainees.labels.sessions')}
                                  </p>
                                  <p className="font-heading font-bold text-foreground">
                                    {item.sessionsCount}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-wrap justify-end gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-destructive/30 text-destructive hover:bg-destructive/10"
                                onClick={() => {
                                  setUnassigningTraineeId(item.traineeId);
                                  setIsUnassignDialogOpen(true);
                                }}
                              >
                                <UserMinus className="w-4 h-4 me-2" />
                                {t('trainees.buttons.unassign')}
                              </Button>
                            </div>
                          </EgyptianCard>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            {/* Request Sub-Tabs: Pending | Approved | Rejected */}
            <Tabs
              value={activeRequestTab}
              onValueChange={setActiveRequestTab}
              className="w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <TabsList className="bg-muted/20 border border-border/20 p-1">
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-500 text-sm"
                  >
                    <Clock className="w-3 h-3 me-2" />
                    {t('trainees.labels.pending') || 'Pending'}
                    <span className="ms-2 opacity-60">
                      ({requests.filter((r) => r.status === 'pending').length})
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="approved"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 text-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 me-2" />
                    {t('trainees.labels.approved') || 'Approved'}
                    <span className="ms-2 opacity-60">
                      ({requests.filter((r) => r.status === 'approved').length})
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="rejected"
                    className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive text-sm"
                  >
                    <XCircle className="w-3 h-3 me-2" />
                    {t('trainees.labels.rejected') || 'Rejected'}
                    <span className="ms-2 opacity-60">
                      ({requests.filter((r) => r.status === 'rejected').length})
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cancelled_by_the_trainee"
                    className="data-[state=active]:bg-muted/20 data-[state=active]:text-muted-foreground text-sm"
                  >
                    <XCircle className="w-3 h-3 me-2 rotate-45" />
                    {t('trainees.labels.cancelled') || 'Cancelled'}
                    <span className="ms-2 opacity-60">
                      (
                      {
                        requests.filter(
                          (r) => r.status === 'cancelled_by_the_trainee',
                        ).length
                      }
                      )
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="popLayout">
                {loading && requests.length === 0 ? (
                  <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
                  </div>
                ) : displayRequests.length === 0 ? (
                  <EgyptianCard className="text-center py-12" hoverable={false}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
                      {activeRequestTab === 'pending' ? (
                        <Clock className="w-8 h-8 text-muted-foreground" />
                      ) : activeRequestTab === 'approved' ? (
                        <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                      ) : activeRequestTab === 'rejected' ? (
                        <XCircle className="w-8 h-8 text-muted-foreground" />
                      ) : (
                        <XCircle className="w-8 h-8 text-muted-foreground rotate-45" />
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {activeRequestTab === 'pending'
                        ? t('trainees.messages.noPendingRequests')
                        : activeRequestTab === 'approved'
                          ? t('trainees.messages.noApprovedRequests')
                          : activeRequestTab === 'rejected'
                            ? t('trainees.messages.noRejectedRequests')
                            : t('trainees.messages.noCancelledRequests') ||
                              'No cancelled requests.'}
                    </h3>
                  </EgyptianCard>
                ) : (
                  <div className="grid gap-6">
                    {displayRequests.map((req, index) =>
                      renderRequestCard(req, index),
                    )}
                  </div>
                )}
              </AnimatePresence>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Unassign Confirmation Dialog */}
        <AlertDialog
          open={isUnassignDialogOpen}
          onOpenChange={setIsUnassignDialogOpen}
        >
          <AlertDialogContent className="bg-egyptian-night border-egyptian-gold/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading text-xl text-foreground flex items-center gap-2">
                <UserMinus className="w-5 h-5 text-destructive" />
                {t('trainees.unassignDialog.title')}
              </AlertDialogTitle>
              <AlertDialogDescription className="font-body text-muted-foreground">
                {t('trainees.unassignDialog.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel className="bg-transparent border-egyptian-gold/20 text-foreground hover:bg-egyptian-gold/10">
                {t('common.cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleUnassign}
                className="bg-destructive text-white hover:bg-destructive/90 border-none"
              >
                {t('trainees.unassignDialog.confirmButton')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Assignment Modals */}
        <AssignWorkoutToTraineeModal
          isOpen={!!assignWorkoutTrainee}
          onClose={() => setAssignWorkoutTrainee(null)}
          traineeId={assignWorkoutTrainee?.id || ''}
          traineeName={assignWorkoutTrainee?.name || ''}
          currentPlanId={assignWorkoutTrainee?.currentPlanId}
          onSuccess={fetchData}
        />
        <AssignNutritionToTraineeModal
          isOpen={!!assignNutritionTrainee}
          onClose={() => setAssignNutritionTrainee(null)}
          traineeId={assignNutritionTrainee?.id || ''}
          traineeName={assignNutritionTrainee?.name || ''}
          currentPlanId={assignNutritionTrainee?.currentPlanId}
          onSuccess={fetchData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Trainees;
