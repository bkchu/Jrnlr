import React from "react";
import "./Error.css";

const Error = ({ error }) => {
  console.log("error: ", error);
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
  }
  return (
    <div className="Error">
      <p className="Error__code">{error.status}</p>
      <p className="Error__message">{error.data.error}</p>
      {displayButton}
    </div>
  );
};

export default Error;
