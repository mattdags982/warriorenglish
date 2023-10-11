"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("blog.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include("stories.urls")),
    # added for auth jwt
    path("api/", include("app.api.urls")),
    # djoser
    # the ORDER OF THIS matter because it will match the first one it finds
    path("auth/", include("users.urls")),
    # I wonder if ill be able to remove this because the custom user viewset will take care of djoser stuff
    path("auth/", include("djoser.urls")),
]

# this is for all the other paths (djoser). Im not positive, but this may need to be updated later on
urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
