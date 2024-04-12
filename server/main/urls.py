from django.urls import path
from . import views

urlpatterns = [
    path('api/save_geojson/', views.save_geojson, name='save_geojson'),
    path('api/get_geojson/', views.get_geojson, name='get_geojson'),
]
