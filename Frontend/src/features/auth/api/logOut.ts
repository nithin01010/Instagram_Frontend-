import type { NavigateFunction } from "react-router-dom";
import { root } from "./config";

export const logout = async (navigate: NavigateFunction) => {
  // localStorage.clear();
  const res = await fetch(root + 'auth/logout', {
    method: "POST",
    credentials: "include", 
    headers: {
      "Content-Type": 'application/json',
    }
  })
  if(!res.ok) {
    alert('unable to logout');
    return
  }
  navigate("/");
};
