<?php
return [
    // service group name
    'user' => [
        'queue' => 'user_service_queue',
        'routes' => [
            'POST /api/login' => ['action' => 'login', 'rpc' => true],
            'POST /api/register' => ['action' => 'register', 'rpc' => true],
        ],
    ],
    'workout' => [
        'queue' => 'workout_service_queue',
        'routes' => [
            'POST /api/workouts' => ['action' => 'create', 'rpc' => false],
            'GET /api/workouts' => ['action' => 'list', 'rpc' => true],
        ],
    ],
];
