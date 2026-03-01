import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Calculator,
  ChevronRight,
  Dumbbell,
  Flame,
  Info,
  Loader2,
  RotateCcw,
  Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { cn } from '@/lib/utils';

// --- Interfaces ---
interface NutritionFormData {
  bmr: number | '';
  activityMultiplier: number;
  goalAdjustment: number | '';
  bodyWeight: number | '';
  proteinFactor: number | '';
  fatFactor: number | '';
  dietType: string;
  highCarbPercent?: number | '';
  lowCarbPercent?: number | '';
  highCarbFatFactor?: number | '';
  lowCarbFatFactor?: number | '';
}

interface MacroResult {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
}

interface CarbCycleResult {
  lowCarb: MacroResult;
  moderateCarb: MacroResult;
  highCarb: MacroResult;
}

const DIET_TYPES = [
  { value: 'balanced', labelKey: 'balanced' },
  { value: 'highCarb', labelKey: 'highCarb' },
  { value: 'lowCarb', labelKey: 'lowCarb' },
  { value: 'keto', labelKey: 'keto' },
  { value: 'highProtein', labelKey: 'highProtein' },
  { value: 'mediterranean', labelKey: 'mediterranean' },
  { value: 'bodybuilderCut', labelKey: 'bodybuilderCut' },
  { value: 'carbCycle', labelKey: 'carbCycle' },
];

const ACTIVITY_OPTIONS = [
  { value: 1.2, labelKey: 'sedentary' },
  { value: 1.375, labelKey: 'lightlyActive' },
  { value: 1.55, labelKey: 'moderatelyActive' },
  { value: 1.725, labelKey: 'veryActive' },
  { value: 1.9, labelKey: 'extraActive' },
];

const DIET_INFO: Record<
  string,
  { descKey: string; protein: number; fat: number }
> = {
  balanced: {
    descKey: 'balanced',
    protein: 2.0,
    fat: 0.8,
  },
  highCarb: {
    descKey: 'highCarb',
    protein: 1.8,
    fat: 0.6,
  },
  lowCarb: {
    descKey: 'lowCarb',
    protein: 2.2,
    fat: 0.9,
  },
  keto: {
    descKey: 'keto',
    protein: 1.6,
    fat: 1.5,
  },
  highProtein: {
    descKey: 'highProtein',
    protein: 2.5,
    fat: 0.7,
  },
  mediterranean: {
    descKey: 'mediterranean',
    protein: 1.8,
    fat: 1.0,
  },
  bodybuilderCut: {
    descKey: 'bodybuilderCut',
    protein: 2.8,
    fat: 0.5,
  },
  carbCycle: {
    descKey: 'carbCycle',
    protein: 2.2,
    fat: 0.8,
  },
};

const NutritionCalculatorPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NutritionFormData>({
    bmr: '',
    activityMultiplier: 1.2,
    goalAdjustment: 0,
    bodyWeight: '',
    proteinFactor: 2.2,
    fatFactor: 0.8,
    dietType: 'balanced',
    highCarbPercent: 20,
    lowCarbPercent: 20,
    highCarbFatFactor: 0.6,
    lowCarbFatFactor: 1.2,
  });

  const [result, setResult] = useState<MacroResult | CarbCycleResult | null>(
    null,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value),
    }));
    setResult(null);
  };

  const handleSelectChange = (name: keyof NutritionFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'activityMultiplier' ? parseFloat(value) : value,
    }));
    setResult(null);
  };

  const applyRecommendedFactors = () => {
    const info = DIET_INFO[formData.dietType];
    if (info) {
      setFormData((prev) => ({
        ...prev,
        proteinFactor: info.protein,
        fatFactor: info.fat,
      }));
    }
  };

  const calculateMacros = (
    calories: number,
    weight: number,
    pFactor: number,
    fFactor: number,
  ): MacroResult => {
    const proteinGrams = weight * pFactor;
    const fatGrams = weight * fFactor;
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbsGrams = Math.max(
      0,
      (calories - proteinCalories - fatCalories) / 4,
    );

    return {
      calories: Math.round(calories),
      protein: Math.round(proteinGrams),
      fats: Math.round(fatGrams),
      carbs: Math.round(carbsGrams),
    };
  };

  const handleCalculate = async () => {
    if (
      !formData.bmr ||
      !formData.bodyWeight ||
      !formData.proteinFactor ||
      !formData.fatFactor
    )
      return;

    setLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const maintenanceCalories =
      (formData.bmr as number) * formData.activityMultiplier;
    const targetCalories =
      maintenanceCalories +
      (maintenanceCalories * (formData.goalAdjustment as number)) / 100;

    if (formData.dietType === 'carbCycle') {
      const highCarbPercent = (formData.highCarbPercent as number) / 100;
      const lowCarbPercent = (formData.lowCarbPercent as number) / 100;
      const highFatFactor =
        (formData.highCarbFatFactor as number) ||
        (formData.fatFactor as number);
      const lowFatFactor =
        (formData.lowCarbFatFactor as number) || (formData.fatFactor as number);

      const results: CarbCycleResult = {
        highCarb: calculateMacros(
          maintenanceCalories * (1 + highCarbPercent),
          formData.bodyWeight as number,
          formData.proteinFactor as number,
          highFatFactor,
        ),
        lowCarb: calculateMacros(
          maintenanceCalories * (1 + lowCarbPercent),
          formData.bodyWeight as number,
          formData.proteinFactor as number,
          lowFatFactor,
        ),
        moderateCarb: calculateMacros(
          targetCalories,
          formData.bodyWeight as number,
          formData.proteinFactor as number,
          formData.fatFactor as number,
        ),
      };
      setResult(results);
    } else {
      const res = calculateMacros(
        targetCalories,
        formData.bodyWeight as number,
        formData.proteinFactor as number,
        formData.fatFactor as number,
      );
      setResult(res);
    }

    setLoading(false);
  };

  const isFormValid =
    formData.bmr !== '' &&
    formData.bodyWeight !== '' &&
    formData.proteinFactor !== '' &&
    formData.fatFactor !== '';

  const renderResultCard = (
    title: string,
    data: MacroResult,
    colorClass: string = 'text-primary',
  ) => (
    <Card className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className={cn('h-1 w-full', colorClass.replace('text-', 'bg-'))} />
      <CardHeader className="text-center pb-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <CardTitle
          className={cn('text-4xl font-bold font-heading', colorClass)}
        >
          {data.calories}{' '}
          <span className="text-lg font-normal text-muted-foreground">
            {t('nutritionCalculator.kcal')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center mt-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">
              {t('nutritionCalculator.protein')}
            </p>
            <p className="text-xl font-bold">{data.protein}g</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">
              {t('nutritionCalculator.fats')}
            </p>
            <p className="text-xl font-bold">{data.fats}g</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">
              {t('nutritionCalculator.carbs')}
            </p>
            <p className="text-xl font-bold">{data.carbs}g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
              {t('nutritionCalculator.title')}{' '}
              <span className="text-gradient-gold">
                {t('nutritionCalculator.titleHighlight')}
              </span>
            </h1>
            <p className="text-muted-foreground font-body">
              {t('nutritionCalculator.description')}
            </p>
          </motion.div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setResult(null);
              setFormData({
                bmr: '',
                activityMultiplier: 1.2,
                goalAdjustment: 0,
                bodyWeight: '',
                proteinFactor: 2.2,
                fatFactor: 0.8,
                dietType: 'balanced',
                highCarbPercent: 20,
                lowCarbPercent: 20,
              });
            }}
            className="w-fit"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('nutritionCalculator.reset')}
          </Button>
        </div>

        <EgyptianDivider />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Inputs Section */}
          <motion.div
            className="lg:col-span-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border/50 bg-card/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  {t('nutritionCalculator.inputsTitle')}
                </CardTitle>
                <CardDescription>
                  {t('nutritionCalculator.inputsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* BMR */}
                  <div className="space-y-2">
                    <Label htmlFor="bmr">
                      {t('nutritionCalculator.bmrLabel')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="bmr"
                        name="bmr"
                        type="number"
                        min="0"
                        placeholder={t('nutritionCalculator.bmrPlaceholder')}
                        value={formData.bmr}
                        onChange={handleInputChange}
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {t('nutritionCalculator.kcal')}
                      </span>
                    </div>
                  </div>

                  {/* Activity Multiplier */}
                  <div className="space-y-2">
                    <Label>{t('nutritionCalculator.activityLabel')}</Label>
                    <Select
                      value={formData.activityMultiplier.toString()}
                      onValueChange={(v) =>
                        handleSelectChange('activityMultiplier', v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            'nutritionCalculator.activityPlaceholder',
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {ACTIVITY_OPTIONS.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value.toString()}
                          >
                            {opt.labelKey === 'sedentary' &&
                              `${t('common.activity.sedentary')} (1.2)`}
                            {opt.labelKey === 'lightlyActive' &&
                              `${t('common.activity.lightlyActive')} (1.375)`}
                            {opt.labelKey === 'moderatelyActive' &&
                              `${t('common.activity.moderatelyActive')} (1.55)`}
                            {opt.labelKey === 'veryActive' &&
                              `${t('common.activity.veryActive')} (1.725)`}
                            {opt.labelKey === 'extraActive' &&
                              `${t('common.activity.extraActive')} (1.9)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Goal Adjustment */}
                  <div className="space-y-2">
                    <Label htmlFor="goalAdjustment">
                      {t('nutritionCalculator.goalAdjustmentLabel')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="goalAdjustment"
                        name="goalAdjustment"
                        type="number"
                        placeholder={t(
                          'nutritionCalculator.goalAdjustmentPlaceholder',
                        )}
                        value={formData.goalAdjustment}
                        onChange={handleInputChange}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">
                      {t('nutritionCalculator.goalAdjustmentHint')}
                    </p>
                  </div>

                  {/* Body Weight */}
                  <div className="space-y-2">
                    <Label htmlFor="bodyWeight">
                      {t('nutritionCalculator.weightLabel')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="bodyWeight"
                        name="bodyWeight"
                        type="number"
                        min="0"
                        placeholder={t('nutritionCalculator.weightPlaceholder')}
                        value={formData.bodyWeight}
                        onChange={handleInputChange}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        kg
                      </span>
                    </div>
                  </div>

                  {/* Protein Factor */}
                  <div className="space-y-2">
                    <Label htmlFor="proteinFactor">
                      {t('nutritionCalculator.proteinFactorLabel')}
                    </Label>
                    <Input
                      id="proteinFactor"
                      name="proteinFactor"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.proteinFactor}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>{t('nutritionCalculator.proteinFactorHint')}</span>
                    </div>
                  </div>

                  {/* Fat Factor */}
                  <div className="space-y-2">
                    <Label htmlFor="fatFactor">
                      {t('nutritionCalculator.fatFactorLabel')}
                    </Label>
                    <Input
                      id="fatFactor"
                      name="fatFactor"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.fatFactor}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>{t('nutritionCalculator.fatFactorHint')}</span>
                    </div>
                  </div>

                  {/* Diet Type */}
                  <div className="space-y-2">
                    <Label>{t('nutritionCalculator.dietTypeLabel')}</Label>
                    <Select
                      value={formData.dietType}
                      onValueChange={(v) => handleSelectChange('dietType', v)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            'nutritionCalculator.dietTypePlaceholder',
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {DIET_TYPES.map((diet) => (
                          <SelectItem key={diet.value} value={diet.value}>
                            {t(
                              `nutritionCalculator.dietTypes.${diet.labelKey}`,
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Diet Info Section */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={formData.dietType}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="font-heading font-bold text-primary flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            {t('nutritionCalculator.infoTitle', {
                              dietName: t(
                                `nutritionCalculator.dietTypes.${
                                  DIET_TYPES.find(
                                    (d) => d.value === formData.dietType,
                                  )?.labelKey
                                }`,
                              ),
                            })}
                          </h4>
                          <p className="text-sm text-muted-foreground italic max-w-xl">
                            {t(
                              `nutritionCalculator.dietDescriptions.${
                                DIET_INFO[formData.dietType]?.descKey
                              }`,
                            )}
                          </p>
                          <p className="text-xs text-primary/70 font-medium">
                            {t('nutritionCalculator.recommendedMacros', {
                              protein: DIET_INFO[formData.dietType]?.protein,
                              fat: DIET_INFO[formData.dietType]?.fat,
                            })}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={applyRecommendedFactors}
                          className="shrink-0 bg-primary/20 hover:bg-primary/30 text-primary border-none"
                        >
                          {t('nutritionCalculator.applyRecommendations')}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Carb Cycle Extras */}
                  <AnimatePresence>
                    {formData.dietType === 'carbCycle' && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4 md:col-span-2 lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 rounded-xl bg-primary/5 border border-primary/10 mt-2"
                        >
                          <div className="space-y-4">
                            <h4 className="font-heading font-bold text-primary flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500" />
                              {t('nutritionCalculator.highCarbDayAdjustments')}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="highCarbPercent">
                                  {t(
                                    'nutritionCalculator.carbCycleAdjustmentLabel',
                                  )}
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="highCarbPercent"
                                    name="highCarbPercent"
                                    type="number"
                                    min="0"
                                    value={formData.highCarbPercent}
                                    onChange={handleInputChange}
                                    className="pr-8"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    %
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="highCarbFatFactor">
                                  {t('nutritionCalculator.fatFactor')}
                                </Label>
                                <Input
                                  id="highCarbFatFactor"
                                  name="highCarbFatFactor"
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  value={formData.highCarbFatFactor}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-heading font-bold text-primary flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              {t('nutritionCalculator.lowCarbDayAdjustments')}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="lowCarbPercent">
                                  {t(
                                    'nutritionCalculator.carbCycleAdjustmentLabel',
                                  )}
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="lowCarbPercent"
                                    name="lowCarbPercent"
                                    type="number"
                                    min="0"
                                    value={formData.lowCarbPercent}
                                    onChange={handleInputChange}
                                    className="pr-8"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    %
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lowCarbFatFactor">
                                  {t('nutritionCalculator.fatFactor')}
                                </Label>
                                <Input
                                  id="lowCarbFatFactor"
                                  name="lowCarbFatFactor"
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  value={formData.lowCarbFatFactor}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!isFormValid || loading}
                  className="w-full mt-8 btn-pharaoh h-12 text-lg font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t('nutritionCalculator.calculating')}
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 mr-2" />
                      {t('nutritionCalculator.calculate')}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Result Section */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                className="lg:col-span-12 space-y-6"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-border" />
                  <h3 className="font-heading text-xl font-bold text-gradient-gold">
                    {t('nutritionCalculator.resultsTitle')}
                  </h3>
                  <div className="h-[1px] flex-1 bg-border" />
                </div>

                {formData.dietType !== 'carbCycle' ? (
                  <div className="max-w-md mx-auto">
                    {renderResultCard(
                      t(
                        `nutritionCalculator.dietTypes.${
                          DIET_TYPES.find((d) => d.value === formData.dietType)
                            ?.labelKey
                        }`,
                      ) || t('nutritionCalculator.resultsTitle'),
                      result as MacroResult,
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {renderResultCard(
                      t('nutritionCalculator.dietTypes.lowCarb'),
                      (result as CarbCycleResult).lowCarb,
                      'text-orange-500',
                    )}
                    {renderResultCard(
                      t('nutritionCalculator.dietTypes.balanced'),
                      (result as CarbCycleResult).moderateCarb,
                      'text-primary',
                    )}
                    {renderResultCard(
                      t('nutritionCalculator.dietTypes.highCarb'),
                      (result as CarbCycleResult).highCarb,
                      'text-blue-500',
                    )}
                  </div>
                )}

                <div className="bg-muted/50 p-4 rounded-lg flex gap-3 text-sm border border-border/30">
                  <Info className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-muted-foreground">
                    {t('nutritionCalculator.disclaimer')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NutritionCalculatorPage;
