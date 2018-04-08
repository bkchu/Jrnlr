import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts, getPostsByUserId } from "../../redux/ducks/postReducer";
import Post from "./Post/Post";
import Error from "../Error/Error";
import "./Posts.css";

class Posts extends Component {
  // state = {

  // }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match &&
      this.props.match &&
      prevProps.match.url !== this.props.match.url &&
      this.props.match.path === "/users/:userid"
    ) {
      this.props.getPostsByUserId(this.props.match.params.userid);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match && this.props.match.path === "/users/:userid") {
      this.props.getPostsByUserId(this.props.match.params.userid);
    } else {
      this.props.getPosts();
    }
  }

  render() {
    let { posts, error, loading } = this.props;

    let displayPosts = <div className="Posts" />;
    let profileName = "Loading...";
    if (posts && posts.length > 0 && !error && !loading) {
      profileName = this.props.match ? posts[0].name : null;
      displayPosts = (
        <div className="Posts fade-in">
          {posts.map(post => {
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
          })}
        </div>
      );
    } else if (error && error.status === 401) {
      displayPosts = <Error error={error} />;
    }
    return (
      <div className="container">
        <p className="Posts__profile-name">{profileName}</p>
        {displayPosts}
        <Link to="/posts/new">
          <button className="Posts__button">+</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts,
    error: state.postReducer.error,
    loading: state.postReducer.loading
  };
};

export default connect(mapStateToProps, { getPosts, getPostsByUserId })(Posts);
