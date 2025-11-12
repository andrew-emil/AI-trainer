<?php

namespace App\Providers;

use App\Infrastructure\RabbitMQRpcClient;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(RabbitMQRpcClient::class, function ($app) {
            return new RabbitMQRpcClient();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
