export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <div>{children}</div>
      <div className="h-[120px]"></div>
    </section>
  );
}
