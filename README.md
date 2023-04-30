# django-docker-boilerplate

## To start

Install Docker

Run `make run` to start the app

## Access shell

To access a shell in the docker container (to run/create migrations) run `make shell`

## Heroku

This repo is ready to be deployed to heroku, set up heroku github integration to automatically deploy changes on one of your brances
For more serious projects, recommend creating a `production` branch instead of using `main`.

Heroku Postgres and Heroku Redis are required for operation.
If redis is not desired, you can opt to use a databse backed cache by modifying `application/settings.py`

## Required Environment Variables for Heroku Deployment (set up in heroku app)

If you set up the application to use django from the start some of these should auto import.
Otherwise, you need to attach Heroku Postgres and Heroku Redis for this app to work.

- `DATABASE_URL` - set by heroku postgres instance.
- `DJANGO_ALLOWED_HOSTS` - `domain1.com,domain2.com`
- `DJANGO_DEBUG` - `False`
- `DJANGO_SECRET_KEY` - secret key
- `REDIS_URL` - Redis connection URL for cache
- `REDIS_URL_TLS` - REDIS TLS URL, used instead of redis url if provided
- `SECURE_SSL_REDIRECT` - `True` makes django redirect requests on HTTP to HTTPS
- `WEB_CONCURRENCY` - `3` (this can also be set automatically by Heroku, this is a gunicorn setting)
