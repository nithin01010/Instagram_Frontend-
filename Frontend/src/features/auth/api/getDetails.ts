import { useRequireAuth } from "./authHooks";
import { root } from "./config";

export const getdetails = async () => {
  try {
    const res = await fetch(root + "users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Invalid token");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    alert("Unable to get data");
    return;
  }
};
