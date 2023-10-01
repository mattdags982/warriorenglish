import Link from "next/link";
import { getStoriesByModuleId } from "../../api/stories";
import { Story } from "@/types/Story";

interface StoryListProps {
  params: {
    module_id: string;
  };
}

export default async function StoriesList({
  params: { module_id },
}: StoryListProps) {
  const stories: Story[] = await getStoriesByModuleId(module_id);
  return (
    <div className="h-full w-full bg-white">
      {stories.map((story) => {
        return (
          <div key={story.id}>
            <Link href={`${module_id}/${story.id}`}>{story.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
