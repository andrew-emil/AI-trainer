<?php

namespace App\messaging;

use PhpAmqpLib\Connection\AMQPStreamConnection;

class RabbitMQConnection
{
    public function channel()
    {
        $conn = new AMQPStreamConnection(
            env('RABBITMQ_HOST', 'rabbitmq'),
            env('RABBITMQ_PORT', 5672),
            env('RABBITMQ_USER', 'admin'),
            env('RABBITMQ_PASSWORD', 'admin123'),
            '/',         // vhost
            false,       // insist
            'AMQPLAIN',  // login method
            null,        // login response
            'en_US',     // locale
            0,           // connection_timeout
            120,         // read_write_timeout
            null,        // context
            0,           // keepalive
            60           // heartbeat
        );
        return $conn->channel();
    }
}
