import React from "react";
import routes from "../../../routes";
import Login from "../Login/Login";
import Header from "../../Header/Header";

const Homepage = () => {
  return (
    <div>
      <Login />
      <Header />
      {routes}
    </div>
  );
};

export default Homepage;
