import React from "react";
import { Switch, Route } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import FullPost from "./components/FullPost/FullPost.js";
import Login from "./components/Views/Login/Login";
import Header from "./components/Header/Header";

export default (
  <Switch>
    <Route
      path="/"
      exact
      render={() => {
        return (
          <div>
            <Login />
            <Header />
            <Posts />
          </div>
        );
      }}
    />
    <Route path="/users/:userid/posts/:postid" component={FullPost} />
  </Switch>
);
