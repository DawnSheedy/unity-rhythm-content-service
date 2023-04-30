FROM python:3
ARG ENV

LABEL author='Dawn Sheedy'
LABEL version='1.0'

ENV PYTHONDONTWRITEBYTECODE=1
ENV NODE_VERSION=16.13.0
WORKDIR /code

ENV PYTHONUNBUFFERED=1 \
    PYTHONPATH=/code \
    DJANGO_SETTINGS_MODULE=application.settings \
    PORT=8000 \
    WEB_CONCURRENCY=3

# setup backend deps
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/

RUN python manage.py collectstatic --noinput --clear

RUN addgroup --system django \
    && adduser --system --ingroup django django

# Run as non-root user
RUN chown -R django:django /code
USER django

EXPOSE ${PORT}
# run gunicorn
CMD gunicorn application.wsgi:application --bind 0.0.0.0:$PORT