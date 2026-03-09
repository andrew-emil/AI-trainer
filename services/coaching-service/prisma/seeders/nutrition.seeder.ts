import fs from "fs";
import path from "path";
import readline from "readline";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const NUTRIENT_UNITS: Record<string, string> = {
  calories: "kcal",
  protein: "g",
  carbohydrates: "g",
  total_fat: "g",
  iron: "mg",
  zinc: "mg",
  calcium: "mg",
  magnesium: "mg",
  potassium: "mg",
  sodium: "mg",
  vitamin_a: "µg",
  vitamin_c: "mg",
  vitamin_d: "µg",
  vitamin_e: "mg",
  vitamin_k: "µg",
  vitamin_b6: "mg",
  vitamin_b12: "µg",
  cholesterol: "mg",
};

const BATCH_SIZE = 500;

function escapeString(str: string) {
  return str.replace(/'/g, "''");
}

async function insertBatch(
  prisma: PrismaClient,
  foodBatch: string[],
  macroBatch: string[],
  nutrientBatch: string[],
) {
  if (foodBatch.length) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "Food" (id, name, description, type, tags, alternate_names, serving)
      VALUES ${foodBatch.join(", ")}
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  if (macroBatch.length) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "FoodMacros" (id, "foodId", calories, protein, carbs, fat)
      VALUES ${macroBatch.map((m) => `('${crypto.randomUUID()}', ${m.slice(1)}`).join(", ")}
      ON CONFLICT ("foodId") DO NOTHING;
    `);
  }

  if (nutrientBatch.length) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "FoodNutrient" (id, "foodId", key, value, unit)
      VALUES ${nutrientBatch.map((n) => `('${crypto.randomUUID()}', ${n.slice(1)}`).join(", ")}
      ON CONFLICT ("foodId", key) DO NOTHING;
    `);
  }
}

export async function seedNutrition(prisma: PrismaClient) {
  console.log("🥗 Seeding nutrition data...");

  const filePath = path.join(__dirname, "../data/opennutrition_foods.tsv");

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let headers: string[] = [];
  let foodBatch: string[] = [];
  let macroBatch: string[] = [];
  let nutrientBatch: string[] = [];

  for await (const line of rl) {
    if (!line.trim()) continue;

    if (!headers.length) {
      headers = line.split("\t");
      continue;
    }

    const values = line.split("\t");
    const row: any = {};
    headers.forEach((h, i) => (row[h] = values[i]));

    const nutrition = JSON.parse(row.nutrition_100g || "{}");
    if (!nutrition.calories || !nutrition.protein) continue;

    const foodId = row.id;
    const foodName = escapeString(row.name || "");
    const foodDesc = escapeString(row.description || "");
    const foodType = row.type || "";

    const tags = row.labels
      ? `ARRAY[${JSON.parse(row.labels)
          .map((t: string) => `'${escapeString(t)}'`)
          .join(", ")}]::text[]`
      : "ARRAY[]::text[]";

    const alternateNames = row.alternate_names
      ? `ARRAY[${JSON.parse(row.alternate_names)
          .map((n: string) => `'${escapeString(n)}'`)
          .join(", ")}]::text[]`
      : "ARRAY[]::text[]";

    const serving = row.serving
      ? `'${escapeString(row.serving)}'::jsonb`
      : "NULL";

    foodBatch.push(
      `('${foodId}', '${foodName}', '${foodDesc}', '${foodType}', ${tags}, ${alternateNames}, ${serving})`,
    );

    macroBatch.push(
      `('${foodId}', ${nutrition.calories}, ${nutrition.protein}, ${nutrition.carbohydrates ?? 0}, ${nutrition.total_fat ?? 0})`,
    );

    for (const [key, value] of Object.entries(nutrition)) {
      if (["calories", "protein", "carbohydrates", "total_fat"].includes(key))
        continue;
      if (typeof value !== "number" || value <= 0) continue;

      nutrientBatch.push(
        `('${foodId}', '${key}', ${value}, '${NUTRIENT_UNITS[key] ?? "g"}')`,
      );
    }

    if (foodBatch.length >= BATCH_SIZE) {
      await insertBatch(prisma, foodBatch, macroBatch, nutrientBatch);
      foodBatch = [];
      macroBatch = [];
      nutrientBatch = [];
    }
  }

  if (foodBatch.length) {
    await insertBatch(prisma, foodBatch, macroBatch, nutrientBatch);
  }

  console.log("✅ Nutrition seed done");
}
