<?php

namespace App\RpcHandler;

use App\Services\ProgressReadService;

class RpcHandler
{
    protected ProgressReadService $readService;

    public function __construct(ProgressReadService $readService)
    {
        $this->readService = $readService;
    }

    public function handle(array $request): array
    {
        return match ($request['action'] ?? null) {

            'get_daily_progress' =>
            $this->readService->getDaily(
                $request['payload']['user_id'],
                $request['payload']['date'] ?? null
            ),

            'get_weekly_progress' =>
            $this->readService->getWeekly(
                $request['payload']['user_id'],
                $request['payload']['start_date'] ?? null
            ),

            'get_monthly_progress' =>
            $this->readService->getMonthly(
                $request['payload']['user_id'],
                $request['payload']['month'] ?? null
            ),

            default => [
                'status' => 'error',
                'message' => 'Unknown action'
            ]
        };
    }
}
