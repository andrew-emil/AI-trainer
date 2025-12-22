<?php

namespace App\Events\Handlers;

use App\Projections\WeeklyProjectionBuilder;
use App\Services\ProgressWriteService;

class BodyMeasurementsHandler
{
    public function handle(array $event)
    {
        $write = app(ProgressWriteService::class);
        $builder = app(WeeklyProjectionBuilder::class);

        $write->logBodyMeasurement($event['payload']);
        $builder->rebuildWeekly($event['payload']['user_id']);
    }
}
