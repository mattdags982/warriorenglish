import Link from "next/link";
import { getStoriesByModuleId } from "../libs/storiesApi";

export default async function StoriesList({ params: { module_id } }) {
  const stories = await getStoriesByModuleId(module_id);
  console.log(stories);
  return (
    <div className="h-full w-full bg-white">
      {stories.results.map((story) => {
        return (
          <div key={story.id}>
            <Link href={`${story.id}`}>{story.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
