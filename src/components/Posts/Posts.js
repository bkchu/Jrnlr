import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getPosts,
  getPostsByUserId,
  getInitialPosts,
  getInitialPostsByUserId,
  getPostsCount,
  getPostsByUserIdCount
} from '../../redux/ducks/postReducer';
import Post from './Post/Post';
import Error from '../Error/Error';
import UserProfile from '../Views/UserProfile/UserProfile';
import './Posts.css';

class Posts extends Component {
  state = {
    page: 1
  };

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.location !== this.props.location) {

  //   }
  // }

  componentDidUpdate(prevProps) {
    document.addEventListener('scroll', this.trackScrolling);
    if (
      prevProps.match &&
      this.props.match &&
      prevProps.match.url !== this.props.match.url &&
      this.props.match.path === '/users/:userid'
    ) {
      this.props.getInitialPostsByUserId(this.props.match.params.userid);
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    if (this.props.match && this.props.match.path === '/users/:userid') {
      this.props
        .getInitialPostsByUserId(this.props.match.params.userid)
        .then(() =>
          this.props.getPostsByUserIdCount(this.props.match.params.userid)
        );
    } else {
      this.props.getInitialPosts().then(this.props.getPostsCount);
    }
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  scrollToBottom = () => {
    this.dummydiv.scrollIntoView({ behavior: 'smooth' });
  };

  trackScrolling = () => {
    const wrappedElement = this.postsContainer;
    const originalHeight =
      this.postsContainer && this.postsContainer.clientHeight;
    if (wrappedElement && this.isBottom(wrappedElement)) {
      if (
        this.props.match &&
        this.props.match.path === '/users/:userid' &&
        this.props.posts.length < this.props.count
      ) {
        this.props
          .getPostsByUserId(this.props.match.params.userid, this.state.page)
          .then(() => {
            this.setState(
              ({ page }) => ({ page: page + 1 }),
              window.scrollTo(0, originalHeight)
            );
          });
      } else {
        if (this.props.posts.length < this.props.count) {
          this.props.getPosts(this.state.page).then(() => {
            this.setState(
              ({ page }) => ({ page: page + 1 }),
              window.scrollTo(0, originalHeight)
            );
          });
        }
      }
      document.removeEventListener('scroll', this.trackScrolling);
    }
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  render() {
    let { posts, error, loading, loadingPosts } = this.props;

    let displayPosts = <div className="Posts" />;
    let profileName = <p className="Posts__profile-name">Loading...</p>;
    if (posts && !error && !loading && !loadingPosts) {
      if (posts.length > 0) {
        profileName = this.props.match && (
          <UserProfile userid={this.props.match.params.userid} />
        );

        displayPosts = (
          <div
            ref={postsContainer => (this.postsContainer = postsContainer)}
            className="Posts fade-in"
          >
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
        if (this.props.match && this.props.match.path === '/users/:userid') {
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
        <div
          ref={dummydiv => {
            this.dummydiv = dummydiv;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts,
    count: state.postReducer.count,
    error: state.postReducer.error,
    loading: state.postReducer.loading,
    loadingPosts: state.postReducer.loadingPosts,
    user: state.userReducer.user
  };
};

export default connect(
  mapStateToProps,
  {
    getPosts,
    getPostsByUserId,
    getInitialPosts,
    getInitialPostsByUserId,
    getPostsCount,
    getPostsByUserIdCount
  }
)(Posts);
