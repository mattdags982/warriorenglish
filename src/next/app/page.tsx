import Link from "next/link";
import { getAllModules } from "./libs/storiesApi";
import LanguageDialog from "./components/LanguageDialog";

// Note: On this page you could have "hidden" text that says "learn english with comprehension input" or something like that
// and other keys words that are hidden but that google can see. This would help with SEO.
export default async function Home() {
  return <LanguageDialog />;
}
