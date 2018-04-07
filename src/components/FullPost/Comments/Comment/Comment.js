import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  updateComment,
  deleteComment,
  getComments
} from "../../../../redux/ducks/commentReducer";
import "./Comment.css";

class Comment extends Component {
  state = {
    editing: false,
    value: ""
  };

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.userid !== nextProps.userid) {
      return true;
    }
    if (this.props.name !== nextProps.name) {
      return true;
    }
    if (this.props.date !== nextProps.date) {
      return true;
    }
    if (this.props.body !== nextProps.body) {
      return true;
    }
    if (this.state.value !== nextState.value) {
      return true;
    }
    if (this.state.editing !== nextState.editing) {
      return true;
    }
    return false;
  }

  onEditHandler = () => {
    this.setState(prevState => {
      return {
        editing: !prevState.editing,
        value: this.props.comment.body
      };
    });
    if (this.textInput) this.textInput.focus();
  };

  onDeleteHandler = () => {
    this.props.deleteComment(this.props.id);
    this.props.getComments(this.props.postid);
  };

  onChangeHandler = e => {
    this.setState({ value: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.updateComment(this.props.id, this.state.value);
    this.props.getComments(this.props.postid);
    this.setState({ editing: false });
  };

  render() {
    let { editing, value } = this.state;
    let { canDisplayCommentOptions } = this.props;
    let { userid, name, date, body } = this.props.comment;

    return (
      <div className="Comment">
        <div className="Comment__main">
          <Link className="Link" to={`/users/${userid}`}>
            <p className="Comment__name">{name}</p>
          </Link>
          <p className="Comment__date">{moment.utc(date).fromNow()}</p>
          {editing ? (
            <form onSubmit={this.onSubmitHandler}>
              <input
                className="Comment__edit"
                type="text"
                onChange={this.onChangeHandler}
                value={value}
                ref={textInput => {
                  this.textInput = textInput;
                }}
              />
            </form>
          ) : (
            <p className="Comment__body">{body}</p>
          )}
        </div>
        {canDisplayCommentOptions && (
          <div className="Comment__options">
            <div className="Comment__button" onClick={this.onEditHandler}>
              <i className="fas fa-pencil-alt" />
            </div>
            <div className="Comment__button" onClick={this.onDeleteHandler}>
              <i className="fas fa-trash-alt" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateComment, deleteComment, getComments })(
  Comment
);
