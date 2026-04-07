import { useState } from "react";
import Button from "../../../components/button";
import { login } from "../api/functions";

const login_box = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const handlelogin = login(UserName, Password);
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="form flex flex-col items-center" onSubmit={handlelogin}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter Email"
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
