import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import { getUser, displayedGreeting } from "../../redux/ducks/userReducer";
import Logo from "../../assets/Journalr.svg";

import "./Header.css";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    let { user } = this.props;

    let loginLogoutButton = !user ? (
      <a className="Header__button" href={process.env.REACT_APP_LOGIN}>
        Login
      </a>
    ) : (
      <a className="Header__button" href={process.env.REACT_APP_LOGOUT}>
        Logout
      </a>
    );

    let animatedGreeting = ["Header__animated-greeting"];

    //if user is logged in and it's the homepage, show the greeting animation
    if (user && this.props.hasDisplayedGreeting === false) {
      animatedGreeting.push("Header__animated-greeting--show");
      // this.props.displayedGreeting(true);
    }

    return (
      <div className="Header">
        <div className="Header__container container">
          <div className="Header__left">
            <Link to="/">
              <img className="Header__logo" src={Logo} alt="Journalr Logo" />
            </Link>
            <Link className="Header__search" to="/users">
              <FontAwesome name="search" />
            </Link>
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

export default withRouter(
  connect(state => ({ ...state.userReducer }), { getUser, displayedGreeting })(
    Header
  )
);
