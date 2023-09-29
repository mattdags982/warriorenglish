from django.db import models


class Module(models.Model):
    name = models.CharField(max_length=255)
    difficulty_rating = models.IntegerField()
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Story(models.Model):
    module = models.ForeignKey(
        Module, related_name="stories", on_delete=models.SET_NULL, null=True, blank=True
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    audio_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Conversation(models.Model):
    story = models.ForeignKey(
        Story, related_name="conversations", on_delete=models.CASCADE
    )
    sequence = models.IntegerField()
    character_name = models.CharField(max_length=255)
    content_english = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # means that by default, whenever you retrieve Conversations for a Story,
        # they will be ordered by the sequence field in ascending order.
        ordering = ["sequence"]

    def __str__(self):
        return f"{self.character_name} - {self.content_english}"


class Translation(models.Model):
    conversation = models.ForeignKey(
        Conversation, related_name="translations", on_delete=models.CASCADE
    )
    language_code = models.CharField(max_length=10)
    translated_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # ensures that you can’t have multiple Translation objects with the same
        # conversation and language_code. This means that for each Conversation,
        # there can only be one Translation per language_code
        unique_together = ["conversation", "language_code"]

    def __str__(self):
        return f"{self.language_code} - {self.translated_content}"
