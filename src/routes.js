import React from "react";
import { Switch, Route } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import FullPost from "./components/FullPost/FullPost.js";
import NewPost from "./components/NewPost/NewPost.js";

export default (
  <Switch>
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
);
