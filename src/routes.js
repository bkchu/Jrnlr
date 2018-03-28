import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Posts from "./components/Posts/Posts";
import FullPost from "./components/FullPost/FullPost.js";
import NewPost from "./components/NewPost/NewPost.js";

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
              return (
                <div>
                  <Posts />
                </div>
              );
            }}
          />
          <Route path="/users/:userid/posts/:postid" component={FullPost} />
          <Route path="/posts/new" component={NewPost} />
          <Route
            path="/posts/:id/edit"
            render={() => {
              return <NewPost editing={true} />;
            }}
          />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(Routes);
