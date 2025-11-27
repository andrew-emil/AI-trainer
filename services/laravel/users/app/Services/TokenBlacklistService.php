<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class TokenBlacklistService
{
    protected $redisAvailable = true;

    public function __construct()
    {
        // تحقق من وجود Redis
        try {
            Redis::ping();
        } catch (\Throwable $e) {
            $this->redisAvailable = false;
        }
    }

    public function blacklist(string $token, int $expiresAt)
    {
        Log::info("Blacklist function called", [
            'token' => substr($token, 0, 20) . '...',
            'expiresAt' => $expiresAt
        ]);

        $ttl = $expiresAt - time();
        if ($ttl < 0) $ttl = 0;

        try {
            Redis::setex("blacklist:$token", $ttl, 1);
            Log::info("Token stored in Redis", [
                'key' => "blacklist:$token",
                'ttl' => $ttl
            ]);
        } catch (\Throwable $e) {
            Log::error("Redis error: " . $e->getMessage());
        }
    }


    public function isBlacklisted(string $token): bool
    {
        if (!$this->redisAvailable) {
            return false; // Redis غير متاح، اعتبر التوكن صالح
        }

        try {
            return Redis::exists("blacklist:$token") > 0;
        } catch (\Throwable $e) {
            return false; // خطأ في Redis، اعتبر التوكن صالح
        }
    }
}
