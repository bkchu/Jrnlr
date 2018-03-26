import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/ducks/userReducer";
import Logo from "../../assets/Journalr.svg";

import "./Header.css";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    console.log(this.props);
    let { user } = this.props;

    let loginLogoutButton = !user ? (
      <a className="Header__button" href="http://localhost:3001/auth">
        Login
      </a>
    ) : (
      <a className="Header__button" href="http://localhost:3001/api/logout">
        Logout
      </a>
    );

    let animatedGreeting = ["Header__animated-greeting"];
    if (user) {
      console.log(user);
      animatedGreeting.push("Header__animated-greeting--show");
    }

    return (
      <div className="Header">
        <div className="Header__container container">
          <div className="Header__left">
            <img className="Header__logo" src={Logo} alt="Journalr Logo" />
          </div>
          <div className="Header__right">
            <p className="Header__greeting">{!user ? "Guest" : user.name}</p>
            {loginLogoutButton}
          </div>
        </div>
        <div className={animatedGreeting.join(" ")}>
          Welcome, {!user ? "Guest" : user.name}.
        </div>
      </div>
    );
  }
}

export default connect(state => ({ ...state.userReducer }), { getUser })(
  Header
);
