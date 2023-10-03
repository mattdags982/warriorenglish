import Link from "next/link";
import { Typography } from "@mui/material";

interface BlogProps {
  params: {
    language_code: string;
  };
}

export default async function Blog({ params: { language_code } }: BlogProps) {
  return (
    <div className="h-full w-full flex flex-col items-center mt-24 gap-12 flex-wrap">
      <Typography variant="h1">Blog</Typography>
      <Typography variant="h5">Articles Here</Typography>
    </div>
  );
}
