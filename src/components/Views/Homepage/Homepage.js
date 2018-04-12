import React, { Component } from "react";

import Routes from "../../../routes";
import Header from "../../Header/Header";

import "./Homepage.css";

class Homepage extends Component {
  render() {
    return (
      <div className="HomePage">
        <Header />
        <Routes />
      </div>
    );
  }
}

export default Homepage;
