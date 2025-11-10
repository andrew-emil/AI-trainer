<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Exception\AMQPTimeoutException;

class UserRpcWorker extends Command
{
    protected $signature = 'rabbitmq:rpc-user';
    protected $description = 'User service RPC listener for RabbitMQ';

    public function handle()
    {
        $this->info(' [*] Starting User RPC Worker...');

        $connection = new AMQPStreamConnection(
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
            120,         // read_write_timeout (>= 2x heartbeat)
            null,        // context
            0,           // keepalive
            60           // heartbeat
        );



        $channel = $connection->channel();
        $queueName = 'user_service_rpc_queue';

        $channel->queue_declare($queueName, false, false, false, false);
        $channel->basic_qos(null, 1, null);

        $callback = function ($req) use ($channel) {
            $request = json_decode($req->body, true);
            $this->info(" [x] Received request: " . json_encode($request));

            $response = $this->processRequest($request);

            $msg = new AMQPMessage(
                json_encode($response),
                ['correlation_id' => $req->get('correlation_id')]
            );

            $channel->basic_publish($msg, '', $req->get('reply_to'));
            $channel->basic_ack($req->get('delivery_tag'));
        };

        $channel->basic_consume($queueName, '', false, false, false, false, $callback);

        $this->info(" [*] Waiting for messages...");

        try {
            while ($connection->isConnected()) {
                // Wait indefinitely for messages
                $channel->wait();
            }
        } catch (AMQPTimeoutException $e) {
            $this->error(" [!] AMQP Timeout: " . $e->getMessage());
        } catch (\Exception $e) {
            $this->error(" [!] Worker error: " . $e->getMessage());
        } finally {
            $channel->close();
            $connection->close();
            $this->info(" [*] Worker stopped.");
        }
    }

    protected function processRequest($request)
    {
        switch ($request['action'] ?? null) {
            case 'get_user':
                return [
                    'status' => 'success',
                    'data' => [
                        'id' => $request['id'],
                        'name' => 'John Doe',
                        'email' => 'john@example.com',
                    ],
                ];
            case 'ping':
                return ['status' => 'ok', 'message' => 'pong'];
            default:
                return ['status' => 'error', 'message' => 'Unknown action'];
        }
    }
}
