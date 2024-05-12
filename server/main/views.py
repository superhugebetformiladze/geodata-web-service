from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, AuthenticationFailed, NotFound
from rest_framework import status
from rest_framework.authentication import get_authorization_header

from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from .serializers import GeoObjectSerializer, UserSerializer, ProjectSerializer
from .models import GeoObject, User, Project


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()

        if not user:
            raise APIException('Пользователя с таким email не существует!')

        if not user.check_password(request.data['password']):
            raise APIException('Неверный пароль!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()

        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }

        return response


class UserAPIView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()

            return Response(UserSerializer(user).data)

        raise AuthenticationFailed('unauthenticated')


class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })


class LogoutAPIView(APIView):
    def post(self, _):
        response = Response()
        response.delete_cookie(key="refreshToken")
        response.data = {
            'message': 'success'
        }
        return response


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


class UserProjectsAPIView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)

            projects = Project.objects.filter(user_id=user_id)
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data)

        raise AuthenticationFailed('unauthenticated')
    
class CreateProjectAPIView(APIView):
    def post(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)

            request.data['user'] = user_id  # добавляем идентификатор пользователя к данным проекта

            # Создание пустого гео-объекта
            geo_object = GeoObject.objects.create(object_data={})
            request.data['geo_object'] = geo_object.id

            serializer = ProjectSerializer(data=request.data)
            print("\n\ndata:\n", request.data, "\n\n")
            print("\n\nserializer:\n", serializer, "\n\n")
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                print("\n\nserializer errors:\n", serializer.errors, "\n\n")
                return Response(serializer.errors, status=400)

        raise AuthenticationFailed('unauthenticated')

class ProjectDetailAPIView(APIView):
    def get(self, request, project_id):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)

            try:
                project = Project.objects.get(pk=project_id, user_id=user_id)
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
            except Project.DoesNotExist:
                raise NotFound('Project not found')

        raise AuthenticationFailed('unauthenticated')