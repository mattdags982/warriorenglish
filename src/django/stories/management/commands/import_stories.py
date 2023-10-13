import json
import os

from stories.models import Blurb, Chapter, Story, Translation

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Import stories from a JSON file into the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "filename", type=str, help="The JSON file containing the story data"
        )

    def handle(self, *args, **kwargs):
        filename = kwargs["filename"]
        language_mapping = {
            "es": "Spanish",
            "it": "Italian",
            "fr": "French",
        }
        if not os.path.isfile(filename):
            self.stdout.write(self.style.ERROR(f'File "{filename}" does not exist.'))
            return

        # Load stories from the specified JSON file
        with open(filename, "r") as file:
            story_data = json.load(file)

        # Create Story instance
        story, created = Story.objects.get_or_create(
            title=story_data["title"],
            defaults={
                "description": story_data["description"],
                "difficulty_rating": story_data["difficulty_rating"],
                "category": story_data["category"],
            },
        )

        if not created:
            self.stdout.write(
                self.style.WARNING(f'Story "{story.title}" already exists. Skipping...')
            )
            return

        # Loop through each chapter in the story data
        for chapter_data in story_data["chapters"]:
            # Create Chapter instance
            chapter = Chapter.objects.create(
                story=story,
                title=chapter_data["title"],
                description=chapter_data["description"],
                audio_link=chapter_data.get(
                    "audio_link", ""
                ),  # Handles the case if 'audio_link' is not provided
            )

            # Loop through the blurbs in the chapter
            for blurb_data in chapter_data["blurbs"]:
                # Create Blurb instance
                blurb = Blurb.objects.create(
                    chapter=chapter,
                    sequence=chapter_data["blurbs"].index(blurb_data),
                    character_name=blurb_data["name"],
                    content_english=blurb_data["contentEnglish"],
                )
                for lang_code, lang_name in language_mapping.items():
                    content_key = f"content{lang_name}"
                    if content_key in blurb_data:
                        Translation.objects.create(
                            blurb=blurb,
                            language_code=lang_code,
                            translated_content=blurb_data[content_key],
                        )

            self.stdout.write(
                self.style.SUCCESS(f'Successfully imported chapter "{chapter.title}"')
            )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully imported story "{story.title}"')
        )
