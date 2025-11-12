<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Infrastructure\RabbitMQRpcClient;

class UserController extends Controller
{
    protected RabbitMQRpcClient $rpc;

    /**
     * Inject the RabbitMQRpcClient singleton.
     */
    public function __construct(RabbitMQRpcClient $rpc)
    {
        $this->rpc = $rpc;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'get_users',
        ]);

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        if (!$request->validated()) {
            return response()->json(['status' => 'error', 'message' => 'Invalid data'], 400);
        }
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'create_user',
            'data' => $request->validated(),
        ]);

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'get_user',
            'id' => $id,
        ]);

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        if (!$request->validated()) {
            return response()->json(['status' => 'error', 'message' => 'Invalid data'], 400);
        }
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'update_user',
            'id' => $id,
            'data' => $request->validated(),
        ]);

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'delete_user',
            'id' => $id,
        ]);

        return response()->json($response);
    }
}
