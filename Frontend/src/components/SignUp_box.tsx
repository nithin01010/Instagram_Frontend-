import React from "react";
import Button from "./button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { log } from 'console';
// import process from 'process';
const SignUp_box = () => {
  // const root = process.env.BACKEND_URL;
  const navigate = useNavigate();
  const root = "https://dvw9ddc4-8000.inc1.devtunnels.ms/";
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const SignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    fetch(root + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserName,
        email: Email,
        password: Password,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status != 201) {
        //   res.json();
          throw new Error(res.detail);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.access_token);
        // localStorage.setItem("token_type", res.token_type);
        // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        // document.cookie = `ref_token=${res.refresh_token}; expires=${expires.toUTCString()}; path=/`;
        alert("Account created successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Sign up error:", err);
        alert("An error occurred during sign up");
        // navigate("/");
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="form flex flex-col items-center" onSubmit={SignUp}>
        <p className="form-title">Create account</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter User Name"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <span></span>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span></span>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span></span>
        <div className="flex justify-center items-center">
          <Button text="Sign up" />
        </div>
      </form>
    </div>
  );
};

export default SignUp_box;
