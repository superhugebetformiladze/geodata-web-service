from rest_framework import serializers
from .models import GeoObject, User, Project
from rest_framework.serializers import ModelSerializer


class GeoObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoObject
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class ProjectSerializer(serializers.ModelSerializer):
    geo_object = GeoObjectSerializer()

    class Meta:
        model = Project
        fields = '__all__'