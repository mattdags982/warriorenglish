import { getStoryById } from "../../libs/storiesApi";

export default async function Story({ params: { id } }) {
  const story = await getStoryById(id, "es");
  console.log(story);
  return <div className="h-full w-full bg-white">{story.title}</div>;
}
