import Link from "next/link";
import { Typography } from "@mui/material";

// TODO:
// If someone enters a url like warriorenglish/ayyyy this page still works becasue it will think ayyy is the language code
// Need some safegaurd here
interface LandingPageProps {
  params: {
    language_code: string;
  };
}

export default async function LandingPage({
  params: { language_code },
}: LandingPageProps) {
  return (
    <div className="h-full w-full flex flex-col items-center mt-24 gap-12 flex-wrap">
      <Typography variant="h1">Landing Page</Typography>
      <Typography variant="h5">
        <Link href={`/${language_code}/modules`}>Modules</Link>
      </Typography>
      <Typography variant="h5">
        <Link href={`/${language_code}/blog`}>Blog</Link>
      </Typography>
    </div>
  );
}
