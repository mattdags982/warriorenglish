import Header from "@/app/components/common/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <div className="h-[calc(100vh-66px)]">{children}</div>
    </section>
  );
}
