from rest_framework import generics

from .models import Story
from .serializers import StorySerializer


class StoryList(generics.ListAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
