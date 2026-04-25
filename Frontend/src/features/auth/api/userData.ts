import { root } from "./config";

const userData = async (name: string) => {
  const res = await fetch(root + `users/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "applicaiton/json",
    },
  });
  return res.json()
};
export default userData;
