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
        userid
      } = selectedPost[0];
      let { numLikes } = this.props;
      let image = JSON.parse(imageobj);
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
          <p className="FullPost__name">{name}</p>
          <h1 className="FullPost__title">{title}</h1>
          <p className="FullPost__subtitle">{subtitle}</p>
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
