import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    );

};
export default App;
