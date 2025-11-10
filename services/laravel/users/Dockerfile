# ---- Base Image ----
FROM php:8.2-cli

# ---- System Dependencies ----
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql bcmath zip

# ---- Composer ----
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Set Working Directory ----
WORKDIR /app

# ---- Copy Files ----
COPY . .

# ---- Install Dependencies ----
RUN composer install --no-dev --optimize-autoloader
RUN docker-php-ext-install sockets

# ---- Command: Run RPC Worker ----
CMD ["php", "artisan", "rabbitmq:rpc-user"]
