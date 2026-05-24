from .base import *

DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'yourdb',
        'USER': 'youruser',
        'PASSWORD': 'yourpass',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://192.168.130.236:4200",
    "http://192.168.130.236:8000",
    "https://192.168.130.236",
    "https://192.168.130.236:4200",
    "https://192.168.130.236:8000",
    "https://yourdomain.com",
]

# Add security settings as needed