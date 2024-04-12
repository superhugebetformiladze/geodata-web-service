from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import GeoObjectSerializer

@api_view(['POST'])
def save_geojson(request):
    if request.method == 'POST':
        print("request_______________________: ", request.data, "\n\n\n")
        serializer = GeoObjectSerializer(data=request.data)
        print("serializer_______________________: ", serializer, "\n\n\n")
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'GeoJSON data saved successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
