import Link from "next/link";
import { Typography } from "@mui/material";

interface FeedbackProps {
  params: {
    language_code: string;
  };
}

export default async function Feedback({
  params: { language_code },
}: FeedbackProps) {
  return (
    <div className="h-full w-full flex flex-col items-center mt-24 gap-12 flex-wrap">
      <Typography variant="h1">Feedback Form</Typography>
    </div>
  );
}
