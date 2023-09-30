import { cache } from "react";

export async function getAllModules() {
  // console.log("fetching all modules");

  const res = await fetch("http://127.0.0.1:8000/api/modules/", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.results;
}

export async function getStoriesByModuleId(id) {
  // console.log("fetching all stories in module");

  const res = await fetch(`http://127.0.0.1:8000/api/stories/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.results;
}

export async function getStoryById(id, lang) {
  console.log("fetching story");
  const res = await fetch(`http://127.0.0.1:8000/api/story/${id}/${lang}`, {
    cache: "no-store",
  });
  console.log(res);
  const data = await res.json();
  return data;
}
