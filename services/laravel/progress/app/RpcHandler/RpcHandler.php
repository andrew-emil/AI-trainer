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

            // الحصول على تقدم يومي
            'get_daily_progress' =>
            $this->readService->getDailyProgress(
                $request['payload']['user_id'],
                $request['payload']['date'] ?? null
            ),

            // الحصول على تقدم أسبوعي
            'get_weekly_progress' =>
            $this->readService->getWeeklyProgress(
                $request['payload']['user_id'],
                $request['payload']['week_start'] ?? null
            ),

            // الحصول على تقدم التمرين
            'get_exercise_progress' =>
            $this->readService->getExercise(
                $request['payload']['user_id'],
                $request['payload']['exercise_name'] ?? null
            ),

            // الحصول على تقدم يوم التدريب (TrainDay)
            'get_train_day_progress' =>
            $this->readService->getTrainDayProgress(
                $request['payload']['user_id'],
                $request['payload']['train_day_name'] ?? null
            ),

            default => [
                'status' => 'error',
                'message' => 'Unknown action'
            ]
        };
    }
}
