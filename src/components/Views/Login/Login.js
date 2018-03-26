import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser } from "../../../redux/ducks/userReducer";
import "./Login.css";

class Login extends Component {
  render() {
    let { user } = this.props;

    let classes = ["Login"];
    if (user) {
      classes.push("Login--hide");
    }

    return (
      <div className={classes.join(" ")}>
        <a className="Login__button" href="http://localhost:3001/auth">
          Login
        </a>
      </div>
    );
  }
}

export default connect(state => ({ ...state.userReducer }), { getUser })(Login);
