from rest_framework import serializers
from .models import GeoObject


class GeoObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoObject
        fields = '__all__'