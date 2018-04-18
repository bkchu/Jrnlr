import React, { Component } from "react";
import Comment from "./Comment/Comment";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getComments, addComment } from "../../../redux/ducks/commentReducer";

import "./Comments.css";

class Comments extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.getComments(this.props.postid);
    this.inputInstance.focus();
    this.inputInstance.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.inputInstance.scrollIntoView({ behavior: "smooth" });
  }

  onChangeHandler = e => {
    this.setState({ text: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.text !== "") {
      this.props.addComment(this.props.postid, this.state.text);
      this.setState({ text: "" });
    } else {
      toast("Comment can't be empty.");
    }
  };

  render() {
    let { comments, loading, error, userLoggedIn } = this.props;
    let placeholder = "Write a comment...";
    let commentsDisplay = <div className="Comments" />;
    if (comments && comments.length > 0 && !loading && !error) {
      commentsDisplay = (
        <div className="Comments fade-in">
          {comments.map(comment => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                postid={this.props.postid}
                comment={comment}
                canDisplayCommentOptions={comment.userid === userLoggedIn.id}
              />
            );
          })}
        </div>
      );
    } else if (comments && comments.length === 0 && !loading && !error) {
      placeholder = "Be the first to leave a comment...";
    }

    return (
      <div>
        {commentsDisplay}
        <form onSubmit={this.onSubmitHandler}>
          <input
            value={this.state.text}
            onChange={this.onChangeHandler}
            placeholder={placeholder}
            type="text"
            className="Comments__input"
            ref={input => {
              this.inputInstance = input;
            }}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.commentReducer.comments,
    loading: state.commentReducer.loading,
    error: state.commentReducer.error,
    userLoggedIn: state.userReducer.user
  };
};

export default connect(mapStateToProps, { getComments, addComment })(Comments);
