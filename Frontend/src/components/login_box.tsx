import React, { use, useState } from "react";

const login_box = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <form className="form">
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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <a href="">Sign up</a>
      </p>
    </form>
  );
};
export default login_box;
