import React, { Component } from "react";
import Logo from "../../../assets/Journalr.svg";

import "./Login.css";

class Login extends Component {
  render() {
    let classes = ["Login"];
    return (
      <div className={classes.join(" ")}>
        <div className="Login__body">
          <img className="Login__logo" src={Logo} alt="Jrnlr Logo" />
          <a className="Login__button" href={process.env.REACT_APP_LOGIN}>
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
