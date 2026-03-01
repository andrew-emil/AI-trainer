import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Apple, Search, Utensils, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NutritionPlanCard from '@/components/nutrition/NutritionPlanCard';
import CreateNutritionPlanModal from '@/components/nutrition/CreateNutritionPlanModal';
import AssignNutritionPlanModal from '@/components/nutrition/AssignNutritionPlanModal';
import {
  useNutritionPlans,
  useTrainerNutritionPlans,
  useDeleteNutritionPlan,
} from '@/hooks/useNutritionPlans';
import { useAuth } from '@/hooks/useAuth';
import { NutritionPlan } from '@/types/entities';
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
import {
  getAllTraineesAndTheirAssignedNutritionPlans,
  getAssignedTrainees,
} from '@/services/trainer';
import {
  GetAllTraineesWithNutritionPlans,
  GetAssignedTraineesResponse,
} from '@/types/trainer';

const NutritionPlans = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const currentUser = auth?.user;
  const isTrainer = currentUser?.role === 'trainer';

  // Use backend hooks based on role
  const { data: nutritionPlans = [], isLoading } = isTrainer
    ? useTrainerNutritionPlans()
    : useNutritionPlans();
  const deletePlanMutation = useDeleteNutritionPlan();
  console.log(nutritionPlans);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<NutritionPlan | null>(null);
  const [assignModalData, setAssignModalData] = useState<{
    isOpen: boolean;
    planId: string;
    planName: string;
    assignedTo: string[];
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

  // Stats data
  const [traineeData, setTraineeData] = useState<
    GetAllTraineesWithNutritionPlans[]
  >([]);
  const [allTrainees, setAllTrainees] = useState<GetAssignedTraineesResponse[]>(
    [],
  );
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!isTrainer) return;

    const fetchStatsData = async () => {
      setStatsLoading(true);
      try {
        const [traineePlansRes, allTraineesRes] = await Promise.all([
          getAllTraineesAndTheirAssignedNutritionPlans(),
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
  }, [isTrainer]);

  // Calculate stats
  const totalActiveTrainees = allTrainees.length;
  const totalPlans = nutritionPlans.length;
  const traineesWithNutritionPlan = traineeData.filter(
    (item) => item.assignedPlan !== null,
  ).length;
  const traineesWithoutNutritionPlan =
    totalActiveTrainees - traineesWithNutritionPlan;

  const stats = [
    {
      labelKey: 'nutrition.stats.activeTrainees',
      value: totalActiveTrainees,
      icon: Users,
    },
    {
      labelKey: 'nutrition.stats.totalPlans',
      value: totalPlans,
      icon: Apple,
    },
    {
      labelKey: 'nutrition.stats.traineesWithoutPlan',
      value: traineesWithoutNutritionPlan,
      icon: Users,
    },
    {
      labelKey: 'nutrition.stats.traineesWithPlan',
      value: traineesWithNutritionPlan,
      icon: Apple,
    },
  ];

  // Filter plans mostly client-side
  const displayedPlans = nutritionPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleView = (id: string) => {
    navigate(`/nutrition/${id}`);
  };

  const handleEdit = (plan: NutritionPlan) => {
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
          title: t('common.success'),
          description: t('nutrition.pageDetails.deleteSuccess'),
        });
        setDeletingPlanId(null);
      } catch (error) {
        toast({
          title: t('error.title'),
          description: t('nutrition.pageDetails.deleteError'),
          variant: 'destructive',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <p className="text-muted-foreground">{t('common.loading')}</p>
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
              {isTrainer ? (
                <>
                  {t('nutrition.title')}{' '}
                  <span className="text-gradient-gold">
                    {t('nutrition.titleHighlight')}
                  </span>
                </>
              ) : (
                t('nutrition.traineeSubtitle')
              )}
            </h1>
            <p className="font-body text-muted-foreground">
              {isTrainer
                ? t('nutrition.subtitle')
                : t('nutrition.traineeSubtitle')}
            </p>
          </div>
          {isTrainer && (
            <Button
              onClick={() => {
                setEditingPlan(null);
                setIsCreateModalOpen(true);
              }}
              className="btn-pharaoh"
            >
              <Plus className="w-5 h-5 me-2" />
              {t('nutrition.createPlan')}
            </Button>
          )}
        </motion.div>

        <EgyptianDivider />

        {/* Stats */}
        {isTrainer && (
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
        )}

        {/* Search */}
        <div className="relative max-w-md">
          <Utensils className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('nutrition.searchPlaceholder')}
            className="ps-12 bg-card border-border/50 text-foreground h-12"
          />
        </div>

        {/* Plans Grid */}
        {displayedPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NutritionPlanCard
                  plan={plan}
                  showActions={isTrainer}
                  onView={() => handleView(plan.id)}
                  onEdit={() => handleEdit(plan)}
                  onDelete={() => handleDelete(plan.id)}
                  onAssign={() =>
                    setAssignModalData({
                      isOpen: true,
                      planId: plan.id,
                      planName: plan.name,
                      assignedTo: plan.assignedTo || [],
                    })
                  }
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
              <Apple className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              {isTrainer
                ? t('nutrition.noPlans')
                : t('nutrition.noPlansAssigned')}
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              {isTrainer
                ? t('nutrition.noPlansDesc')
                : t('nutrition.noPlansAssignedDesc')}
            </p>
            {isTrainer && !searchQuery && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-pharaoh"
              >
                <Plus className="w-5 h-5 me-2" />
                {t('nutrition.createFirstPlan')}
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Create Modal */}
      <CreateNutritionPlanModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPlan(null);
        }}
        plan={editingPlan}
      />

      {/* Assign Modal */}
      {assignModalData && (
        <AssignNutritionPlanModal
          isOpen={assignModalData.isOpen}
          onClose={() => setAssignModalData(null)}
          planId={assignModalData.planId}
          planName={assignModalData.planName}
          currentlyAssigned={assignModalData.assignedTo}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingPlanId}
        onOpenChange={() => setDeletingPlanId(null)}
      >
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-foreground">
              {t('nutrition.deleteDialog.title') || 'Delete Nutrition Plan'}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-muted-foreground">
              {t('nutrition.deleteDialog.description') ||
                'Are you sure you want to delete this nutrition plan?'}
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

export default NutritionPlans;
