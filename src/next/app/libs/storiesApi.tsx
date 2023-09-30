export async function getAllModules() {
  const res = await fetch("http://127.0.0.1:8000/api/modules/");
  const data = await res.json();
  return data.results;
}

export async function getStoriesByModuleId(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/stories/${id}`);
  const data = await res.json();
  return data.results;
}

export async function getStoryById(id, lang) {
  const res = await fetch(`http://127.0.0.1:8000/api/story/${id}/${lang}`);
  const data = await res.json();
  return data;
}
