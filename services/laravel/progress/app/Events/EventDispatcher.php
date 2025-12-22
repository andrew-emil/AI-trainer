<?php

namespace App\Events;

use App\Events\Handlers\BodyMeasurementsHandler;
use App\Events\Handlers\NutritionCompletedHandler;
use App\Events\Handlers\WorkoutCompletedHandler;

class EventDispatcher
{
    protected array $map = [
        'workout.completed' => WorkoutCompletedHandler::class,
        'nutrition.logged'  => NutritionCompletedHandler::class,
        'body_measurements.logged' => BodyMeasurementsHandler::class,
    ];

    public function dispatch(array $event): void
    {
        if (!isset($this->map[$event['type']])) {
            logger()->warning('Unhandled event', $event);
            return;
        }

        app($this->map[$event['type']])->handle($event);
    }
}
