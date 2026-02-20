import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/client';
import { OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
        super({ adapter: pool });
    }

    async onModuleInit() {
        await this.$connect();
    }

}
