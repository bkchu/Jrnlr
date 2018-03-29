import React from "react";

import Routes from "../../../Routes";
import Login from "../Login/Login";
import Header from "../../Header/Header";

const Homepage = () => {
  return (
    <div>
      {/* TODO */}
      <Login />
      <Header />

      <Routes />
    </div>
  );
};

export default Homepage;
