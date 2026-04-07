import React from "react";
import { root } from "./config";

export const login = (UserName: string, Password: string) => {
  return async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(root + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserName,
          password: Password,
        }),
      });

      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      window.location.href = "/profile";
    } catch (err) {
      alert("Invalid credentials: " + err);
    }
  };
};
