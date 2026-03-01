import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Dumbbell, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useTrainerWorkoutPlans,
  useDeleteWorkoutPlan,
} from '@/hooks/useWorkoutPlans';
import { WorkoutPlan } from '@/types/entities';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkoutPlanCard from '@/components/workout/WorkoutPlanCard';
import CreatePlanModal from '@/components/workout/CreatePlanModal';
import AssignPlanModal from '@/components/workout/AssignPlanModal';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
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
import { useNavigate } from 'react-router-dom';
import {
  getAllTraineesAndTheirAssignedPlans,
  getAssignedTrainees,
} from '@/services/trainer';
import {
  GetAllTraineesWithWorkoutPlans,
  GetAssignedTraineesResponse,
} from '@/types/trainer';

const WorkoutPlans = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Use backend hooks
  const { data: workoutPlans = [], isLoading } = useTrainerWorkoutPlans();
  const deletePlanMutation = useDeleteWorkoutPlan();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [assigningPlan, setAssigningPlan] = useState<WorkoutPlan | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

  // Stats data
  const [traineeData, setTraineeData] = useState<
    GetAllTraineesWithWorkoutPlans[]
  >([]);
  const [allTrainees, setAllTrainees] = useState<GetAssignedTraineesResponse[]>(
    [],
  );
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStatsData = async () => {
      setStatsLoading(true);
      try {
        const [traineePlansRes, allTraineesRes] = await Promise.all([
          getAllTraineesAndTheirAssignedPlans(),
          getAssignedTrainees(),
        ]);

        if (traineePlansRes.data) setTraineeData(traineePlansRes.data);
        if (allTraineesRes.data) setAllTrainees(allTraineesRes.data);
      } catch (error) {
        console.error('Failed to fetch stats data:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStatsData();
  }, []);

  // Calculate stats
  const totalActiveTrainees = allTrainees.length;
  const totalPlans = workoutPlans.length;
  const traineesWithWorkoutPlan = traineeData.filter(
    (item) => item.assignedPlan !== null,
  ).length;
  const traineesWithoutWorkoutPlan =
    totalActiveTrainees - traineesWithWorkoutPlan;

  // Filter plans mostly client-side for now, but backend has search too
  const filteredPlans = workoutPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // view edit delete
  function handleView(id: string) {
    navigate(`/workout-plans/${id}`);
  }
  const handleEdit = (plan: WorkoutPlan) => {
    setEditingPlan(plan);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (planId: string) => {
    setDeletingPlanId(planId);
  };

  const confirmDelete = async () => {
    if (deletingPlanId) {
      try {
        await deletePlanMutation.mutateAsync(deletingPlanId);
        toast({
          title: 'Success',
          description: 'Workout plan deleted successfully',
        });
        setDeletingPlanId(null);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete workout plan',
          variant: 'destructive',
        });
      }
    }
  };

  // ending view edit delete

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditingPlan(null);
  };

  const stats = [
    {
      labelKey: 'workoutPlans.stats.activeTrainees',
      value: totalActiveTrainees,
      icon: Users,
    },
    {
      labelKey: 'workoutPlans.stats.totalPlans',
      value: totalPlans,
      icon: Dumbbell,
    },
    {
      labelKey: 'workoutPlans.stats.traineesWithoutPlan',
      value: traineesWithoutWorkoutPlan,
      icon: Users,
    },
    {
      labelKey: 'workoutPlans.stats.traineesWithPlan',
      value: traineesWithWorkoutPlan,
      icon: Dumbbell,
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <p className="text-muted-foreground">Loading workout plans...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('workoutPlans.title')}{' '}
              <span className="text-gradient-gold">
                {t('workoutPlans.titleHighlight')}
              </span>
            </h1>
            <p className="font-body text-muted-foreground">
              {t('workoutPlans.subtitle')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-pharaoh"
            >
              <Plus className="w-5 h-5 me-2" />
              {t('workoutPlans.createPlan')}
            </Button>
          </div>
        </motion.div>

        <EgyptianDivider />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('workoutPlans.searchPlaceholder')}
            className="ps-12 bg-card border-border/50 text-foreground h-12"
          />
        </div>

        {/* Plans Grid */}
        {filteredPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="relative group">
                <WorkoutPlanCard
                  plan={plan}
                  showTrainerActions
                  onView={() => handleView(plan.id)}
                  onEdit={() => handleEdit(plan)}
                  onDelete={() => handleDelete(plan.id)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAssigningPlan(plan);
                  }}
                  className="absolute top-4 end-4 z-10 border-primary/30 text-primary hover:bg-primary/10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Users className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
              <Dumbbell className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              {searchQuery
                ? t('workoutPlans.noPlansFound')
                : t('workoutPlans.noPlans')}
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              {searchQuery
                ? t('workoutPlans.tryDifferentSearch')
                : t('workoutPlans.noPlansDesc')}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-pharaoh"
              >
                <Plus className="w-5 h-5 me-2" />
                {t('workoutPlans.createFirstPlan')}
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        editPlan={editingPlan}
      />

      <AssignPlanModal
        isOpen={!!assigningPlan}
        onClose={() => setAssigningPlan(null)}
        plan={assigningPlan}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingPlanId}
        onOpenChange={() => setDeletingPlanId(null)}
      >
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-foreground">
              {t('workoutPlans.deleteDialog.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-muted-foreground">
              {t('workoutPlans.deleteDialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/50 text-foreground hover:bg-muted/50">
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default WorkoutPlans;
