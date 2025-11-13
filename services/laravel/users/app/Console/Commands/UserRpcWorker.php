<?php

namespace App\Console\Commands;

use App\Services\AuthenticationService;
use App\Services\UserService;
use App\Services\AuthorizationService;
use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Exception\AMQPTimeoutException;

class UserRpcWorker extends Command
{
    protected $signature = 'rabbitmq:rpc-user';
    protected $description = 'User service RPC listener for RabbitMQ';

    protected AuthenticationService $authenticationService;
    protected AuthorizationService $authorizationService;

    public function __construct()
    {
        parent::__construct();
        $this->authenticationService = new AuthenticationService();
        $this->authorizationService = new AuthorizationService();
    }

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
            120,         // read_write_timeout
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

    protected function processRequest(array $request): array
    {
        try {
            $action = $request['action'] ?? null;
            $service = new UserService($this->authorizationService, $this->authenticationService);

            switch ($action) {
                case 'create_user':
                    // Public endpoint, no JWT required
                    $user = $service->createUser($request['data'] ?? []);
                    return ['status' => 'success', 'data' => $user];
                case 'login':
                    // Public endpoint, no JWT required
                    $email = $request['data']['email'] ?? '';
                    $password = $request['data']['password'] ?? '';
                    $result = $service->login($email, $password);
                    if (!$result) {
                        return ['status' => 'error', 'message' => 'Invalid credentials'];
                    }
                    return ['status' => 'success', 'data' => $result];
                case 'register':
                    // Public endpoint, no JWT required
                    $user = $service->createUser($request['data'] ?? []);
                    return ['status' => 'success', 'data' => $user];

                case 'update_user':
                case 'delete_user':
                case 'get_user':
                case 'get_users':
                    // Protected actions: require JWT
                    $jwt = $request['token'] ?? null;
                    if (!$jwt) {
                        return ['status' => 'error', 'message' => 'Unauthorized: missing token'];
                    }

                    // Pass token to service; service will decode and authorize
                    if ($action === 'update_user') {
                        $user = $service->updateUser(
                            $jwt,
                            (int) ($request['id'] ?? 0),
                            $request['data'] ?? []
                        );
                        if (!$user) {
                            return ['status' => 'error', 'message' => 'User not found'];
                        }
                        return ['status' => 'success', 'data' => $user];
                    }

                    if ($action === 'delete_user') {
                        $deleted = $service->deleteUser(
                            $jwt,
                            (int) ($request['id'])
                        );
                        if (!$deleted) {
                            return ['status' => 'error', 'message' => 'User not found'];
                        }
                        return ['status' => 'success', 'message' => 'User deleted successfully'];
                    }

                    if ($action === 'get_user') {
                        $user = $service->getUserById((int) ($request['id'] ?? 0), $jwt);
                        if (!$user) {
                            return ['status' => 'error', 'message' => 'User not found'];
                        }
                        return ['status' => 'success', 'data' => $user];
                    }

                    if ($action === 'get_users') {
                        $users = $service->getAllUsers($jwt);
                        return ['status' => 'success', 'data' => $users];
                    }

                    break;

                case 'ping':
                    return ['status' => 'ok', 'message' => 'pong'];

                default:
                    return ['status' => 'error', 'message' => 'Unknown action'];
            }
        } catch (ValidationException $e) {
            return [
                'status' => 'validation_error',
                'errors' => $e->errors(),
            ];
        } catch (AuthorizationException $e) {
            return [
                'status' => 'forbidden',
                'message' => $e->getMessage(),
            ];
        } catch (\Throwable $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }

        // Fallback return to satisfy static analyzers: ensure an array is always returned.
        return ['status' => 'error', 'message' => 'Unknown action'];
    }
}
