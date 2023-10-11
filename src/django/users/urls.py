from django.urls import path

from .email_views import CustomUserViewSet
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
)

urlpatterns = [
    path("jwt/create/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("jwt/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("jwt/verify/", CustomTokenVerifyView.as_view(), name="token_verify"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path(
        "users/reset_password/", CustomUserViewSet.as_view({"post": "reset_password"})
    ),
    path(
        "users/reset_password_confirm/",
        CustomUserViewSet.as_view({"post": "reset_password_confirm"}),
    ),
]
