import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import Feed from "./pages/Feed";
import UserProfile from "./pages/UserProfile";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile isowner = {true}/>} />
        <Route path="/user/:name" element={<UserProfile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/view-post/:name" element={<ViewPost isowner={true} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
