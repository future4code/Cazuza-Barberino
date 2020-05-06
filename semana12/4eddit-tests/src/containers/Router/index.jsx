import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import PostsPage from "../PostsPage";

export const routes = {
  root: "/",
  postList: "/post-list",
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.postList} component={PostsPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
