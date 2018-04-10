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
    let { title, contentState, imgobj, privacy } = this.state;
    let hasText = convertFromRaw(contentState).hasText();
    if (title !== "" && hasText && Object.keys(imgobj).length !== 0) {
      this.props.updatePost(this.props.match.params.id, {
        title,
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

  contentStateChanged = contentState => {
    this.setState({ contentState });
  };

  onSelectHandler = image => {
    let imgobj = {
      imageUrl: "",
      imageUser: "",
      imageAuthorUsername: "",
      imageDownloadUrl: ""
    };

    switch (typeof image) {
      case "string":
        imgobj = { ...imgobj, imageUrl: image };
        break;
      case "object":
        imgobj = {
          ...imgobj,
          imageUrl: image.urls.regular,
          imageUser: image.user.name,
          imageAuthorUsername: image.user.username,
          imageDownloadUrl: image.links.download_location
        };
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
          />
          {/* <textarea
            onChange={this.bodyChangeHandler}
            className="EditPost__input EditPost__input--body"
            type="text"
            value={this.state.body}
          /> */}
          <Editor
            initialContentState={selectedPost[0].body}
            contentStateChanged={this.contentStateChanged}
          />
          <Gallery editing={imageobj} selected={this.onSelectHandler} />
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

    return (
      <div>
        {comp}
        <ToastContainer />
      </div>
    );
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
