<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ProgressReadService
{
    /**
     * Get daily progress for a user
     */
    public function getDaily(int $userId, ?string $date = null): array
    {
        $date = $date ?? now()->toDateString();

        $row = DB::table('daily_progress')
            ->where('user_id', $userId)
            ->where('date', $date)
            ->first();

        return [
            'status' => 'ok',
            'data' => $row ? (array) $row : [
                'user_id'   => $userId,
                'date'      => $date,
                'workouts'  => 0,
                'steps'     => 0,
                'calories'  => 0,
            ]
        ];
    }

    /**
     * Weekly progress
     */
    public function getWeekly(int $userId, ?string $startDate = null): array
    {
        $start = $startDate
            ? now()->parse($startDate)
            : now()->startOfWeek();

        $end = $start->copy()->endOfWeek();

        $rows = DB::table('daily_progress')
            ->where('user_id', $userId)
            ->whereBetween('date', [$start->toDateString(), $end->toDateString()])
            ->get();

        return [
            'status' => 'ok',
            'range'  => [$start->toDateString(), $end->toDateString()],
            'data'   => $rows
        ];
    }

    /**
     * Monthly progress
     */
    public function getMonthly(int $userId, ?string $month = null): array
    {
        $date = $month ? now()->parse($month) : now();

        $rows = DB::table('daily_progress')
            ->where('user_id', $userId)
            ->whereMonth('date', $date->month)
            ->whereYear('date', $date->year)
            ->get();

        return [
            'status' => 'ok',
            'month'  => $date->format('Y-m'),
            'data'   => $rows
        ];
    }
}
