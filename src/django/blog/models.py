from django.db import models
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=100, default="")
    content = models.TextField(default="")
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
