import React from "react";
import "./Error.css";

const Error = ({ error }) => {
  console.log(error);
  let displayButton = (
    <a className="Error__button" href="http://localhost:3001/api/logout">
      Logout
    </a>
  );
  if (error.status === 403) {
    displayButton = (
      <a className="Error__button" href="http://localhost:3001/auth">
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
