import Link from "next/link";
import { getChaptersByStoryId } from "../../../api/stories";
import { Chapter } from "@/types/Chapter";

interface Props {
  params: {
    story_id: string;
  };
}

export default async function ChaptersList({ params: { story_id } }: Props) {
  const chapters: Chapter[] = await getChaptersByStoryId(story_id);
  return (
    <div className="h-full w-full bg-white">
      {chapters.map((chapter) => {
        return (
          <div key={chapter.id}>
            <Link href={`${story_id}/${chapter.id}`}>{chapter.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
