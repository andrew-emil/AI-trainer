<?php

namespace App\Traits;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Illuminate\Http\JsonResponse;

trait ValidatesJwt
{
    /**
     * Validate a JWT token and return decoded payload.
     *
     * @param string|null $token
     * @return object|JsonResponse
     */
    public function validateToken(?string $token)
    {
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized, token missing'
            ], 401);
        }

        $secretKey = env('JWT_SECRET');

        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            return $decoded; // object containing payload
        } catch (ExpiredException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token expired'
            ], 401);
        } catch (SignatureInvalidException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid signature'
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }
    }

    /**
     * Extract user_id from token or return error response.
     *
     * @param string|null $token
     * @return int|JsonResponse
     */
    public function getUserIdFromToken(?string $token)
    {
        $decoded = $this->validateToken($token);

        if ($decoded instanceof JsonResponse) {
            return $decoded; // error response
        }

        return $decoded->sub ?? null; // assuming "sub" contains user_id
    }
}
