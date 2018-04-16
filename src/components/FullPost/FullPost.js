import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import FontAwesome from "react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

import {
  getPost,
  deletePost,
  likeButtonPressed
} from "../../redux/ducks/postReducer";
import { toggleLike } from "../../redux/ducks/likeReducer";
import Error from "../Error/Error";
import Comments from "./Comments/Comments";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    showComments: false,
    deleteConfirmation: 0
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.postid);
  }

  onDeleteHandler = () => {
    if (this.state.deleteConfirmation !== 1) {
      toast.warn("Press again to delete.");
      this.setState({ deleteConfirmation: 1 });
    } else {
      this.props.deletePost(this.props.match.params.postid);
      this.props.history.push("/");
      this.setState({ deleteConfirmation: 0 });
    }
  };

  onLikeHandler = () => {
    this.props.likeButtonPressed();
    let thumbsUp = document.querySelector(
      ".svg-inline--fa.fa-thumbs-up.fa-w-16"
    );
    thumbsUp.setAttribute("data-prefix", !this.props.userLiked ? "fas" : "far");
  };

  onCommentToggleHandler = () => {
    this.setState(prevState => {
      return {
        showComments: !prevState.showComments
      };
    });
  };

  componentWillUnmount() {
    let changed = this.props.selectedPost[0].userLiked !== this.props.userLiked;
    if (changed) {
      this.props.toggleLike(
        this.props.match.params.postid,
        this.props.userLiked
      );
    }
  }

  render() {
    let { selectedPost, error, loading, userLoggedIn } = this.props;
    let displayPost = <div className="FullPost" />;

    if (selectedPost && !error && !loading) {
      let {
        title,
        subtitle,
        date,
        name,
        body,
        imageobj,
        userid,
        profile_photo,
        numComments
      } = selectedPost[0];
      let { numLikes } = this.props;
      let image = JSON.parse(imageobj);
      let isUnsplashPhoto = image.imageAuthorUsername !== "";
      let likeButton = <FontAwesome name="thumbs-up" />;

      const htmlToParse = draftToHtml(JSON.parse(body));

      const html = ReactHtmlParser(htmlToParse, {
        transform: (node, index) => {
          // convert <ul> to <ol>
          if (
            node.type === "tag" &&
            node.name === "p" &&
            node.children.length === 0
          ) {
            node.name = "br";
            return convertNodeToElement(node, index, this);
          }
        }
      });

      displayPost = (
        <div className="FullPost fade-in">
          <div className="FullPost__header">
            <div className="FullPost__profile">
              <Link className="Link" to={`/users/${userid}`}>
                <img
                  className="FullPost__profile-photo"
                  src={profile_photo}
                  alt=""
                />
              </Link>
              <div className="FullPost__name-date">
                <Link className="Link" to={`/users/${userid}`}>
                  <p className="FullPost__name">{name}</p>
                </Link>
                <p className="FullPost__date">
                  {moment(date).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
            <div className="FullPost__details">
              <h1 className="FullPost__title">{title}</h1>
              <p className="FullPost__subtitle">{subtitle}</p>
            </div>
          </div>
          {userLoggedIn.id === userid && (
            <div className="FullPost__buttons">
              <Link
                to={`/posts/${this.props.match.params.postid}/edit`}
                className="Link FullPost__button FullPost__button--edit"
              >
                Edit
              </Link>
              <div
                onClick={this.onDeleteHandler}
                className="FullPost__button FullPost__button--delete"
              >
                Delete
              </div>
            </div>
          )}
          <img className="FullPost__image" src={image.imageUrl} alt="" />
          {isUnsplashPhoto ? (
            <p className="FullPost__caption">
              Photo by{" "}
              <a
                className="FullPost__image-link"
                href={`https://unsplash.com/@${
                  image.imageAuthorUsername
                }?utm_source=react-journal&utm_medium=referral`}
              >
                {image.imageUser}
              </a>{" "}
              on{" "}
              <a
                className="FullPost__image-link"
                href="https://unsplash.com/?utm_source=react-journal&utm_medium=referral"
              >
                Unsplash
              </a>
            </p>
          ) : (
            <p className="FullPost__caption">
              <a className="FullPost__image-link" href={image.imageUrl}>
                Download Photo
              </a>
            </p>
          )}
          <div className="FullPost__body">{html}</div>
          <div className="FullPost__footer">
            <div className="container">
              <div className="FullPost__likes">
                <div
                  onClick={this.onLikeHandler}
                  className="FullPost__like-symbol"
                >
                  {likeButton}
                </div>
                {numLikes}
              </div>
              <div
                className="FullPost__comments"
                onClick={this.onCommentToggleHandler}
              >
                <i className="fas fa-comments" />
                {" " + numComments}
              </div>
            </div>
            {this.state.showComments && (
              <Comments postid={this.props.match.params.postid} />
            )}
          </div>
        </div>
      );
    } else if (error) {
      displayPost = <Error error={error} />;
    }

    return (
      <div>
        <div className="container">
          {displayPost}
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts,
    loading: state.postReducer.loading,
    error: state.postReducer.error,
    selectedPost: state.postReducer.selectedPost,
    userLoggedIn: state.userReducer.user,
    userLiked: state.postReducer.userLiked,
    numLikes: state.postReducer.numLikes
  };
};

export default connect(mapStateToProps, {
  getPost,
  deletePost,
  likeButtonPressed,
  toggleLike
})(FullPost);
