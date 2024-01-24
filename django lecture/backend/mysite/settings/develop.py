from .base import *

SECRET_KEY = 'django-insecure-2*+vy-%9oyn5cr)oby-97i9_eq&=6@4l0n9&=@y+%q(!t1lq=t'

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}