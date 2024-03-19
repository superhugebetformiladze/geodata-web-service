from django.urls import path
from . import views

urlpatterns = [
    path('search-places/', views.search_places, name='search_places'),
]
