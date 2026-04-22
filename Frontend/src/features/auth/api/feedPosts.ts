import { root } from "./config";

const feedPost = async (limit: number, skip: number) => {
  const res = await fetch(root + `feed?limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) {
    alert("Unable to fetch posts");
    return;
  }
  const data = await res.json();
  return data;
};
export default feedPost;
