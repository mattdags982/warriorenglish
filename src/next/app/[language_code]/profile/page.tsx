import Link from "next/link";
import { Typography } from "@mui/material";

interface ProfileProps {
  params: {
    language_code: string;
  };
}

export default async function Profile({
  params: { language_code },
}: ProfileProps) {
  return (
    <div className="h-full w-full flex flex-col items-center mt-24 gap-12 flex-wrap">
      <Typography variant="h1">Profile</Typography>
    </div>
  );
}
