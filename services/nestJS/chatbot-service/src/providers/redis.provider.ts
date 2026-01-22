import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisProvider {
    private readonly client: Redis;

    constructor(
        private readonly configService: ConfigService,
    ) {
        const url = this.configService.getOrThrow<string>('REDIS_URL');
        this.client = new Redis(url);

        this.client.on('error', (err) => {
            console.error(`Redis error: ${err}`);
        });
    }

    async get<T = any>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data) return null;
        return JSON.parse(data) as T;
    }

    async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
        const payload = JSON.stringify(value);
        if (ttlSeconds) {
            await this.client.set(key, payload, 'EX', ttlSeconds);
        } else {
            await this.client.set(key, payload);
        }
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
