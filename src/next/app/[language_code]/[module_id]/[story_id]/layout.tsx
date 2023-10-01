import AudioPlayer from "@/app/components/AudioPlayer";

export default function StoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    story_id: string;
  };
}) {
  // in the future, you can use the story name to get the audio file.
  // you may need to use redux to store the story name. MAYBE.
  return (
    <section className="flex flex-col ">
      <div>{children}</div>
      <div className="h-[120px]"></div>
      <AudioPlayer audioSrc="/audio/next.mp3" />
    </section>
  );
}
