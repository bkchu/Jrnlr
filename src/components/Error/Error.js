import React from "react";
import "./Error.css";

const Error = ({ error }) => {
  console.log(error);
  return (
    <div className="Error">
      <p className="Error__code">{error.status}</p>
      <p className="Error__message">{error.data.error}</p>
      <a className="Error__button" href="http://localhost:3001/api/logout">
        Logout
      </a>
    </div>
  );
};

export default Error;
