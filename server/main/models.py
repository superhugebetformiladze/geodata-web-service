from django.db import models
from django.contrib.auth.models import AbstractUser

class GeoObject(models.Model):
    object_data = models.JSONField(blank=True)

class Project(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='projects')
    geo_object = models.ForeignKey('GeoObject', on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, blank=True)

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    first_name = None
    last_name = None
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
