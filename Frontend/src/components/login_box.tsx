import React, { use, useState } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";

const login_box = () => {
  const navigate = useNavigate();
  const root = "https://dvw9ddc4-8000.inc1.devtunnels.ms/";
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const handlelogin = async (e: React.FormEvent) => {
    e.preventDefault();
    fetch(root + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: UserName,
        password: Password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("UserName", data.username);
          const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          document.cookie = `ref_token=${data.ref_token}; expires=${expires.toUTCString()}; path=/`;
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="form flex flex-col items-center" onSubmit={handlelogin}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter User Name"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button text="Login" />
        </div>
        <p className="signup-link">
          No account?
          <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};
export default login_box;
