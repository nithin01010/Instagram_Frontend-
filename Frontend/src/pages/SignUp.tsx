import React from "react";
import SignUp_box from "../features/auth/components/SignUp_box";
import { useRedirectIfLoggedIn } from "../features/auth/api/authHooks";

const SignUp = () => {
  const checking = useRedirectIfLoggedIn();

  if (checking) return null;

  return <SignUp_box />;
};

export default SignUp;
