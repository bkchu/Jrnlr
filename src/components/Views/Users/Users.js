import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import User from "./User/User";
import { getUsers, getAllUsersFollows } from "../../../redux/ducks/userReducer";
import { getFollows } from "../../../redux/ducks/followReducer";

import "./Users.css";

class Users extends Component {
  state = {
    query: ""
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.users !== nextProps.users) {
  //     return true;
  //   }
  //   if (this.props.following !== nextProps.following) {
  //     return true;
  //   }
  //   if (this.state.query !== nextState.query) {
  //     return true;
  //   }
  //   return false;
  // }

  componentDidMount() {
    this.searchbar.focus();
    this.props.getAllUsersFollows();
    this.props.getFollows();
  }

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.query.length > 0) {
      this.props.getUsers(this.state.query);
      this.props.getFollows();
    } else {
      toast.warn("Search field cannot be empty.");
    }
  };

  onChangeHandler = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    let { users, loadingUsers, following, loadingFollows } = this.props;
    let displayUsers = <div className="Users__users" />;

    if (users.length !== 0 && !loadingUsers && !loadingFollows) {
      displayUsers = (
        <div className="Users__users fade-in">
          {users.map(user => {
            return (
              <User
                key={user.authid}
                id={user.id}
                authid={user.authid}
                username={user.name}
                email={user.email}
                isFollowing={
                  following.findIndex(
                    follow => follow.follows === user.authid
                  ) !== -1
                }
              />
            );
          })}
        </div>
      );
    }
    return (
      <div className="Users container">
        <form onSubmit={this.onSubmitHandler}>
          <input
            className="Users__input"
            onChange={this.onChangeHandler}
            placeholder="Search for users by email."
            value={this.state.query}
            type="text"
            ref={instance => {
              this.searchbar = instance;
            }}
          />
        </form>
        {displayUsers}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    loadingUsers: state.userReducer.loading,
    following: state.followReducer.following,
    loadingFollows: state.followReducer.loading
  };
};

export default connect(mapStateToProps, {
  getUsers,
  getFollows,
  getAllUsersFollows
})(Users);
