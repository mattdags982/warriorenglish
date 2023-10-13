import { cache } from "react";

export async function getAllStories() {
  console.log("fetching all stories");

  const res = await fetch("http://127.0.0.1:8000/api/stories/", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.results;
}

export async function getChaptersByStoryId(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/chapters/${id}/`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.results;
}

export async function getChapterById(id, lang) {
  console.log("fetching story");
  const res = await fetch(`http://127.0.0.1:8000/api/chapter/${id}/${lang}/`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data.blurbs[0]);
  return data;
}
