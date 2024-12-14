# syntax = docker/dockerfile:experimental

ARG PHP_VERSION=8.2
ARG NODE_VERSION=18
FROM fideloper/fly-laravel:${PHP_VERSION} as base

# PHP_VERSION needs to be repeated here
# See https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG PHP_VERSION

LABEL fly_launch_runtime="laravel"

# Set environment variables
ENV APP_ENV=production \
    LOG_CHANNEL=stderr \
    LOG_LEVEL=info \
    LOG_STDERR_FORMATTER="Monolog\\Formatter\\JsonFormatter" \
    SESSION_DRIVER=cookie \
    SESSION_SECURE_COOKIE=true

# Copy application code, skipping files based on .dockerignore
COPY . /var/www/html

RUN composer install --optimize-autoloader --no-dev \
    && mkdir -p storage/logs \
    && chown -R www-data:www-data /var/www/html

COPY .fly/entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

# Multi-stage build: Build static assets
FROM node:${NODE_VERSION} as node_modules

RUN mkdir -p /app
WORKDIR /app
COPY . .
COPY --from=base /var/www/html/vendor /app/vendor

# Use yarn or npm depending on what type of lock file we might find. Defaults to NPM if no lock file is found.
RUN npm ci --no-audit; \
    npm run build;

# From our base container created above, we create our final image, adding in static assets that we generated above
FROM base

# Packages like Laravel Nova may have added assets to the public directory or maybe some custom assets were added manually!
# Either way, we merge in the assets we generated above rather than overwrite them
COPY --from=node_modules /app/public /var/www/html/public-npm
RUN rsync -ar /var/www/html/public-npm/ /var/www/html/public/ \
    && rm -rf /var/www/html/public-npm \
    && chown -R www-data:www-data /var/www/html/public

# Expose port (ensure this matches the internal_port if relevant)
EXPOSE 8080

ENTRYPOINT ["/entrypoint"]
