"use client";

import { Conversation } from "@/types/Story";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

interface ConversationBlurbProps {
  conversation: Conversation;
}

export default function ConversationBlurb({
  conversation,
}: ConversationBlurbProps) {
  const [translationOpen, setTranslationOpen] = useState(false);
  return (
    <div className="mt-4">
      <div className="mt-4 flex">
        <div className="flex-1">
          <Typography variant="h6">{conversation.character_name}</Typography>
          <Typography variant="subtitle1">
            {conversation.content_english}
          </Typography>
        </div>
        <Button
          onClick={() => {
            setTranslationOpen(!translationOpen);
          }}
          variant="outlined"
        >
          Translate
        </Button>
      </div>
      {translationOpen && (
        <div className="mt-2">
          <Typography className="text-gray-600" variant="subtitle1">
            {conversation.translations[0].translated_content}
          </Typography>
        </div>
      )}
      <div className="mt-4 border-b-2" />
    </div>
  );
}
