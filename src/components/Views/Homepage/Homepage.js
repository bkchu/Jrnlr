import React, { Component } from "react";

import Routes from "../../../Routes";
import Header from "../../Header/Header";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default Homepage;
