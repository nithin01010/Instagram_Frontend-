import { root } from "./config";

const getProfilePic = async (id: string) => {
  // GET requests cannot have a body. The user_id must be passed in the URL.
  const res = await fetch(root + `userPic?user_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) {
    alert("unable to load profile pic");
    return;
  }
  const data = await res.json(); // Added await
  return data.data;
};
export default getProfilePic;
