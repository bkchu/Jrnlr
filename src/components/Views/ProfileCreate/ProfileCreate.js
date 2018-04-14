import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Error from "../../Error/Error";

import {
  setUserIsNewToFalse,
  addProfile
} from "../../../redux/ducks/userReducer";

import "./ProfileCreate.css";

class ProfileCreate extends Component {
  state = {
    photo: null,
    fullName: "",
    about: ""
  };

  onSubmitHandler = e => {
    let { fullName, about, photo } = this.state;
    let fullNameFilled = fullName !== "";
    let aboutFilled = about !== "";
    e.preventDefault();
    if (fullNameFilled && aboutFilled) {
      console.log(fullName, about);
      // this.props.setUserIsNewToFalse();
      this.props.addProfile({
        photo: photo
          ? photo
          : "https://www.bspmediagroup.com/event/img/logos/user_placeholder.png",
        fullName,
        about
      });
      this.props.history.push("/");
    } else {
      if (!fullNameFilled) {
        toast.warn("Please fill in the Full Name field.");
      }
      if (!aboutFilled) {
        toast.warn("Please fill in the About field.");
      }
    }
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onPictureUpload = s3 => {
    //check if photo state is empty, conditionally update profile: if photo state empty, then don't update photo.
    this.setState({
      photo: `http://s3.us-east-2.amazonaws.com/react-journal-user-profile/${
        s3.filename
      }`
    });
  };

  render() {
    let { user } = this.props;
    let { photo, fullName, about } = this.state;

    let profileCreateDisplay = <div className="ProfileCreate container" />;
    if (!user.is_new) {
      return <Redirect to="/" />;
    } else if (!user.email_verified) {
      return (
        <Error
          error={{
            status: "A verification email has been sent to your email.",
            data: {
              error:
                "Please log in again.\nPlease note: The verification process can take up to two minutes."
            }
          }}
        />
      );
    } else {
      profileCreateDisplay = (
        <form
          className="ProfileCreate container"
          onSubmit={this.onSubmitHandler}
        >
          <img
            className="ProfileCreate__photo"
            src={
              photo
                ? photo
                : "https://www.bspmediagroup.com/event/img/logos/user_placeholder.png"
            }
            alt="user profile"
          />
          <label className="ProfileCreate__uploader">
            UPLOAD
            <ReactS3Uploader
              signingUrl="/s3/sign"
              signingUrlMethod="GET"
              accept="image/*"
              s3path=""
              onProgress={this.progress}
              onFinish={this.onPictureUpload}
              contentDisposition="auto"
              scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
              inputRef={cmp => (this.uploadInput = cmp)}
              server={process.env.REACT_APP_CLIENT_HOST}
              autoUpload
            />
          </label>
          <input
            className="ProfileCreate__input"
            value={fullName}
            onChange={this.onChangeHandler}
            name="fullName"
            placeholder="Full Name - you only get one chance!"
            type="text"
          />
          <textarea
            className="ProfileCreate__textarea"
            value={about}
            onChange={this.onChangeHandler}
            name="about"
            placeholder="A little blurb about you."
            type="text"
          />
          <button className="ProfileCreate__submit">I'm Ready!</button>
        </form>
      );
    }

    return (
      <div className="ProfileCreate__outer">
        {profileCreateDisplay}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(state => ({ ...state.userReducer }), {
  setUserIsNewToFalse,
  addProfile
})(ProfileCreate);
