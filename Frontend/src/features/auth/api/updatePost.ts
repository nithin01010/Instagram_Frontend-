import { root } from "./config";

const updatePost = async (postiId: string, newCaption?: string) => {
  const funct = await fetch(root + `posts/${postiId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      caption: newCaption,
    }),
  });
  if (funct.ok) {
    alert("Post updated");
  } else {
    alert("Unable to update caption, Try again");
  }
};
export default updatePost;
