<?php

namespace App\Events\Handlers;

use App\Projections\DailyProjectionBuilder;
use App\Services\ProgressWriteService;

class BodyMeasurementsHandler
{
    public function handle(array $event)
    {
        $write = app(ProgressWriteService::class);
        $builder = app(DailyProjectionBuilder::class);

        $write->logNutrition($event['payload']);
        $builder->rebuildDaily($event['payload']['user_id']);
    }
}
