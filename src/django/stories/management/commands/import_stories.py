import json

from stories.models import Conversation, Story, Translation

from django.core.management.base import BaseCommand


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

                # Check if Spanish translation key exists and then create
                if "contentSpanish" in conversation_data:
                    Translation.objects.create(
                        conversation=conversation,
                        language_code="es",
                        translated_content=conversation_data["contentSpanish"],
                    )

                # Check if Italian translation key exists and then create
                if "contentItalian" in conversation_data:
                    Translation.objects.create(
                        conversation=conversation,
                        language_code="it",
                        translated_content=conversation_data["contentItalian"],
                    )

                # Check if French translation key exists and then create
                if "contentFrench" in conversation_data:
                    Translation.objects.create(
                        conversation=conversation,
                        language_code="fr",
                        translated_content=conversation_data["contentFrench"],
                    )

            self.stdout.write(
                self.style.SUCCESS('Successfully imported story "%s"' % story.title)
            )
