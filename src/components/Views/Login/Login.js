import React, { Component } from "react";
import Logo from "../../../assets/jrnlr_new.svg";

import "./Login.css";

class Login extends Component {
  render() {
    let classes = ["Login"];
    return (
      <div className={classes.join(" ")}>
        <div className="Login__body">
          <img className="Login__logo" src={Logo} alt="Jrnlr Logo" />
          <h1 className="Login__title">Jrnlr - Your online journal.</h1>
          <a className="Login__button" href={process.env.REACT_APP_LOGIN}>
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
