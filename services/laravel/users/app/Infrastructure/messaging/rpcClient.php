<?php

// use PhpAmqpLib\Connection\AMQPStreamConnection;
// use PhpAmqpLib\Message\AMQPMessage;

// $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');
// $channel = $connection->channel();
// $channel->queue_declare('user_service_rpc_queue', false, false, false, false);

// echo " [x] Awaiting RPC requests\n";

// $callback = function ($req) use ($channel) {
//     $data = json_decode($req->body, true);
//     $user = ['id' => $data['id'], 'name' => 'John Doe'];

//     $msg = new AMQPMessage(
//         json_encode($user),
//         ['correlation_id' => $req->get('correlation_id')]
//     );

//     $channel->basic_publish($msg, '', $req->get('reply_to'));
//     $channel->basic_ack($req->get('delivery_tag'));
// };

// $channel->basic_qos(null, 1, null);
// $channel->basic_consume('user_service_rpc_queue', '', false, false, false, false, $callback);

// while ($channel) {
//     $channel->wait();
// }
