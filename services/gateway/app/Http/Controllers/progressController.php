<?php

namespace App\Http\Controllers;

use App\Infrastructure\RabbitMQRpcClient;
use App\Traits\ValidatesJwt;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    use ValidatesJwt;

    protected RabbitMQRpcClient $rpc;
    private $queueName = 'progress_rpc';

    public function __construct(RabbitMQRpcClient $rpc)
    {
        $this->rpc = $rpc;
    }

    /**
     * الحصول على تقدم يومي
     */
    public function getDailyProgress(Request $request)
    {
        $jwt = $request->bearerToken();

        $this->validateToken($jwt);

        $response = $this->rpc->call($this->queueName, [
            'action' => 'get_daily_progress',
            'payload' => [
                'user_id' => $request->input('user_id'),
                'date' => $request->input('date'),
            ],
        ]);

        return response()->json($response);
    }

    /**
     * الحصول على تقدم أسبوعي
     */
    public function getWeeklyProgress(Request $request)
    {
        $jwt = $request->bearerToken();
        $this->validateToken($jwt);


        $response = $this->rpc->call($this->queueName, [
            'action' => 'get_weekly_progress',
            'payload' => [
                'user_id' => $request->input('user_id'),
                'week_start' => $request->input('week_start'),
            ],
        ]);

        return response()->json($response);
    }


    /**
     * الحصول على تقدم تمرين محدد
     */
    public function getExerciseProgress(Request $request)
    {
        $jwt = $request->bearerToken();
        $this->validateToken($jwt);

        $response = $this->rpc->call($this->queueName, [
            'action' => 'get_exercise_progress',
            'payload' => [
                'user_id' => $request->input('user_id'),
                'exercise_name' => $request->input('exercise_name'),
            ],
        ]);

        return response()->json($response);
    }


    public function getTrainDayProgress(Request $request)
    {
        $jwt = $request->bearerToken();
        $this->validateToken($jwt);

        $response = $this->rpc->call($this->queueName, [
            'action' => 'get_train_day_progress',
            'payload' => [
                'user_id' => $request->input('user_id'),
                'train_day_name' => $request->input('train_day_name'),
            ],
        ]);

        return response()->json($response);
    }
}
