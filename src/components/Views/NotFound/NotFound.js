import React from "react";
import { withRouter } from "react-router-dom";

import "./NotFound.css";

const NotFound = props => {
  const { from } = props.location.state || { from: { pathname: "/" } };

  return (
    <div className="NotFound container">
      <p className="NotFound__code">404</p>
      <button
        className="NotFound__button"
        onClick={() => props.history.push(from)}
      >
        Go Back
      </button>
    </div>
  );
};

export default withRouter(NotFound);
