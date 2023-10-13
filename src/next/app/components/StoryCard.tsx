import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Story } from "@/types/Story";
import Image from "next/image";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Image src="/beginner.jpeg" alt="beginner" width={345} height={200} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {story.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
