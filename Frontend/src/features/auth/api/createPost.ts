import { root } from "./config";
import type { PostInputTy } from "../../../types/PostInput";

export const createPost = async ({ file, caption }: PostInputTy) => {
  // When sending physical files, we must use FormData instead of JSON
  // const formData = new FormData();
  // formData.append("caption", caption);
  // formData.append("media_url", file);
  // formData.append("media_type", "Image");

  const res = await fetch(root + "posts/", {
    method: "POST",
    headers: {
      // DO NOT set "Content-Type": "multipart/form-data" manually!
      "Content-Type": "application/json",
      // The browser must set it automatically so it can include the boundary string.
    },
    credentials: "include",
    body: JSON.stringify({
      caption: caption,
      media_url: file,
      media_type: "Image",
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
};
