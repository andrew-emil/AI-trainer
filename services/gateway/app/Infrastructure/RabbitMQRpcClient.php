<?php

namespace App\Infrastructure;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use Illuminate\Support\Str;

class RabbitMQRpcClient
{
    protected $connection;
    protected $channel;
    protected $callbackQueue;
    protected $response;
    protected $corrId;

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection('rabbitmq', 5672, 'admin', 'admin123');
        echo "Connection successful!\n";
        $this->channel = $this->connection->channel();

        list($this->callbackQueue,,) = $this->channel->queue_declare("", false, false, true, false);

        $this->channel->basic_consume(
            $this->callbackQueue,
            '',
            false,
            true,
            false,
            false,
            [$this, 'onResponse']
        );
    }

    public function onResponse($rep)
    {
        if ($rep->get('correlation_id') == $this->corrId) {
            $this->response = $rep->body;
        }
    }

    public function call($queue, $message)
    {
        $this->response = null;
        $this->corrId = (string) Str::uuid();

        $msg = new AMQPMessage(
            json_encode($message),
            [
                'correlation_id' => $this->corrId,
                'reply_to' => $this->callbackQueue,
            ]
        );

        $this->channel->basic_publish($msg, '', $queue);

        // Wait for response
        while (!$this->response) {
            $this->channel->wait();
        }

        return json_decode((string) $this->response, true);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
