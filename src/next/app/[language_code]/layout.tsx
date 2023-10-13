import Header from "@/app/components/common/Header";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    language_code: string;
  };
}) {
  const { language_code } = params;
  return (
    <section>
      <Header language_code={language_code} />
      <div className="h-[calc(100vh-66px)]">{children}</div>
    </section>
  );
}
