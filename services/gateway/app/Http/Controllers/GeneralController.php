<?php

namespace App\Http\Controllers;

use App\Infrastructure\RabbitMQRpcClient;

class GeneralController extends Controller
{
    public function getUser($id)
    {
        $rpc = new RabbitMQRpcClient();

        $response = $rpc->call('user_service_rpc_queue', [
            'action' => 'get_user',
            'id' => $id,
        ]);

        return response()->json($response);
    }
}
