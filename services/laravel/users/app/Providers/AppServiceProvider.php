<?php

namespace App\Providers;

// use App\Constants\Abilities;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('update', fn(User $user, $model) => in_array('admin', $user->roles) || $user->id === $model->id);
        Gate::define('delete', fn(User $user, $model) => in_array('admin', $user->roles) || $user->id === $model->id);
        // Gate::define(Abilities::REPORTS_GENERATE, fn(User $user) => in_array('manager', $user->roles));
    }
}
