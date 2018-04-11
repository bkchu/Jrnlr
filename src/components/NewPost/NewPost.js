import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { convertFromRaw } from "draft-js";

import { addPost } from "../../redux/ducks/postReducer";
import Gallery from "../Gallery/Gallery";
import Editor from "../Editor/Editor";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    subtitle: "",
    contentState: {},
    imgobj: {},
    privacy: false
  };

  onSubmitHandler = e => {
    let { title, subtitle, contentState, imgobj, privacy } = this.state;
    let hasText = convertFromRaw(contentState).hasText();
    if (title !== "" && hasText && Object.keys(imgobj).length !== 0) {
      this.props.addPost({
        title,
        subtitle,
        contentState,
        imgobj,
        privacy
      });
      this.props.history.push("/");
    } else {
      if (title === "") {
        if (!toast.isActive(this.titleToast)) {
          this.titleToast = toast.error("Cannot leave title empty.");
        }
      }
      if (subtitle === "") {
        if (!toast.isActive(this.subtitleToast)) {
          this.subtitleToast = toast.error("Cannot leave subtitle empty.");
        }
      }
      if (!hasText) {
        if (!toast.isActive(this.bodyToast)) {
          this.bodyToast = toast.error("Cannot leave body empty.");
        }
      }
      if (Object.keys(imgobj).length === 0) {
        if (!toast.isActive(this.imageToast)) {
          this.imageToast = toast.warn("Please choose an image.");
        }
      }
    }
  };

  titleChangeHandler = e => {
    this.setState({ title: e.target.value });
  };

  subtitleChangeHandler = e => {
    this.setState({ subtitle: e.target.value });
  };

  contentStateChanged = contentState => {
    this.setState({ contentState });
  };

  onImageSelectHandler = (image, mode) => {
    let imgobj = {
      imageUrl: "",
      imageUser: "",
      imageAuthorUsername: "",
      imageDownloadUrl: ""
    };

    const UNSPLASH = 1;
    const OWN = 2;
    const GIPHY = 3;

    switch (mode) {
      case OWN:
        imgobj = { ...imgobj, imageUrl: image };
        break;
      case UNSPLASH:
        imgobj = {
          ...imgobj,
          imageUrl: image.urls.regular,
          imageUser: image.user.name,
          imageAuthorUsername: image.user.username,
          imageDownloadUrl: image.links.download_location
        };
        break;
      case GIPHY:
        imgobj = { ...imgobj, imageUrl: image.images.original.url };
        break;
      default:
    }
    this.setState({ imgobj });
  };

  togglePrivacyHandler = () => {
    this.setState(prevState => {
      return {
        privacy: !prevState.privacy
      };
    });
  };

  render() {
    let comp = (
      <div className="NewPost container">
        <h1 className="NewPost__header">New Post</h1>
        <input
          onChange={this.titleChangeHandler}
          className="NewPost__input NewPost__input--title"
          type="text"
          value={this.state.title}
          placeholder="Your title here..."
          maxLength="75"
        />
        <input
          onChange={this.subtitleChangeHandler}
          className="NewPost__input NewPost__input--subtitle"
          type="text"
          value={this.state.subtitle}
          placeholder="Your subtitle here..."
          maxLength="150"
        />
        <Editor contentStateChanged={this.contentStateChanged} />
        {/* <textarea
          onChange={this.bodyChangeHandler}
          className="NewPost__input NewPost__input--body"
          type="text"
          value={this.state.body}
          placeholder="Your content here..."
        /> */}
        <Gallery selected={this.onImageSelectHandler} />
        <div className="NewPost__buttons">
          <button
            className="NewPost__button NewPost__button--privacy"
            onClick={this.togglePrivacyHandler}
          >
            {this.state.privacy ? "Private" : "Public"}
          </button>
          <button
            className="NewPost__button NewPost__button--publish"
            onClick={this.onSubmitHandler}
          >
            + Add Post
          </button>
        </div>
      </div>
    );

    return (
      <div>
        {comp}
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(
  connect(state => state.postReducer, { addPost })(NewPost)
);
