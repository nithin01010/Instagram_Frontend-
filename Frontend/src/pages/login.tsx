import React from "react";
import LoginBox from "../features/auth/components/login_box";
import { useRedirectIfLoggedIn } from "../features/auth/api/functions";

const login = () => {
  const checking = useRedirectIfLoggedIn();

  if (checking) return null;

  return (
    <div>
      <LoginBox />
    </div>
  );
};

export default login;
