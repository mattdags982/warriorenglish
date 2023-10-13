import AudioPlayer from "@/app/components/AudioPlayer";

export default function ChapterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    chapter_id: string;
  };
}) {
  // in the future, you can use the chapter name to get the audio file.
  // you may need to use redux to store the chapter name. MAYBE.
  return (
    <section className="flex flex-col ">
      <div>{children}</div>
      <div className="h-[120px]"></div>
      <AudioPlayer audioSrc="/audio/next.mp3" />
    </section>
  );
}
