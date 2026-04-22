import { root } from "./config";

export const userPost = async (id: string, skip: number, limit: number) => {
  const res = await fetch(
    root + `posts/user/${id}?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  );
  if (!res.ok) {
    alert("Unable to load Posts of user");
    return;
  }
  const data = await res.json();
  return data;
};
