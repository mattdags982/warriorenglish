import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Module } from "@/types/Module";
import Image from "next/image";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Image src="/beginner.jpeg" alt="beginner" width={345} height={200} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {module.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
