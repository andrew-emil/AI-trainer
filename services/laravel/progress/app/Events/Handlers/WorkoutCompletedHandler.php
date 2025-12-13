<?php

namespace App\Events\Handlers;

use App\Projections\DailyProjectionBuilder;
use App\Services\ProgressWriteService;

class WorkoutCompletedHandler
{
    public function handle(array $event)
    {
        $write = app(ProgressWriteService::class);
        $builder = app(DailyProjectionBuilder::class);

        $write->logWorkout($event['payload']);
        $builder->rebuildDaily($event['payload']['user_id']);
    }
}
