from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import GeoObjectSerializer
from .models import GeoObject


@api_view(['POST'])
def save_geojson(request):
    if request.method == 'POST':
        serializer = GeoObjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'GeoJSON data saved successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def get_geojson(request):
    if request.method == 'GET':
        geo_objects = GeoObject.objects.all()
        serializer = GeoObjectSerializer(geo_objects, many=True)
        return Response(serializer.data)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)