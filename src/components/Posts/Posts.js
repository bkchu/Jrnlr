import React, { Component } from "react";
import { connect } from "react-redux";

import { getPosts } from "../../redux/ducks/postReducer";
import Post from "./Post/Post";
import Error from "../Error/Error";
import "./Posts.css";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    let { posts, user, error } = this.props;
    let displayPosts = <p>Loading...</p>;
    if (posts && !error) {
      displayPosts = posts.map(post => {
        return (
          <Post
            key={post.id}
            id={post.id}
            userid={post.userid}
            title={post.title}
            date={post.date}
            body={post.body}
            image={post.imageobj}
          />
        );
      });
    } else if (error && error.status === 401) {
      displayPosts = <Error error={error} />;
    }

    return (
      <div className="container">
        <div className="Posts">{displayPosts}</div>
      </div>
    );
  }
}

export default connect(
  state => ({ ...state.postReducer, ...state.userReducer }),
  { getPosts }
)(Posts);
