import React from "react";
import Button from "../../../components/button";
import { useState } from "react";
import { signup } from "../api/signUp";
import { useNavigate } from "react-router-dom";
const SignUp_box = () => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = signup(UserName, Email, Password, navigate);
  // const signUp = signup()
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="form flex flex-col items-center" onSubmit={signUp}>
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
