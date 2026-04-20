import { root } from "./config";

export const postDetails = async (id?: string) => {
  const data = await fetch(root + `posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return data.json();
};
