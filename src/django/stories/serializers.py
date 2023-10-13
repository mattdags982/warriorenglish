from rest_framework import serializers

from .models import Blurb, Chapter, Story, Translation

# In Django Rest Framework (DRF), a serializer is a component that allows you to convert
# complex data types, such as Django models, into Python data types that can be easily
# rendered into JSON, XML, or other content types. In other words, serializers allow you
# to “translate” Django models into a format that can be sent as a response to a client
# or received as a payload from a client.


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ["id", "title", "difficulty_rating", "category"]


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ["language_code", "translated_content"]


class BlurbSerializer(serializers.ModelSerializer):
    translations = serializers.SerializerMethodField()

    class Meta:
        model = Blurb
        fields = ["sequence", "character_name", "content_english", "translations"]

    def get_translations(self, obj):
        language_code = self.context.get("language_code", None)
        if language_code:
            translations = obj.translations.filter(language_code=language_code)
        else:
            # If no language_code is specified, return all translations
            # CHANGE THIS LATER
            translations = obj.translations.all()
        return TranslationSerializer(translations, many=True).data


class ChapterSerializer(serializers.ModelSerializer):
    blurbs = BlurbSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = [
            "id",
            "title",
            "description",
            "audio_link",
            "created_at",
            "updated_at",
            "blurbs",
        ]
