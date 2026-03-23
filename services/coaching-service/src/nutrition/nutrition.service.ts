import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class NutritionService {
  constructor(private prisma: PrismaService) { }

  findAll(page: number, limit: number) {
    if (limit > 100) {
      limit = 100;
    }
    const skip = (page - 1) * limit;

    return this.prisma.food.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        tags: true,
        serving: true,
        createdAt: true,
        macros: {
          select: { calories: true, protein: true, carbs: true, fat: true },
        },
        nutrients: { select: { key: true, value: true, unit: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.food.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        serving: true,
        description: true,
        type: true,
        tags: true,
        createdAt: true,
        macros: {
          select: { calories: true, protein: true, carbs: true, fat: true },
        },
        nutrients: { select: { key: true, value: true, unit: true } },
      },
    });
  }

  async searchFoods(q: string, page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.prisma.$queryRaw`
    SELECT id, name, description,
           ts_rank_cd("searchDocument", websearch_to_tsquery('english', ${q})) AS rank
    FROM "Food"
    WHERE "searchDocument" @@ websearch_to_tsquery('english', ${q})
    ORDER BY
      CASE
        WHEN lower(name) = lower(${q}) THEN 1
        ELSE 3
      END,
      rank DESC,
      length(name) ASC
    LIMIT ${limit} OFFSET ${offset};
  `;
  }
}
