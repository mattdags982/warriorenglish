import Image from "next/image";
import ModuleList from "./components/ModuleList";

export default function Home() {
  return (
    <div className="h-full w-full bg-white">
      Home page
      <ModuleList />
    </div>
  );
}
