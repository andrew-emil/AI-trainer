<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Infrastructure\RabbitMQRpcClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function index(Request $request)
    {
        $jwt = $request->bearerToken();
        if (!$jwt) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'get_users',
            'token' => $jwt,
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
        // Validate request
        $validatedData = $request->validated();
        if (!$validatedData) {
            return response()->json(['status' => 'error', 'message' => 'Invalid data'], 400);
        }

        // Extract JWT from request header
        $jwt = $request->bearerToken();
        if (!$jwt) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }

        // Prepare RPC payload
        $payload = [
            'action' => 'update_user',
            'token' => $jwt,   // Pass JWT so microservice can authenticate & authorize
            'id' => $id,
            'data' => $validatedData,
        ];

        // Call the microservice via RPC
        $response = $this->rpc->call('user_service_rpc_queue', $payload);

        return response()->json($response);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        // Extract JWT from Authorization header
        $jwt = $request->bearerToken();
        if (!$jwt) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }

        // Prepare RPC payload
        $payload = [
            'action' => 'delete_user',
            'token' => $jwt,   // Pass JWT to microservice
            'id' => $id,
        ];

        // Call RPC worker
        $response = $this->rpc->call('user_service_rpc_queue', $payload);

        return response()->json($response);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
        $credentials = $request->only('email', 'password');
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'login',
            'data' => $credentials,
        ]);
        return response()->json($response);
    }

    public function register(UserRequest $request)
    {
        if (!$request->validated()) {
            return response()->json(['status' => 'error', 'message' => 'Invalid data'], 400);
        }
        $response = $this->rpc->call('user_service_rpc_queue', [
            'action' => 'register',
            'data' => $request->validated(),
        ]);

        return response()->json($response);
    }

    public function logout(Request $request)
    {
        // Extract JWT from Authorization header
        $jwt = $request->bearerToken();
        if (!$jwt) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }

        // Prepare RPC payload
        $payload = [
            'action' => 'logout',
            'token' => $jwt,   // Pass JWT to microservice
        ];

        // Call RPC worker
        $response = $this->rpc->call('user_service_rpc_queue', $payload);

        return response()->json($response);
    }

    public function refreshToken(Request $request)
    {
        $jwt = $request->bearerToken();
        if (!$jwt) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }
        $payload = [
            'action' => 'refresh_token',
            'token' => $jwt,   // Pass JWT to microservice
        ];
        $response = $this->rpc->call('user_service_rpc_queue', $payload);
        return response()->json($response);
    }
}
