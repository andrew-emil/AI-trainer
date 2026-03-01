import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Apple, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Food } from '@/types/entities';
import { findAllFoods, searchFoods, findFoodById } from '@/services/nutrition';
import EgyptianCard from '@/components/ui/EgyptianCard';
import { Badge } from '@/components/ui/badge';

interface FoodSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (
    food: Food,
    quantity: number,
    unit: string,
    orderIndex: number,
  ) => void;
  initialOrderIndex?: number;
}

const FoodSelector = ({
  isOpen,
  onClose,
  onSelect,
  initialOrderIndex = 0,
}: FoodSelectorProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  // Selection state
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState('g');
  const [factor, setFactor] = useState<number>(1);
  const [orderIndex, setOrderIndex] = useState<number>(initialOrderIndex);

  useEffect(() => {
    if (isOpen) {
      setOrderIndex(initialOrderIndex);
    }
  }, [isOpen, initialOrderIndex]);

  const servingOptions = (() => {
    const optionsMap = new Map<string, number>();
    optionsMap.set('g', 1);

    if (!selectedFood?.serving) {
      return Array.from(optionsMap.entries()).map(([name, factor]) => ({
        name,
        factor,
      }));
    }

    const s = selectedFood.serving as any;

    if (s.common && s.metric && s.metric.unit === 'g') {
      const commonFactor = s.metric.quantity / s.common.quantity;
      optionsMap.set(s.common.unit, commonFactor);
    } else if (s.common) {
      optionsMap.set(s.common.unit, 1);
    }

    if (s.metric && s.metric.unit !== 'g') {
      optionsMap.set(s.metric.unit, 1);
    }

    return Array.from(optionsMap.entries()).map(([name, factor]) => ({
      name,
      factor,
    }));
  })();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 20;

  useEffect(() => {
    if (isOpen) {
      setFoods([]);
      setPage(1);
      setHasMore(true);
      loadFoods('', 1);
    }
  }, [isOpen]);

  const loadFoods = async (query: string, pageNum: number) => {
    setIsLoading(true);
    let result;

    if (query.length >= 2) {
      result = await searchFoods(query, pageNum, LIMIT);
    } else {
      result = await findAllFoods((pageNum - 1) * LIMIT, LIMIT);
    }

    if (result.data) {
      if (pageNum === 1) {
        setFoods(result.data);
      } else {
        setFoods((prev) => [...prev, ...result.data!]);
      }
      setHasMore(result.data.length === LIMIT);
    }
    setIsLoading(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
    loadFoods(query, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadFoods(searchQuery, nextPage);
  };

  const handleFoodSelect = async (food: Food) => {
    setSelectedFood(food);
    setIsLoading(true);
    // Fetch details to get macros, nutrients and servings if they aren't in the list
    if (!food.macros || !food.nutrients || !food.serving) {
      const result = await findFoodById(food.id);
      if (result.data) {
        setSelectedFood(result.data);
      }
    }
    setIsLoading(false);
  };

  const resetSelection = () => {
    setSelectedFood(null);
    setQuantity(100);
    setUnit('g');
    setFactor(1);
    setOrderIndex(initialOrderIndex);
  };

  const calculateMacros = () => {
    if (!selectedFood?.macros) return null;
    const { calories, protein, carbs, fat } = selectedFood.macros;
    // factor is grams per unit. multiplier = (quantity * factor) / 100
    const multiplier = (quantity * factor) / 100;

    return {
      calories: Math.round(calories * multiplier),
      protein: Number((protein * multiplier).toFixed(1)),
      carbs: Number((carbs * multiplier).toFixed(1)),
      fat: Number((fat * multiplier).toFixed(1)),
    };
  };

  const calculateNutrient = (value: number) => {
    const multiplier = (quantity * factor) / 100;
    return Number((value * multiplier).toFixed(1));
  };

  const currentMacros = calculateMacros();

  const handleConfirmSelection = () => {
    if (selectedFood) {
      onSelect(selectedFood, quantity, unit, orderIndex);
      resetSelection();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold">
            {selectedFood ? t('nutrition.addFood') : t('nutrition.searchFood')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 no-scrollbar">
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          {!selectedFood ? (
            <>
              {/* SearchBar */}
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={t('nutrition.foodSearchPlaceholder')}
                  className="ps-12 bg-background/50 border-border/50"
                  autoFocus
                />
              </div>

              {/* Food List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                {isLoading && page === 1 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <p>{t('common.loading')}</p>
                  </div>
                ) : foods.length > 0 ? (
                  <>
                    {foods.map((food) => (
                      <motion.div
                        key={food.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="cursor-pointer"
                        onClick={() => handleFoodSelect(food)}
                      >
                        <EgyptianCard className="p-4 hover:border-primary/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-heading font-bold text-foreground">
                                {food.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {food.type || 'Standard Food'}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="border-primary/30 text-primary"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {t('common.add')}
                            </Badge>
                          </div>
                        </EgyptianCard>
                      </motion.div>
                    ))}

                    {/* Load More Button */}
                    {hasMore && foods.length >= LIMIT && (
                      <div className="pt-2 pb-4">
                        <Button
                          variant="outline"
                          onClick={loadMore}
                          disabled={isLoading}
                          className="w-full border-border/50 text-muted-foreground hover:text-foreground"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4 mr-2" />
                          )}
                          {t('nutrition.loadMore')}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  !isLoading && (
                    <div className="text-center py-12">
                      <Apple className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                      <p className="text-muted-foreground">
                        {t('nutrition.noFoodsFound')}
                      </p>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">
                      {selectedFood.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedFood.type}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('nutrition.amount')}</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('nutrition.unit')}</Label>
                  <select
                    value={unit}
                    onChange={(e) => {
                      const selectedUnit = e.target.value;
                      const s = servingOptions.find(
                        (o) => o.name === selectedUnit,
                      );
                      setUnit(selectedUnit);
                      if (s) setFactor(s.factor);
                    }}
                    className="w-full px-3 py-2 rounded-md border border-border/50 bg-background/50 text-foreground"
                  >
                    {servingOptions.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {currentMacros && (
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center">
                    <p className="text-[10px] text-orange-500 uppercase font-bold">
                      {t('nutrition.calories')}
                    </p>
                    <p className="text-sm font-bold">
                      {currentMacros.calories}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-[10px] text-blue-500 uppercase font-bold">
                      {t('nutrition.protein')}
                    </p>
                    <p className="text-sm font-bold">
                      {currentMacros.protein}g
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                    <p className="text-[10px] text-green-500 uppercase font-bold">
                      {t('nutrition.carbs')}
                    </p>
                    <p className="text-sm font-bold">{currentMacros.carbs}g</p>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
                    <p className="text-[10px] text-yellow-500 uppercase font-bold">
                      {t('nutrition.fat')}
                    </p>
                    <p className="text-sm font-bold">{currentMacros.fat}g</p>
                  </div>
                </div>
              )}

              {selectedFood.nutrients && selectedFood.nutrients.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    {t('nutrition.nutrients')}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFood.nutrients.map((n) => (
                      <div
                        key={n.key}
                        className="flex justify-between p-2 rounded bg-muted/20 text-xs"
                      >
                        <span className="text-muted-foreground">{n.key}</span>
                        <span className="font-bold">
                          {calculateNutrient(n.value)}
                          {n.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                <Info className="w-4 h-4 shrink-0" />
                <p>{t('nutrition.configDesc')}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={resetSelection}
                  className="flex-1"
                >
                  {t('common.back')}
                </Button>
                <Button
                  onClick={handleConfirmSelection}
                  className="flex-1 btn-pharaoh"
                >
                  {t('common.add')}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodSelector;
