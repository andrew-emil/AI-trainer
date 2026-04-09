import "dotenv/config.js"
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "@prisma/client";
import { Pool } from "pg";
import bcrypt from "bcrypt"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting database seed...");

    const email = process.env.DEFAULT_ADMIN_EMAIL
    const plainPassword = process.env.DEFAULT_ADMIN_PASSWORD

    if (!email || !plainPassword) {
        console.error("❌ Missing default admin credentials");
        process.exit(1);
    }
    console.log("👑 Seeding admin user...");

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {
            role: UserRole.admin
        },
        create: {
            email,
            passwordHash: hashedPassword,
            role: UserRole.admin,
            firstName: "Admin",
            lastName: "Admin",
            username: "admin",
        },
    });

    console.log("✅ Admin user created successfully");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
