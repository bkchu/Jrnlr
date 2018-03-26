import React from "react";
import Login from "../Login/Login";
import Header from "../../Header/Header";
import Posts from "../../Posts/Posts";

const Homepage = () => {
  return (
    <div>
      <Login />
      <Header />
      <Posts />
    </div>
  );
};

export default Homepage;
