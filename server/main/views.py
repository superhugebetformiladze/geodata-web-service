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

            request.data['user'] = user_id

            # Создание пустого гео-объекта
            geo_object = GeoObject.objects.create(object_data={})
            request.data['geo_object'] = geo_object.id

            serializer = ProjectSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                print("\n\nserializer errors:\n", serializer.errors, "\n\n")
                return Response(serializer.errors, status=400)

        raise AuthenticationFailed('unauthenticated')

class ProjectDetailAPIView(APIView):
    def get_object(self, project_id, user_id):
        try:
            return Project.objects.get(pk=project_id, user_id=user_id)
        except Project.DoesNotExist:
            raise NotFound('Project not found')

    def get(self, request, project_id):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)

            project = self.get_object(project_id, user_id)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        raise AuthenticationFailed('unauthenticated')

    def put(self, request, project_id):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)
            

            project = self.get_object(project_id, user_id)

            geo_object_id = project.geo_object.id

            request.data['user'] = user_id
            request.data['geo_object'] = geo_object_id

            serializer = ProjectSerializer(project, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                print("\n\nserializer errors:\n", serializer.errors, "\n\n")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        raise AuthenticationFailed('unauthenticated')

    def delete(self, request, project_id):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)

            project = self.get_object(project_id, user_id)
            geo_object = project.geo_object
            if geo_object:
                geo_object.delete()
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        raise AuthenticationFailed('unauthenticated')
    

class PostGeoObjectAPIView(APIView):
    def put(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:

            geo_id = request.data.get('id')
            geo_data = request.data.get('geo_data')

            try:
                geo_object = GeoObject.objects.get(pk=geo_id)
            except GeoObject.DoesNotExist:
                return Response({'error': 'GeoObject not found'}, status=404)

            geo_object_data = {
                'id': geo_id,
                'object_data': geo_data
            }

            serializer = GeoObjectSerializer(geo_object, data=geo_object_data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                print("\n\nserializer errors:\n", serializer.errors, "\n\n")
                return Response(serializer.errors, status=400)

        raise AuthenticationFailed('unauthenticated')
    
class GetGeoObjectAPIView(APIView):
    def get_object(self, geo_object_id):
        try:
            return GeoObject.objects.get(pk=geo_object_id)
        except GeoObject.DoesNotExist:
            raise NotFound('GeoObject not found')
        
    def get(self, request, geo_object_id):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            
            geo_object = self.get_object(geo_object_id)
            print("\n\ngeo_object:\n", geo_object.object_data, "\n\n")

            serializer = GeoObjectSerializer(geo_object)
            print("\n\nserializer:\n", serializer.data, "\n\n")
            return Response(serializer.data)
        raise AuthenticationFailed('unauthenticated')