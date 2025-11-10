<?php
return [
    'host' => env('RABBITMQ_HOST', 'rabbitmq'),
    'port' => env('RABBITMQ_PORT', 5672),
    'user' => env('RABBITMQ_USER', 'guest'),
    'pass' => env('RABBITMQ_PASSWORD', 'guest'),
    'queue' => env('RABBITMQ_USER_QUEUE', 'user_service_queue'),
];
