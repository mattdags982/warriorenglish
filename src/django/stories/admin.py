from django.contrib import admin

from .models import Conversation, Story, Translation


class TranslationInline(admin.TabularInline):
    model = Translation
    extra = 0  # Number of extra forms to display


class ConversationInline(admin.StackedInline):
    model = Conversation
    extra = 0  # Number of extra forms to display
    inlines = [TranslationInline]


class StoryAdmin(admin.ModelAdmin):
    inlines = [ConversationInline]


admin.site.register(Story, StoryAdmin)
admin.site.register(Conversation)
admin.site.register(Translation)
