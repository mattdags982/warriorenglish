from rest_framework import serializers

from .models import Story

# In Django Rest Framework (DRF), a serializer is a component that allows you to convert
# complex data types, such as Django models, into Python data types that can be easily
# rendered into JSON, XML, or other content types. In other words, serializers allow you
# to “translate” Django models into a format that can be sent as a response to a client
# or received as a payload from a client.


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ["id", "title", "description", "content"]
