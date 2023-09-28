from django.db import models


class Story(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.title
