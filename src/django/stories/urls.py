from rest_framework import routers

from django.urls import include, path

from .views import ModuleViewSet, StoryDetailByLanguage, StoryListByModuleID

router = routers.DefaultRouter()
router.register(r"modules", ModuleViewSet)
# urlpatterns = router.urls


urlpatterns = [
    path(
        "stories/<int:module_id>/",
        StoryListByModuleID.as_view(),
        name="story-list-by-module-id",
    ),
    path(
        "story/<int:story_id>/<str:language_code>/",
        StoryDetailByLanguage.as_view(),
        name="story-detail-by-language",
    ),
    path("", include(router.urls)),
]
