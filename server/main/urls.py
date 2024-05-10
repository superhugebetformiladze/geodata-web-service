from django.urls import path
from . import views
from .views import (RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView, LogoutAPIView, 
                    CreateProjectAPIView, UserProjectsAPIView, ProjectDetailAPIView)

urlpatterns = [
    path('save_geojson/', views.save_geojson, name='save_geojson'),
    path('get_geojson/', views.get_geojson, name='get_geojson'),
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('user', UserAPIView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('projects/create', CreateProjectAPIView.as_view(), name='create_project'),
    path('projects', UserProjectsAPIView.as_view(), name='user_projects'),
    path('projects/<int:project_id>', ProjectDetailAPIView.as_view(), name='project_detail'),
]
