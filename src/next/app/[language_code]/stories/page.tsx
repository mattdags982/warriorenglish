import Link from "next/link";
import { getAllStories } from "@/app/api/stories";
import { Story } from "@/types/Story";
import StoryCard from "@/app/components/StoryCard";

interface StoryListProps {
  params: {
    language_code: string;
  };
}

export default async function StoryList({
  params: { language_code },
}: StoryListProps) {
  const stories: Story[] = await getAllStories();
  return (
    <div className="h-full w-full bg-white flex justify-center mt-24 gap-12 flex-wrap">
      {stories?.map((story) => {
        return (
          <div key={story.id}>
            <Link href={`/${language_code}/stories/${story.id}`}>
              <StoryCard story={story} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
