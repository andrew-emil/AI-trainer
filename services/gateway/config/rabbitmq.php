<?php
return [
    'host' => env('RABBITMQ_HOST', 'rabbitmq'),
    'port' => env('RABBITMQ_PORT', 5672),
    'user' => env('RABBITMQ_USER', 'guest'),
    'pass' => env('RABBITMQ_PASSWORD', 'guest'),
    'default_queue' => env('RABBITMQ_DEFAULT_QUEUE', 'user_service_queue'),
    'exchange' => env('RABBITMQ_EXCHANGE', 'ai_trainer_exchange'),
];
