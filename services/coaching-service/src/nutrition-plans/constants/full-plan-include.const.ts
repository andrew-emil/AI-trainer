import { Prisma } from "@prisma/client";

export const FULL_PLAN_INCLUDE = {
    days: {
        orderBy: { dayIndex: "asc" },
        include: {
            meals: {
                orderBy: { orderIndex: "asc" },
                include: {
                    foods: {
                        orderBy: { orderIndex: "asc" },
                        include: { food: { include: { macros: true } } },
                    },
                },
            },
        },
    },
} satisfies Prisma.NutritionPlanInclude;