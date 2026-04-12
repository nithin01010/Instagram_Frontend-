import { root } from "./config";

export const userPost = async (id: string) => {
  const res = await fetch(root + `posts/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) {
    alert("Unable to load Posts of user");
    return;
  }
  const data = await res.json();
  return data;
};
