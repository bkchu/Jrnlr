import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { convertFromRaw } from "draft-js";

import { getPost, updatePost } from "../../redux/ducks/postReducer";
import Gallery from "../Gallery/Gallery";
import Error from "../Error/Error";
import Editor from "../Editor/Editor";

import "./EditPost.css";

class EditPost extends Component {
  state = {
    title: this.props.selectedPost ? this.props.selectedPost[0].title : "",
    subtitle: this.props.selectedPost
      ? this.props.selectedPost[0].subtitle
      : "",
    contentState: this.props.selectedPost
      ? JSON.parse(this.props.selectedPost[0].body)
      : {},
    imgobj: this.props.selectedPost ? this.props.selectedPost[0].imageobj : {},
    userid: this.props.selectedPost ? this.props.selectedPost[0].userid : null,
    privacy: this.props.selectedPost
      ? this.props.selectedPost[0].privacy
      : false
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  onSubmitHandler = e => {
    let { title, subtitle, contentState, imgobj, privacy } = this.state;
    let hasText = false;
    if (Object.keys(contentState).length > 0) {
      hasText = convertFromRaw(contentState).hasText();
    }
    if (
      title !== "" &&
      subtitle !== "" &&
      hasText &&
      Object.keys(imgobj).length !== 0
    ) {
      this.props.updatePost(this.props.match.params.id, {
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
    toast.dismiss(this.titleToast);
    this.setState({ title: e.target.value });
  };

  subtitleChangeHandler = e => {
    toast.dismiss(this.subtitleToast);
    this.setState({ subtitle: e.target.value });
  };

  contentStateChanged = contentState => {
    toast.dismiss(this.bodyToast);
    this.setState({ contentState });
  };

  onImageSelectHandler = (image, mode) => {
    toast.dismiss(this.imageToast);
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
    let { selectedPost, error, loading } = this.props;

    let comp = null;
    // EDITING POST
    if (loading) {
      comp = <div className="EditPost" />;
    } else if (selectedPost && selectedPost.length > 0 && !error && !loading) {
      if (this.state.userid !== this.props.user.id) {
        return (
          <div>
            <Error
              error={{
                status: "Wrong User",
                data: { error: "You are not who you say you are." }
              }}
            />
          </div>
        );
      }
      let { imageobj } = selectedPost[0];
      comp = (
        <div className="EditPost container">
          <h1 className="EditPost__header">Edit Post</h1>
          <input
            onChange={this.titleChangeHandler}
            className="EditPost__input EditPost__input--title"
            type="text"
            value={this.state.title}
            maxLength="75"
          />
          <input
            onChange={this.subtitleChangeHandler}
            className="EditPost__input EditPost__input--subtitle"
            type="text"
            value={this.state.subtitle}
            maxLength="150"
          />
          <Gallery editing={imageobj} selected={this.onImageSelectHandler} />
          <Editor
            initialContentState={selectedPost[0].body}
            contentStateChanged={this.contentStateChanged}
          />
          <div className="EditPost__buttons">
            <button
              className="EditPost__button EditPost__button--privacy"
              onClick={this.togglePrivacyHandler}
            >
              {this.state.privacy ? "Private" : "Public"}
            </button>
            <button
              className="EditPost__button EditPost__button--publish"
              onClick={this.onSubmitHandler}
            >
              Publish Updates
            </button>
          </div>
        </div>
      );
    } else {
      comp = <p>Loading...</p>;
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => {
  return {
    selectedPost: state.postReducer.selectedPost,
    error: state.postReducer.error,
    loading: state.postReducer.loading,
    user: state.userReducer.user
  };
};

export default withRouter(
  connect(mapStateToProps, { getPost, updatePost })(EditPost)
);
