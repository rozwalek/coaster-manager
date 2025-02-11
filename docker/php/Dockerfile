# Używamy obrazu PHP 8.1 lub najnowszego dostępnego (PHP-FPM)
FROM php:8.1-fpm

# Instalacja wymaganych rozszerzeń PHP
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libzip-dev git libicu-dev libmemcached-dev zlib1g-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd zip intl opcache && \
    pecl install redis && \
    docker-php-ext-enable redis

# Instalacja Nginx
RUN apt-get install -y nginx

# Instalacja nano
RUN apt-get update && apt-get install -y nano

# Kopiowanie plików aplikacji
COPY ./ /var/www/html

# Konfiguracja Nginx
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Instalacja Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Zmiana katalogu roboczego na /var/www/html
WORKDIR /var/www/html

# Instalacja zależności aplikacji za pomocą Composera
RUN composer install

# Ustawienie portów
EXPOSE 80

# Start Nginx i PHP-FPM
CMD service nginx start && php-fpm
