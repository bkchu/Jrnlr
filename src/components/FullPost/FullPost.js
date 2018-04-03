import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import FontAwesome from "react-fontawesome";

import "./FullPost.css";
import {
  getPost,
  deletePost,
  likeButtonPressed
} from "../../redux/ducks/postReducer";
import { toggleLike } from "../../redux/ducks/likeReducer";

import Error from "../Error/Error";
class FullPost extends Component {
  componentWillMount() {
    this.props.getPost(this.props.match.params.postid);
  }

  onDeleteHandler = () => {
    this.props.deletePost(this.props.match.params.postid);
    this.props.history.push("/");
  };

  onLikeHandler = () => {
    this.props.likeButtonPressed();
    let thumbsUp = document.querySelector(
      ".svg-inline--fa.fa-thumbs-up.fa-w-16"
    );
    thumbsUp.setAttribute("data-prefix", !this.props.userLiked ? "fas" : "far");
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
      let { title, date, body, imageobj, userid } = selectedPost[0];
      let { numLikes, userLiked } = this.props;
      let image = JSON.parse(imageobj);
      let likeButton = <FontAwesome name="thumbs-up" />;

      displayPost = (
        <div className="FullPost fade-in">
          <h1 className="FullPost__title">{title}</h1>
          <p className="FullPost__date">
            {moment(date).format("MMM DD, YYYY")}
          </p>
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
          <p className="FullPost__body">{body}</p>
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
              <div className="FullPost__comments">Comment</div>
            </div>
          </div>
        </div>
      );
    } else if (error) {
      displayPost = <Error error={error} />;
    }

    return (
      <div>
        <div className="container">{displayPost}</div>
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
