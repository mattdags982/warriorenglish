from django.contrib import admin

from .models import Blurb, Chapter, Story, Translation


class TranslationInline(admin.TabularInline):
    model = Translation
    extra = 0  # Number of extra forms to display


class BlurbInline(admin.StackedInline):
    model = Blurb
    extra = 0  # Number of extra forms to display
    inlines = [TranslationInline]


class ChapterAdmin(admin.ModelAdmin):
    inlines = [BlurbInline]


admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Blurb)
admin.site.register(Translation)
admin.site.register(Story)
