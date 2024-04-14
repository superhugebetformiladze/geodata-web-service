from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import RegisterView, MyTokenObtainPairView

urlpatterns = [
    path('api/save_geojson/', views.save_geojson, name='save_geojson'),
    path('api/get_geojson/', views.get_geojson, name='get_geojson'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
]
