import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts, getPostsByUserId } from "../../redux/ducks/postReducer";
import Post from "./Post/Post";
import Error from "../Error/Error";
import "./Posts.css";

class Posts extends Component {
  componentDidMount() {
    if (this.props.match && this.props.match.path === "/users/:userid") {
      this.props.getPostsByUserId(this.props.match.params.userid);
    } else {
      this.props.getPosts();
    }
  }
  render() {
    let classes = ["Posts"];
    if (!this.props.loading) {
      classes.push("fade-in");
    }
    let { posts, error } = this.props;
    let displayPosts = <p>Loading...</p>;
    if (posts && !error) {
      displayPosts = posts.map(post => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.name}
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
        <div className={classes.join(" ")}>{displayPosts}</div>
        <Link to="/posts/new">
          <button className="Posts__button">+</button>
        </Link>
      </div>
    );
  }
}

export default connect(
  state => ({ ...state.postReducer, ...state.userReducer }),
  { getPosts, getPostsByUserId }
)(Posts);
