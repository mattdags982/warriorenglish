import Link from "next/link";
import { getAllModules } from "../libs/storiesApi";

export default async function ModuleList() {
  const modules = await getAllModules();
  return (
    <div className="h-full w-full bg-white">
      {modules.results.map((module) => {
        return (
          <div key={module.id}>
            <Link href={`/${module.id}`}>{module.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
