import { root } from "./config";

export const deletePost = async (id?: string) => {
  const res = await fetch(root + `posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
  return res.json();
};
