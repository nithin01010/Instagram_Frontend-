import React from "react";
import { root } from "./config";
import { redirect, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

export const signup = (
  UserName: string,
  Email: string,
  Password: string,
  navigate: NavigateFunction,
) => {
  return async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(root + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: UserName,
          email: Email,
          password: Password,
        }),
      });

      console.log(res);
      if (res.status !== 201) {
        // Fix: `res` is a raw Response object, it doesn't have a `.detail` property!
        // We must parse the JSON explicitly to read the detail property inside of it.
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to register");
      }
      // redirect
      const data = await res.json();
      console.log(data);
      alert("Account created successfully");
      navigate("/profile");
    } catch (err) {
      console.error("Sign up error:", err);
      alert("An error occurred during sign up, Try again");
    }
  };
};
