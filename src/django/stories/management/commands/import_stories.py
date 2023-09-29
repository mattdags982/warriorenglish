import json

from django.core.management.base import BaseCommand
from stories.models import Conversation, Story, Translation


class Command(BaseCommand):
    help = "Import stories into the database"

    def handle(self, *args, **kwargs):
        # Load stories from JSON file
        with open("stories/management/commands/stories.json", "r") as file:
            stories_data = json.load(file)

        # Delete all existing stories, conversations, and translations
        Story.objects.all().delete()

        # Loop through each story in the array
        for story_data in stories_data:
            # Create Story instance
            story = Story.objects.create(
                title=story_data["title"],
                description=story_data["description"],
            )

            # Loop through the conversations and create Conversation and Translation instances
            for index, conversation_data in enumerate(story_data["conversations"]):
                conversation = Conversation.objects.create(
                    story=story,
                    sequence=index,
                    character_name=conversation_data["name"],
                    content_english=conversation_data["contentEnglish"],
                )

                # Create Spanish Translation
                Translation.objects.create(
                    conversation=conversation,
                    language_code="es",
                    translated_content=conversation_data["contentSpanish"],
                )

            self.stdout.write(
                self.style.SUCCESS('Successfully imported story "%s"' % story.title)
            )
