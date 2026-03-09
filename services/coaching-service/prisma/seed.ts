import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { Pool } from "pg";

import { seedExercises } from "./seeders/exercise.seeder";
import { seedNutrition } from "./seeders/nutrition.seeder";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting database seed...");

    await seedExercises(prisma);
    await seedNutrition(prisma);

    console.log("🌱 All seeds completed");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
