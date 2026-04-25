import { root } from "./config";

export const postDetails = async (name?: string) => {
  const data = await fetch(root + `posts/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return data.json();
};
