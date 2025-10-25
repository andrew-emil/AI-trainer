FROM php:8.3-fpm

# Install dependencies and PostgreSQL client
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev netcat-traditional \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies and generate app key
RUN composer install --no-interaction --prefer-dist \
    && php artisan key:generate

# Copy entrypoint
COPY ./scripts/php-fpm-entrypoint /usr/local/bin/php-fpm-entrypoint
RUN chmod +x /usr/local/bin/php-fpm-entrypoint

EXPOSE 8000

# Set entrypoint and command
ENTRYPOINT ["/usr/local/bin/php-fpm-entrypoint"]
# CMD ["php-fpm"]
