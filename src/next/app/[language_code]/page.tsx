import Link from "next/link";
import { getAllModules } from "../api/stories";
import { Module } from "@/types/Module";
import ModuleCard from "../components/ModuleCard";

interface ModuleListProps {
  params: {
    language_code: string;
  };
}

export default async function ModuleList({
  params: { language_code },
}: ModuleListProps) {
  const modules: Module[] = await getAllModules();
  return (
    <div className="h-full w-full bg-white flex justify-center mt-24 gap-12 flex-wrap">
      {modules.map((module) => {
        return (
          <div key={module.id}>
            <Link href={`${language_code}/${module.id}`}>
              <ModuleCard module={module} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
