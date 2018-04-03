import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import Posts from "./components/Posts/Posts";
import FullPost from "./components/FullPost/FullPost";
import NewPost from "./components/NewPost/NewPost";
import EditPost from "./components/EditPost/EditPost";
import NotFound from "./components/Views/NotFound/NotFound";
import Users from "./components/Views/Users/Users";
import Login from "./components/Views/Login/Login";

import "./styles/cssTransition.css";

const Routes = props => {
  let { location } = props;
  const currentKey = location.pathname.split("/")[1] || "/";
  const timeout = { enter: 300, exit: 200 };
  return (
    <TransitionGroup component="main">
      <CSSTransition
        key={currentKey}
        timeout={timeout}
        classNames="fade"
        appear
      >
        <Switch location={location}>
          <Route
            path="/"
            exact
            render={() => {
              return props.user ? (
                <div>
                  <Posts />
                </div>
              ) : (
                <Login />
              );
            }}
          />
          <Route path="/users" exact component={Users} />
          <Route path="/users/:userid" exact component={Posts} />
          <Route path="/users/:userid/posts/:postid" component={FullPost} />

          <Route path="/posts/new" exact component={NewPost} />
          <Route path="/posts/:id/edit" component={EditPost} />
          <Route component={NotFound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(connect(state => ({ ...state.userReducer }))(Routes));
