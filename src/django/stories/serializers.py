from rest_framework import serializers

from .models import Conversation, Story, Translation

# In Django Rest Framework (DRF), a serializer is a component that allows you to convert
# complex data types, such as Django models, into Python data types that can be easily
# rendered into JSON, XML, or other content types. In other words, serializers allow you
# to “translate” Django models into a format that can be sent as a response to a client
# or received as a payload from a client.


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ["language_code", "translated_content"]


class ConversationSerializer(serializers.ModelSerializer):
    translations = TranslationSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["sequence", "character_name", "content_english", "translations"]


class StorySerializer(serializers.ModelSerializer):
    conversations = ConversationSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = [
            "id",
            "title",
            "description",
            "audio_link",
            "created_at",
            "updated_at",
            "conversations",
        ]
