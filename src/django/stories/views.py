from rest_framework import generics, response, status, views, viewsets

from .models import Module, Story
from .serializers import ModuleSerializer, StorySerializer


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer


class StoryListByModuleID(generics.ListAPIView):
    serializer_class = StorySerializer

    def get_queryset(self):
        module_id = self.kwargs["module_id"]
        return Story.objects.filter(module__id=module_id)


class StoryDetailByLanguage(views.APIView):
    """
    Retrieve a Story instance with conversations and translations by language.
    """

    def get(self, request, story_id, language_code, format=None):
        try:
            story = Story.objects.get(id=story_id)
        except Story.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        # Filter conversations and translations by the specified language
        serializer = StorySerializer(story, context={"language_code": language_code})
        return response.Response(serializer.data)
