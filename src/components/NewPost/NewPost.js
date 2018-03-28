import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getPost, addPost, updatePost } from "../../redux/ducks/postReducer";
import Gallery from "../Gallery/Gallery";
import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    imgobj: {}
  };

  componentDidMount() {
    if (this.props.editing) {
      this.props.getPost(this.props.match.params.id);

      let { editing, selectedPost, error } = this.props;
      if (editing && selectedPost && !error) {
        let { title, body, imageobj } = selectedPost[0];
        console.log(" imageobj: ", imageobj);

        this.setState({ title, body, imgobj: imageobj });
      }
    }
  }

  onSubmitHandler = e => {
    let { title, body, imgobj } = this.state;

    if (this.props.editing) {
      console.log("imgobj: ", imgobj);
      this.props.updatePost(this.props.match.params.id, {
        title,
        body,
        imgobj
      });
    } else {
      this.props.addPost({ title, body, imgobj });
    }
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
    // NEW POST
    let comp = (
      <div className="NewPost container">
        <h1 className="NewPost__header">New Post</h1>
        <input
          onChange={this.titleChangeHandler}
          className="NewPost__input NewPost__input--title"
          type="text"
          placeholder="Your title..."
        />
        <textarea
          onChange={this.bodyChangeHandler}
          className="NewPost__input NewPost__input--body"
          type="text"
          placeholder="Your body text..."
        />
        <Gallery selected={this.onSelectHandler} />
        <button className="NewPost__submit" onClick={this.onSubmitHandler}>
          + Add Post
        </button>
      </div>
    );

    // EDITING POST
    let { editing, selectedPost, error } = this.props;
    if (editing && selectedPost && !error) {
      let { imageobj } = selectedPost[0];
      comp = (
        <div className="NewPost container">
          <h1 className="NewPost__header">Edit Post</h1>
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
          <Gallery editing={imageobj} selected={this.onSelectHandler} />
          <button className="NewPost__submit" onClick={this.onSubmitHandler}>
            Publish Updates
          </button>
        </div>
      );
    }

    return <div>{comp}</div>;
  }
}

export default withRouter(
  connect(state => state.postReducer, { getPost, addPost, updatePost })(NewPost)
);
