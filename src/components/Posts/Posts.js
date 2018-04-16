import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts, getPostsByUserId } from "../../redux/ducks/postReducer";
import Post from "./Post/Post";
import Error from "../Error/Error";
import UserProfile from "../Views/UserProfile/UserProfile";
import "./Posts.css";

class Posts extends Component {
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
    if (this.props.match && this.props.match.path === "/users/:userid") {
      this.props.getPostsByUserId(this.props.match.params.userid);
    } else {
      this.props.getPosts();
    }
    window.scrollTo(0, 0);
  }

  render() {
    let { posts, error, loading } = this.props;

    let displayPosts = <div className="Posts" />;
    let profileName = <p className="Posts__profile-name">Loading...</p>;
    if (posts && !error && !loading) {
      if (posts.length > 0) {
        profileName = this.props.match && (
          <UserProfile userid={this.props.match.params.userid} />
        );

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
                  subtitle={post.subtitle}
                  date={post.date}
                  body={post.body}
                  image={post.imageobj}
                />
              );
            })}
          </div>
        );
      } else if (posts.length === 0) {
        profileName = null;
        if (this.props.match && this.props.match.path === "/users/:userid") {
          displayPosts = (
            <div>
              <UserProfile userid={this.props.match.params.userid} />
              <div className="Posts__no-posts">
                {+this.props.match.params.userid === +this.props.user.id
                  ? "You haven't posted anything! Click the button on the bottom right to create a new post."
                  : "This user hasn't posted anything yet!"}
              </div>
            </div>
          );
        } else {
          displayPosts = (
            <div className="Posts__no-posts">
              Click the button in the bottom-right section of your screen to
              create a new post!
              <br />
              <br /> Alternatively, click the users icon at the top of the
              screen to look for people to follow.
            </div>
          );
        }
      }
    } else if (error && error.status === 401) {
      displayPosts = <Error error={error} />;
    }
    return (
      <div className="container">
        {profileName}
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
    loading: state.postReducer.loading,
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, { getPosts, getPostsByUserId })(Posts);
