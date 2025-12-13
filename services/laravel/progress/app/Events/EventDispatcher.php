<?php

namespace App\Events;

use App\Events\Handlers\NutritionCompletedHandler;
use App\Events\Handlers\WorkoutCompletedHandler;
use App\Events\Handlers\StepsLoggedHandler;

class EventDispatcher
{
    protected array $map = [
        'workout.completed' => WorkoutCompletedHandler::class,
        'nutrition.logged'  => NutritionCompletedHandler::class,
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
