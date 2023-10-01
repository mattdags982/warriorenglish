import { Typography } from "@mui/material";
import { getStoryById } from "../../../libs/storiesApi";
import ConversationBlurb from "@/app/components/Conversation";
import { Story } from "@/types/Story";
import AudioPlayer from "@/app/components/AudioPlayer";

interface StoryProps {
  params: {
    story_id: string;
    language_code: string;
  };
}

// note: think about what you are building. Realy, its not a book, however the stories / chaapters idea I think is good
// its a tool that you are building, it should feel smooth and sleek like the spotify audio player, yet warm and inviting like a book
// its a combo of enjoyable audio book and a tool to help you learn a language
// what does that feel like? How can you combine functionality with a warm and inviting, yet sleek and modern feeling?

// being inspired from spotify, I think that the audio play and "top of screen" options should sort of "blend in" to the background, which resemebles paper or at least something soft on the eyes
// once you open a story, it is essentially "opening a book". The more distractions you have on the screen, the worse.

// When starting screens of the app can feel a bit more like ex, the cover of the book, or something along those lines

const bookColors = {
  4: "#E3DAC9", //nice on the eyes
  2: "#FAEBD7", //very good
  1: "#F2E8C8", //not bad
  3: "#F5F5DC",
  5: "#EDEDD2",
  6: "#EEE8AA", //nope
};

const textColors = {
  charcoal: "#333333",
  gunmetal: "#2A2A2A",
  davysgrey: "#555555", //too light
  outerspace: "#414A4C",
  taupe: "#505050",
};

export default async function Story({
  params: { story_id, language_code },
}: StoryProps) {
  const story: Story = await getStoryById(story_id, language_code);

  return (
    <div
      className="h-full w-full
    bg-[#E3DAC9]
     flex items-center flex-col py-8
     text-[#2A2A2A]"
    >
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
    </div>
  );
}
