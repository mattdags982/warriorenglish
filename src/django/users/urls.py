from django.urls import path
from rest_framework.routers import DefaultRouter

from .email_views import CustomUserViewSet
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
)

router = DefaultRouter()
router.register(r"users", CustomUserViewSet)

urlpatterns = [
    path("jwt/create/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("jwt/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("jwt/verify/", CustomTokenVerifyView.as_view(), name="token_verify"),
    path("logout/", LogoutView.as_view(), name="logout"),
]

urlpatterns += router.urls
