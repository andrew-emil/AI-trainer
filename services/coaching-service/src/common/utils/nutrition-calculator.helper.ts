export class NutritionCalculator {
    static calcMealTotals(meal: any) {
        let calories = 0, protein = 0, carbs = 0, fat = 0;

        for (const mealFood of meal.foods) {
            const macros = mealFood.food?.macros;
            if (!macros) continue;

            const gramsPerUnit = this.resolveGramsPerUnit(mealFood);
            const factor = (mealFood.quantity * gramsPerUnit) / 100;

            calories += macros.calories * factor;
            protein += macros.protein * factor;
            carbs += macros.carbs * factor;
            fat += macros.fat * factor;
        }

        return { ...meal, totals: this.round({ calories, protein, carbs, fat }) };
    }

    static calcDayTotals(day: any) {
        const meals = day.meals.map((m: any) => this.calcMealTotals(m));
        const totals = this.sumTotals(meals);
        return { ...day, meals, totals };
    }

    static calcPlanTotals(plan: any) {
        const days = plan.days.map((d: any) => this.calcDayTotals(d));
        const totals = this.sumTotals(days);
        return { ...plan, days, totals };
    }

    private static resolveGramsPerUnit(mealFood: any): number {
        const { unit, food } = mealFood;
        if (unit === "g" || unit === "ml" || !food?.serving) return 1;

        const { common, metric } = food.serving ?? {};
        if (common?.unit === unit && metric?.unit === "g") {
            return metric.quantity / common.quantity;
        }
        return 1;
    }

    private static sumTotals(items: any[]) {
        const acc = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        for (const item of items) {
            acc.calories += item.totals.calories;
            acc.protein += item.totals.protein;
            acc.carbs += item.totals.carbs;
            acc.fat += item.totals.fat;
        }
        return this.round(acc);
    }

    private static round(t: Record<string, number>) {
        return Object.fromEntries(
            Object.entries(t).map(([k, v]) => [k, Number(v.toFixed(2))])
        );
    }
}