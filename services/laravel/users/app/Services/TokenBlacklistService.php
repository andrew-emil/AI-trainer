<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;

class TokenBlacklistService
{
    public function blacklist(string $token, int $expiresAt)
    {
        $ttl = $expiresAt - time();
        if ($ttl <= 0) return false;

        try {
            return Redis::setex("blacklist:" . $token, $ttl, 1);
        } catch (\Throwable $e) {
            // DO NOT THROW — this will kill your RabbitMQ consumer
            return false;
        }
    }

    public function isBlacklisted(string $token): bool
    {
        try {
            return Redis::exists("blacklist:" . $token) > 0;
        } catch (\Throwable $e) {
            // Redis temporarily down? treat as not blacklisted
            return false;
        }
    }
}
