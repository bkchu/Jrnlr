import React from "react";
import "./Error.css";
import { Link, withRouter } from "react-router-dom";

const Error = ({ error, location }) => {
  let displayButton = (
    <a className="Error__button" href={process.env.REACT_APP_LOGOUT}>
      Logout
    </a>
  );
  if (error.status === 403) {
    displayButton = (
      <a className="Error__button" href={process.env.REACT_APP_LOGIN}>
        Login
      </a>
    );
  } else if (error.status === "Wrong User") {
    const { from } = location.state || { from: { pathname: "/" } };
    displayButton = (
      <Link className="Error__button" to={from}>
        Go Back
      </Link>
    );
  }
  return (
    <div className="Error">
      <p className="Error__code">{error.status}</p>
      <p className="Error__message">{error.data.error}</p>
      {displayButton}
    </div>
  );
};

export default withRouter(Error);
