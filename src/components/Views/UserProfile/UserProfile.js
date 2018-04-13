import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../redux/ducks/userReducer";
import ReactS3Uploader from "react-s3-uploader";

import "./UserProfile.css";

class UserProfile extends Component {
  state = {
    edit: false,
    photo: null,
    about: ""
  };

  componentDidMount() {
    this.props.getUserProfile(this.props.userid);
  }

  onEditProfileButton = () => {
    let { edit, photo, about } = this.state;

    if (edit) {
      this.props.submitProfile({
        about,
        photo
      });
    }

    this.setState(prevState => {
      return {
        edit: !prevState.edit,
        about: prevState.edit ? "" : this.props.userProfile[0].about
      };
    });
  };

  onPictureUpload = s3 => {
    //check if photo state is empty, conditionally update profile: if photo state empty, then don't update photo.
    this.setState({
      photoUrl: `http://s3.us-east-2.amazonaws.com/react-journal-user-profile/${
        s3.filename
      }`
    });
  };

  onChangeHandler = e => {
    this.setState({ about: e.target.value });
  };

  render() {
    let { loading, error, userProfile, userLoggedIn } = this.props;
    let { edit, photo, about } = this.state;

    let profileDisplay = <div className="UserProfile" />;
    let button =
      +userLoggedIn.id === +this.props.userid ? (
        <button
          onClick={this.onEditProfileButton}
          className="UserProfile__button"
        >
          {edit ? "Save" : "Edit"}
        </button>
      ) : (
        <button onClick={this.followUserButton} className="UserProfile__button">
          Follow
        </button>
      );

    if (userProfile && !loading && !error) {
      let profile = userProfile[0];
      profileDisplay = (
        <div className="UserProfile fade-in">
          <div className="UserProfile__main">
            {edit ? (
              <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path=""
                onProgress={this.progress}
                onFinish={this.onPictureUpload}
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                inputRef={cmp => (this.uploadInput = cmp)}
                server={process.env.REACT_APP_CLIENT_HOST}
                autoUpload
              />
            ) : (
              <img
                className="UserProfile__profile-photo"
                src={profile.profile_photo}
                alt="user profile"
              />
            )}
            <div
              className={
                edit
                  ? `UserProfile__text UserProfile__text--editing`
                  : "UserProfile__text"
              }
            >
              <h1
                className={
                  edit
                    ? `UserProfile__name UserProfile__name--editing`
                    : "UserProfile__name"
                }
              >
                {profile.name}
              </h1>
              {edit ? (
                <textarea
                  className="UserProfile__input"
                  onChange={this.onChangeHandler}
                  value={about}
                  type="text"
                />
              ) : (
                <p className="UserProfile__about">
                  {profile.about === null
                    ? "Click the edit button to get started!"
                    : profile.about}
                </p>
              )}
            </div>
          </div>
          {button}
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
    userProfile: state.userReducer.userProfile,
    userLoggedIn: state.userReducer.user
  };
};

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
