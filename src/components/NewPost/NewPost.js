import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addPost } from "../../redux/ducks/postReducer";
import Gallery from "../Gallery/Gallery";
import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    imgobj: {}
  };

  onSubmitHandler = e => {
    let { title, body, imgobj } = this.state;
    this.props.addPost({ title, body, imgobj });
    this.props.history.push("/");
  };

  titleChangeHandler = e => {
    this.setState({ title: e.target.value });
  };

  bodyChangeHandler = e => {
    this.setState({ body: e.target.value });
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

  render() {
    let comp = (
      <div className="NewPost container">
        <h1 className="NewPost__header">New Post</h1>
        <input
          onChange={this.titleChangeHandler}
          className="NewPost__input NewPost__input--title"
          type="text"
          value={this.state.title}
        />
        <textarea
          onChange={this.bodyChangeHandler}
          className="NewPost__input NewPost__input--body"
          type="text"
          value={this.state.body}
        />
        <Gallery selected={this.onSelectHandler} />
        <button className="NewPost__submit" onClick={this.onSubmitHandler}>
          + Add Post
        </button>
      </div>
    );

    return <div>{comp}</div>;
  }
}

export default withRouter(
  connect(state => state.postReducer, { addPost })(NewPost)
);
