<?php

namespace App\Console\Commands;

use App\Events\EventDispatcher;
use App\messaging\RabbitMQConnection;
use Illuminate\Console\Command;

class ConsumeProgressEvents extends Command
{
    protected $signature = 'rabbitmq:consume-events';

    public function handle()
    {
        $channel = app(RabbitMQConnection::class)->channel();
        $channel->queue_declare('progress_events', false, true, false, false);

        $channel->basic_consume(
            'progress_events',
            '',
            false,
            false,
            false,
            false,
            function ($msg) {
                $event = json_decode($msg->body, true);
                app(EventDispatcher::class)->dispatch($event);
                $msg->ack();
            }
        );

        while ($channel) {
            $channel->wait();
        }
    }
}
