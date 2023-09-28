from django.urls import path

from .views import StoryList

urlpatterns = [
    path("stories/", StoryList.as_view(), name="story-list"),
]
