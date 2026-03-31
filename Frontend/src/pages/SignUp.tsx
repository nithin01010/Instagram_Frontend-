import React from "react";
import SignUp_box from "../components/SignUp_box";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { check_token } from "../apis/functions";
const SignUp = () => {
  if (localStorage.getItem("access_token") != null) {
    check_token();
    return <Navigate to="/profile" />;
  }
  return <SignUp_box />;
};

export default SignUp;
