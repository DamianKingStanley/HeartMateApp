import React from "react";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import CreatePost from "./pages/CreatePost/CreatePost";
import FindMate from "./pages/FindMate/FindMate";
import UserPosts from "./pages/UserPosts/UserPosts";
import EditPost from "./pages/EditPost/EditPost";
import ChatBox from "./pages/ChatBox/ChatBox";
import MatingTips from "./pages/FooterSection/MatingTips";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile/:username" element={<Dashboard />} />
          <Route exact path="/advertise" element={<CreatePost />} />
          <Route exact path="/finding-a-mate" element={<FindMate />} />
          <Route exact path="/mate/:userId/posts" element={<UserPosts />} />
          <Route exact path="/post/edit/:id" element={<EditPost />} />
          <Route
            exact
            path="/:currentUser/chat/:userId"
            element={<ChatBox />}
          />

          <Route
            exact
            path="/profile/edit/:username"
            element={<UpdateProfile />}
          />
          <Route
            exact
            path="/dating-relationship-advice-tips"
            element={<MatingTips />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
