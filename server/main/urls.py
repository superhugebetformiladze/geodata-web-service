from django.urls import path
from . import views
from .views import (RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView, LogoutAPIView, 
                    CreateProjectAPIView, UserProjectsAPIView, ProjectDetailAPIView, 
                    PostGeoObjectAPIView, GetGeoObjectAPIView, GetGeoObjectForScriptAPIView,
                    CreateGeoObjectAPIView, EditGeoObjectAPIView, DeleteGeoObjectAPIView)

urlpatterns = [
    path('save_geo_object', PostGeoObjectAPIView.as_view(), name='save_geojson'),
    path('get_geo_object/<int:geo_object_id>', GetGeoObjectAPIView.as_view(), name='get_geojson'),
    path('register', RegisterAPIView.as_view(), name='register'),
    path('login', LoginAPIView.as_view(), name='login'),
    path('user', UserAPIView.as_view(), name='user'),
    path('refresh', RefreshAPIView.as_view(), name='refresh'),
    path('logout', LogoutAPIView.as_view(), name='logout'),
    path('projects/create', CreateProjectAPIView.as_view(), name='create_project'),
    path('projects', UserProjectsAPIView.as_view(), name='projects'),
    path('projects/<int:project_id>', ProjectDetailAPIView.as_view(), name='project_detail'),
    path('get_geo_object_script/<int:geo_object_id>', GetGeoObjectForScriptAPIView.as_view(), name='get_geojson_script'),
    path('create-geoobject', CreateGeoObjectAPIView.as_view(), name='create-geoobject'),
    path('edit-geoobject/<int:geo_object_id>', EditGeoObjectAPIView.as_view(), name='edit-geoobject'),
    path('delete-geoobject/<int:geo_object_id>', DeleteGeoObjectAPIView.as_view(), name='delete-geoobject'),
]
