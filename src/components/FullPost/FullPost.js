import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./FullPost.css";
import { getPost, deletePost } from "../../redux/ducks/postReducer";
import Error from "../Error/Error";
class FullPost extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postid);
  }

  onEditHandler() {
    this.props.history.push(`/posts/${this.props.match.params.postid}/edit`);
  }

  onDeleteHandler() {
    this.props.deletePost(this.props.match.params.postid);
    this.props.history.push("/");
  }

  render() {
    let { userid, postid } = this.props.match.params;
    console.log("userid: ", userid);
    console.log("postid: ", postid);
    let { selectedPost, error } = this.props;
    let displayPost = <p>Loading...</p>;

    if (selectedPost && !error) {
      let { title, date, body, imageobj } = selectedPost[0];
      let image = JSON.parse(imageobj);
      displayPost = (
        <div className="FullPost">
          <h1 className="FullPost__title">{title}</h1>
          <p className="FullPost__date">
            {moment(date).format("MMM DD, YYYY")}
          </p>
          <div className="FullPost__buttons">
            <div
              onClick={() => this.onEditHandler()}
              className="FullPost__button FullPost__button--edit"
            >
              Edit
            </div>
            <div
              onClick={() => this.onDeleteHandler()}
              className="FullPost__button FullPost__button--delete"
            >
              Delete
            </div>
          </div>
          <img className="FullPost__image" src={image.imageUrl} alt="" />
          <p className="FullPost__body">{body}</p>
        </div>
      );
      console.log(selectedPost);
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

export default connect(state => ({ ...state.postReducer }), {
  getPost,
  deletePost
})(FullPost);
