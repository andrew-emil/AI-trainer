<?php

namespace App\messaging;

use PhpAmqpLib\Connection\AMQPStreamConnection;

class RabbitMQConnection
{
    public function channel()
    {
        $conn = new AMQPStreamConnection(
            env('RABBITMQ_HOST'),
            env('RABBITMQ_PORT'),
            env('RABBITMQ_USER'),
            env('RABBITMQ_PASSWORD')
        );
        return $conn->channel();
    }
}
