export interface Chapter {
  id: number;
  title: string;
  description: string;
  audio_link: string | null;
  created_at: string;
  updated_at: string;
  blurbs: Blurb[];
}

export interface Blurb {
  sequence: number;
  character_name: string;
  content_english: string;
  translations: Translation[];
}

export interface Translation {
  language_code: string;
  translated_content: string;
}
