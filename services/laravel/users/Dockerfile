# ---- Base Image ----
FROM php:8.2-cli

# ---- System Dependencies ----
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev libzip-dev netcat-openbsd \
    && docker-php-ext-install pdo pdo_pgsql bcmath zip sockets \
    && rm -rf /var/lib/apt/lists/*

# ---- Composer ----
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Set Working Directory ----
WORKDIR /app

# ---- Copy Application Files ----
COPY . .

# ---- Install Dependencies ----
RUN composer install --no-dev --optimize-autoloader

# Install Redis extension
RUN pecl install redis \
    && docker-php-ext-enable redis

# ---- Copy and Set Entrypoint ----
COPY ./scripts/php-fpm-entrypoint /usr/local/bin/php-entrypoint
RUN chmod +x /usr/local/bin/php-entrypoint

# ---- Entrypoint ----
ENTRYPOINT ["/usr/local/bin/php-entrypoint"]

# ---- Default Command (optional) ----
CMD ["php", "-a"]
