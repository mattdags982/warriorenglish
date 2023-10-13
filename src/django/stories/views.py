from rest_framework import generics, response, status, views, viewsets

from .models import Chapter, Story
from .serializers import ChapterSerializer, StorySerializer


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer


class ChapterListByStoryID(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        story_id = self.kwargs["story_id"]
        return Chapter.objects.filter(story__id=story_id)


class ChapterDetailByLanguage(views.APIView):
    """
    Retrieve a Chapter instance with blurbs and translations by language.
    """

    def get(self, request, chapter_id, language_code, format=None):
        try:
            chapter = Chapter.objects.get(id=chapter_id)
        except Chapter.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        # Filter blurbs and translations by the specified language
        serializer = ChapterSerializer(
            chapter, context={"language_code": language_code}
        )
        return response.Response(serializer.data)
