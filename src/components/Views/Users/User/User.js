import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import { addFollow, removeFollow } from "../../../../redux/ducks/followReducer";
import "./User.css";
class User extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isFollowing !== nextProps.isFollowing) {
      return true;
    }
    return false;
  }

  render() {
    let {
      email,
      id,
      authid,
      addFollow,
      removeFollow,
      isFollowing
    } = this.props;
    let button = isFollowing ? (
      <button
        onClick={() => removeFollow(authid)}
        className="User__follow-button"
      >
        <FontAwesome name="times" />
      </button>
    ) : (
      <button onClick={() => addFollow(authid)} className="User__follow-button">
        <FontAwesome name="check" />
      </button>
    );

    return (
      <div className="User">
        <Link className="Link " to={`/users/${id}`}>
          <p className="User__email">{email}</p>
        </Link>
        {button}
      </div>
    );
  }
}

export default connect(state => state.followReducer, {
  addFollow,
  removeFollow
})(User);
