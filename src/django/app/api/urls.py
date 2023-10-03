from rest_framework_simplejwt.views import TokenRefreshView

from django.urls import path

from . import views

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("translations/", views.getTranslations, name="translations"),
]
