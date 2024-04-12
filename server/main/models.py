from django.db import models

class GeoObject(models.Model):
    object_data = models.JSONField()
