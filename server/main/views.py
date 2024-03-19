from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
import requests

class PlaceSerializer(serializers.Serializer):
    display_name = serializers.CharField()
    lat = serializers.CharField()
    lon = serializers.CharField()

@api_view(['GET'])
def search_places(request):
    query = request.GET.get('query')
    url = f'https://nominatim.openstreetmap.org/search?q={query}&format=json'
    response = requests.get(url)
    data = response.json()
    serializer = PlaceSerializer(data, many=True)
    return Response(serializer.data)
