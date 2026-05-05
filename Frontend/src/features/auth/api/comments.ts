import { root } from "./config";

const comments = async (postid: string) => {
  const res = await fetch(root + "comments" + { postid }, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    alert("Unable to load comments");
    return ;
  }
  const data = res.json;
  return data;
};

export default comments;
