import { Typography } from "@mui/material";
import { getStoryById } from "../../../libs/storiesApi";
import ConversationBlurb from "@/app/components/Conversation";
import { Story } from "@/types/Story";
import AudioPlayer from "@/app/components/AudioPlayer";

interface StoryProps {
  params: {
    story_id: string;
  };
}

export default async function Story({ params: { story_id } }: StoryProps) {
  const story: Story = await getStoryById(story_id, "es");
  console.log("ayyy");

  return (
    <div className="h-full w-full bg-white flex items-center flex-col py-8">
      <div className="max-w-[700px]">
        <div className="">
          <Typography variant="h3">{story.title}</Typography>
          <Typography className="mt-2" variant="h5">
            {story.description}
          </Typography>
        </div>
        <div className="mt-4 border-b-2" />
        <div className="mt-4">
          {story.conversations.map((conversation) => {
            return (
              <ConversationBlurb
                key={conversation.sequence}
                conversation={conversation}
              />
            );
          })}
        </div>
      </div>
      <AudioPlayer audioSrc="/audio/next.mp3" />
    </div>
  );
}
