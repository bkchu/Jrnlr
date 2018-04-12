import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../redux/ducks/userReducer";

import "./UserProfile.css";
//make user profile table, join with user table on user id,

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.userid);
  }

  render() {
    let { loading, error, userProfile } = this.props;
    console.log("userProfile: ", userProfile);
    console.log("error: ", error);
    console.log("loading: ", loading);

    let profileDisplay = <div className="UserProfile" />;

    if (userProfile && !loading && !error) {
      let profile = userProfile[0];
      profileDisplay = (
        <div className="UserProfile fade-in">
          <img
            className="UserProfile__profile-photo"
            src={profile.profile_photo}
            alt="user profile"
          />
          <div>
            <h1 className="UserProfile__name">{profile.name}</h1>
            <p className="UserProfile__about">{profile.about}</p>
          </div>
        </div>
      );
    }

    return <div>{profileDisplay}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.userReducer.loading,
    error: state.userReducer.error,
    userProfile: state.userReducer.userProfile
  };
};

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
