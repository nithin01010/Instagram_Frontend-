import { root } from "./config";

export const userPost = async (username: string, skip: number, limit: number) => {
  const res = await fetch(
    root + `posts/user/${username}?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (!res.ok) {
    alert("Unable to load Posts of user");
    return;
  }
  const data = await res.json();
  return data;
};
