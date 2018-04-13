import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addFollow,
  removeFollow,
  getFollows
} from "../../../../redux/ducks/followReducer";

import "./FollowButton.css";

class FollowButton extends Component {
  componentDidMount() {
    this.props.getFollows();
  }

  onFollowHandler = authid => {
    this.props.addFollow(authid);
  };

  onUnfollowHandler = authid => {
    this.props.removeFollow(authid);
  };

  render() {
    let { userProfile, follows, loading, error } = this.props;
    let following = false;

    if (follows && follows.length > 0 && !loading && !error) {
      following =
        follows.findIndex(follow => {
          return follow.follows === userProfile.authid;
        }) !== -1;
    }

    return (
      <button
        className="FollowButton"
        onClick={
          following
            ? () => this.onUnfollowHandler(userProfile.authid)
            : () => this.onFollowHandler(userProfile.authid)
        }
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    follows: state.followReducer.following,
    loading: state.followReducer.loading,
    error: state.followReducer.error
  };
};

export default connect(mapStateToProps, {
  addFollow,
  removeFollow,
  getFollows
})(FollowButton);
