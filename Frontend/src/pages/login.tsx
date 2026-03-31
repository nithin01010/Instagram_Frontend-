import React from "react";
import LoginBox from "../components/login_box";
import { Navigate, redirect } from "react-router-dom";
import { check_token } from "../apis/functions";
const login = () => {
  // check_token();
  if (localStorage.getItem("access_token") != null) {
    check_token();
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      <LoginBox />
    </div>
  );
};

export default login;
