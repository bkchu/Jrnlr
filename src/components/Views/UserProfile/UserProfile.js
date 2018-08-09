import React, { Component } from "react";
import { connect } from "react-redux";
import ReactS3Uploader from "react-s3-uploader";

import {
  getUserProfile,
  updateProfile
} from "../../../redux/ducks/userReducer";
import FollowButton from "./FollowButton/FollowButton";

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
      this.props.updateProfile({
        about,
        photo: photo ? photo : this.props.userProfile[0].profile_photo
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
      photo: `https://s3.us-east-2.amazonaws.com/react-journal-user-profile/${
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

    if (userProfile && !loading && !error) {
      let profile = userProfile[0];
      let button =
        +userLoggedIn.id === +this.props.userid ? (
          <button
            onClick={this.onEditProfileButton}
            className="UserProfile__button"
          >
            {edit ? "Save" : "Edit"}
          </button>
        ) : (
          // <button onClick={this.onFollowUserButton} className="UserProfile__button">
          //   Follow
          // </button>
          <FollowButton userProfile={profile} />
        );

      if (edit) {
        profileDisplay = (
          <div className="UserProfile UserProfile--editing fade-in">
            <div className="UserProfile__main UserProfile__main--editing">
              <div className="UserProfile__image-block">
                <img
                  className="UserProfile__profile-photo UserProfile__profile-photo--editing"
                  src={
                    photo
                      ? photo
                      : "https://www.bspmediagroup.com/event/img/logos/user_placeholder.png"
                  }
                  alt="user profile"
                />
                <label className="UserProfile__uploader">
                  UPLOAD
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
                </label>
              </div>
              <div className="UserProfile__text UserProfile__text--editing">
                <h1 className="UserProfile__name UserProfile__name--editing">
                  {profile.name}
                </h1>
                <textarea
                  className="UserProfile__input"
                  onChange={this.onChangeHandler}
                  value={about}
                  type="text"
                  maxLength="160"
                />
              </div>
            </div>
            {button}
          </div>
        );
      } else {
        profileDisplay = profile && (
          <div className="UserProfile fade-in">
            <div className="UserProfile__main">
              <img
                className="UserProfile__profile-photo"
                src={
                  profile.profile_photo ||
                  "https://www.bspmediagroup.com/event/img/logos/user_placeholder.png"
                }
                alt="user profile"
              />

              <div className="UserProfile__text">
                <h1 className={"UserProfile__name"}>{profile.name}</h1>

                <p className="UserProfile__about">
                  {profile.about === null
                    ? "Click the edit button to get started!"
                    : profile.about}
                </p>
              </div>
            </div>
            {button}
          </div>
        );
      }
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

export default connect(mapStateToProps, { getUserProfile, updateProfile })(
  UserProfile
);
