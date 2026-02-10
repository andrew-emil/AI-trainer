import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(
        private readonly config: ConfigService
    ) {
        const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        super({ adapter: pool });
    }

    async onModuleInit() {
        await this.$connect();
    }

}