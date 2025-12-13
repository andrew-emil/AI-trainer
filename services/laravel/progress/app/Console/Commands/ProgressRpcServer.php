<?php

namespace App\Console\Commands;

use App\messaging\RabbitMQConnection;
use App\RpcHandler\RpcHandler;
use Illuminate\Console\Command;
use PhpAmqpLib\Message\AMQPMessage;

class ProgressRpcServer extends Command
{
    protected $signature = 'rabbitmq:progress-rpc';

    public function handle()
    {
        $channel = app(RabbitMQConnection::class)->channel();
        $channel->queue_declare('progress_rpc', false, false, false, false);

        $channel->basic_consume(
            'progress_rpc',
            '',
            false,
            false,
            false,
            false,
            function ($req) use ($channel) {
                $request = json_decode($req->body, true);
                $response = app(RpcHandler::class)->handle($request);

                $msg = new AMQPMessage(
                    json_encode($response),
                    ['correlation_id' => $req->get('correlation_id')]
                );

                $channel->basic_publish($msg, '', $req->get('reply_to'));
            }
        );

        while ($channel) {
            $channel->wait();
        }
    }
}
