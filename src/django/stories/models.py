from django.db import models


class Story(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty_rating = models.IntegerField()
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Chapter(models.Model):
    story = models.ForeignKey(Story, related_name="chapters", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    audio_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Blurb(models.Model):
    chapter = models.ForeignKey(
        Chapter, related_name="blurbs", on_delete=models.CASCADE
    )
    sequence = models.IntegerField()
    character_name = models.CharField(max_length=255)
    content_english = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # means that by default, whenever you retrieve Blurbs for a Chapter,
        # they will be ordered by the sequence field in ascending order.
        ordering = ["sequence"]

    def __str__(self):
        return f"{self.character_name} - {self.content_english}"


class Translation(models.Model):
    blurb = models.ForeignKey(
        Blurb, related_name="translations", on_delete=models.CASCADE
    )
    language_code = models.CharField(max_length=3)
    translated_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # ensures that you can’t have multiple Translation objects with the same
        # blurb and language_code. This means that for each Blurb,
        # there can only be one Translation per language_code
        unique_together = ["blurb", "language_code"]

    def __str__(self):
        return f"{self.language_code} - {self.translated_content}"
