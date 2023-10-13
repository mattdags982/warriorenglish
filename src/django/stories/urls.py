from django.urls import include, path
from rest_framework import routers

from .views import ChapterDetailByLanguage, ChapterListByStoryID, StoryViewSet

router = routers.DefaultRouter()
router.register(r"stories", StoryViewSet)
# urlpatterns = router.urls


urlpatterns = [
    path(
        "chapters/<int:story_id>/",
        ChapterListByStoryID.as_view(),
        name="story-list-by-module-id",
    ),
    path(
        "chapter/<int:chapter_id>/<str:language_code>/",
        ChapterDetailByLanguage.as_view(),
        name="chapter-detail-by-language",
    ),
    path("", include(router.urls)),
]
