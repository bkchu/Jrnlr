import React from "react";

import Routes from "../../../routes";
import Login from "../Login/Login";
import Header from "../../Header/Header";

const Homepage = () => {
  return (
    <div>
      <Login />
      <Header />

      <Routes />
    </div>
  );
};

export default Homepage;
