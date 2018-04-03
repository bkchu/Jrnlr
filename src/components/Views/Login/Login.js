import React, { Component } from "react";

import "./Login.css";

class Login extends Component {
  render() {
    // let { user } = this.props;

    let classes = ["Login"];
    // if (user) {
    //   classes.push("Login--hide");
    // }

    return (
      <div className={classes.join(" ")}>
        <a className="Login__button" href={process.env.REACT_APP_LOGIN}>
          Login
        </a>
      </div>
    );
  }
}

export default Login;
